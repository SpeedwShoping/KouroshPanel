import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tag } from 'antd';
import { ClockCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';

import './SubUsageSummary.css';

interface SubUsageSummaryProps {
  usedByte: number;
  totalByte: number;
  usedLabel: string;
  totalLabel: string;
  remainedLabel: string;
  expireMs: number;
  isActive: boolean;
}

const RING_SIZE = 168;
const RING_STROKE = 13;
const RING_R = (RING_SIZE - RING_STROKE) / 2;
const RING_C = 2 * Math.PI * RING_R;

function pickRingColors(pct: number): [string, string] {
  if (pct >= 90) return ['#ff7875', '#ff4d4f'];
  if (pct >= 75) return ['#ffc53d', '#fa8c16'];
  return ['#e8c547', '#2ec4b6'];
}

function formatExpiryChip(expireMs: number): { label: string; color: string } | null {
  if (expireMs <= 0) return null;
  const diff = expireMs - Date.now();
  if (diff <= 0) return { label: 'Expired', color: 'red' };
  const days = Math.floor(diff / 86400000);
  if (days >= 1) return { label: `${days}d`, color: days <= 3 ? 'orange' : 'blue' };
  const hours = Math.max(1, Math.floor(diff / 3600000));
  return { label: `${hours}h`, color: 'orange' };
}

export default function SubUsageSummary({
  usedByte,
  totalByte,
  usedLabel,
  totalLabel,
  remainedLabel,
  expireMs,
  isActive,
}: SubUsageSummaryProps) {
  const { t } = useTranslation();
  const pct = useMemo(() => {
    if (totalByte <= 0) return 0;
    const v = (usedByte / totalByte) * 100;
    if (!Number.isFinite(v)) return 0;
    return Math.max(0, Math.min(100, v));
  }, [usedByte, totalByte]);

  const [animPct, setAnimPct] = useState(0);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAnimPct(pct));
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  const expiry = formatExpiryChip(expireMs);
  const isUnlimited = totalByte <= 0;
  const [colorFrom, colorTo] = pickRingColors(pct);
  const dashOffset = RING_C * (1 - animPct / 100);

  return (
    <div className={`usage-ring-wrap ${!isActive ? 'is-inactive' : ''}`}>
      <div className="usage-ring">
        <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
          <defs>
            <linearGradient id="kpRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorFrom} />
              <stop offset="100%" stopColor={colorTo} />
            </linearGradient>
          </defs>
          <circle
            className="usage-ring-rail"
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_R}
            strokeWidth={RING_STROKE}
            fill="none"
          />
          {!isUnlimited && (
            <circle
              className="usage-ring-fill"
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RING_R}
              strokeWidth={RING_STROKE}
              fill="none"
              stroke="url(#kpRingGrad)"
              strokeLinecap="round"
              strokeDasharray={RING_C}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
            />
          )}
        </svg>
        <div className="usage-ring-center">
          {isUnlimited ? (
            <span className="usage-ring-infinity">∞</span>
          ) : (
            <>
              <span className="usage-ring-pct">{pct.toFixed(0)}%</span>
              <span className="usage-ring-caption">{t('usage')}</span>
            </>
          )}
        </div>
      </div>

      <div className="usage-ring-side">
        <div className="usage-ring-row">
          <span className="usage-ring-key">{t('usage')}</span>
          <span className="usage-ring-val">{usedLabel}</span>
        </div>
        <div className="usage-ring-row">
          <span className="usage-ring-key">{t('subscription.totalQuota')}</span>
          <span className="usage-ring-val">{isUnlimited ? '∞' : totalLabel}</span>
        </div>
        {!isUnlimited && (
          <div className="usage-ring-row">
            <span className="usage-ring-key">{t('remained')}</span>
            <span className="usage-ring-val is-gold">{remainedLabel}</span>
          </div>
        )}
        <div className="usage-ring-chips">
          {isUnlimited && (
            <Tag color="purple" icon={<ThunderboltOutlined />}>
              {t('subscription.unlimited')}
            </Tag>
          )}
          {expiry && (
            <Tag color={expiry.color} icon={<ClockCircleOutlined />}>
              {expiry.label}
            </Tag>
          )}
        </div>
      </div>
    </div>
  );
}
