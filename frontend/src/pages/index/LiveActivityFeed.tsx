import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Card, Empty, Skeleton, Tag } from 'antd';
import { ThunderboltFilled } from '@ant-design/icons';

import { HttpUtil } from '@/utils';
import './LiveActivityFeed.css';

interface LiveActivityFeedProps {
  accessLogEnable: boolean;
  onOpenFullLog?: () => void;
}

interface XrayLogEntry {
  DateTime?: string | number;
  FromAddress?: string;
  ToAddress?: string;
  Inbound?: string;
  Outbound?: string;
  Email?: string;
  Event?: number;
}

const EVENT_LABELS: Record<number, string> = { 0: 'DIRECT', 1: 'BLOCKED', 2: 'PROXY' };
const EVENT_COLORS: Record<number, string> = { 0: 'green', 1: 'red', 2: 'blue' };
const POLL_INTERVAL = 5000;
const MAX_ROWS = 12;
const FRESH_HIGHLIGHT_MS = 2500;

function shortTime(value?: string | number): string {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

function entryKey(e: XrayLogEntry, idx: number): string {
  return `${e.DateTime ?? ''}|${e.FromAddress ?? ''}|${e.ToAddress ?? ''}|${e.Email ?? ''}|${idx}`;
}

export default function LiveActivityFeed({ accessLogEnable, onOpenFullLog }: LiveActivityFeedProps) {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<XrayLogEntry[]>([]);
  const [freshKeys, setFreshKeys] = useState<Set<string>>(new Set());
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string>('');
  const seenKeysRef = useRef<Set<string>>(new Set());
  const freshTimersRef = useRef<number[]>([]);

  const fetchLogs = useCallback(async () => {
    if (!accessLogEnable) {
      setInitialLoad(false);
      return;
    }
    try {
      const msg = await HttpUtil.post<XrayLogEntry[]>(`/panel/api/server/xraylogs/${MAX_ROWS}`, {
        filter: '',
        showDirect: true,
        showBlocked: true,
        showProxy: true,
      });
      if (msg?.success && Array.isArray(msg.obj)) {
        const arr = msg.obj as XrayLogEntry[];
        setLogs(arr);
        setError('');
        // detect fresh entries — mark keys we haven't seen before
        const newFresh = new Set<string>();
        arr.forEach((e, i) => {
          const k = entryKey(e, i);
          if (!seenKeysRef.current.has(k)) {
            newFresh.add(k);
            seenKeysRef.current.add(k);
          }
        });
        if (newFresh.size > 0 && !initialLoad) {
          setFreshKeys((prev) => new Set([...prev, ...newFresh]));
          const timerId = window.setTimeout(() => {
            setFreshKeys((prev) => {
              const next = new Set(prev);
              newFresh.forEach((k) => next.delete(k));
              return next;
            });
          }, FRESH_HIGHLIGHT_MS);
          freshTimersRef.current.push(timerId);
        } else if (initialLoad) {
          // first paint: seed seenKeys without highlighting
          arr.forEach((e, i) => seenKeysRef.current.add(entryKey(e, i)));
        }
      }
    } catch {
      setError('Failed to load Xray log');
    } finally {
      setInitialLoad(false);
    }
  }, [accessLogEnable, initialLoad]);

  useEffect(() => {
    if (!accessLogEnable) return;
    fetchLogs();
    const id = window.setInterval(fetchLogs, POLL_INTERVAL);
    return () => {
      window.clearInterval(id);
      freshTimersRef.current.forEach((t) => window.clearTimeout(t));
      freshTimersRef.current = [];
    };
  }, [accessLogEnable, fetchLogs]);

  const ordered = useMemo(() => [...logs].reverse(), [logs]);

  const cardTitle = (
    <span className="kp-feed-title">
      <ThunderboltFilled className="kp-feed-title-icon" />
      {t('pages.index.accessLogs')}
      <span className="kp-feed-live-dot" aria-hidden="true" />
      <span className="kp-feed-live-label">LIVE</span>
    </span>
  );

  return (
    <Card className="kp-bento-mini kp-live-feed" title={cardTitle}>
      {!accessLogEnable ? (
        <Alert
          type="info"
          showIcon
          message={t('pages.index.enableAccessLog') || 'Enable Xray access log in settings to see live activity.'}
        />
      ) : error ? (
        <Alert type="error" showIcon message={error} />
      ) : initialLoad ? (
        <div className="kp-feed-skeleton">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              active
              paragraph={false}
              title={{ width: `${75 - i * 6}%` }}
            />
          ))}
        </div>
      ) : ordered.length === 0 ? (
        <Empty description="No traffic yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div className="kp-feed-list" role="log" aria-live="polite">
          {ordered.map((e, i) => {
            const k = entryKey(e, ordered.length - 1 - i);
            const isFresh = freshKeys.has(k);
            const ev = e.Event ?? -1;
            return (
              <div key={k} className={`kp-feed-row${isFresh ? ' is-fresh' : ''}`}>
                <span className="kp-feed-time">{shortTime(e.DateTime)}</span>
                <Tag color={EVENT_COLORS[ev] ?? 'default'} className="kp-feed-event">
                  {EVENT_LABELS[ev] ?? '?'}
                </Tag>
                <span className="kp-feed-route">
                  <span className="kp-feed-addr">{e.FromAddress || '—'}</span>
                  <span className="kp-feed-arrow">→</span>
                  <span className="kp-feed-addr">{e.ToAddress || '—'}</span>
                </span>
                {e.Email && <span className="kp-feed-email">{e.Email}</span>}
                {e.Inbound && <span className="kp-feed-inbound">{e.Inbound}</span>}
              </div>
            );
          })}
        </div>
      )}
      {accessLogEnable && onOpenFullLog && (
        <button type="button" className="kp-feed-open-full" onClick={onOpenFullLog}>
          {t('pages.index.systemHistoryTitle') || 'Open full log'} →
        </button>
      )}
    </Card>
  );
}
