import { Skeleton } from 'antd';
import './PageSkeleton.css';

interface PageSkeletonProps {
  variant?: 'dashboard' | 'table' | 'form';
  rows?: number;
}

/**
 * Shared skeleton placeholder for pages that are waiting on their
 * initial fetch. Replaces the old blank `.loading-spacer` div.
 * Renders shimmering cards/rows sized to the actual layout so the
 * jump from skeleton -> content is minimal.
 */
export default function PageSkeleton({ variant = 'dashboard', rows = 8 }: PageSkeletonProps) {
  if (variant === 'table') {
    return (
      <div className="kp-skel kp-skel-table" aria-hidden="true">
        <div className="kp-skel-toolbar">
          <Skeleton.Button active size="small" style={{ width: 220 }} />
          <Skeleton.Button active size="small" style={{ width: 96 }} />
          <Skeleton.Button active size="small" style={{ width: 96 }} />
        </div>
        <div className="kp-skel-card">
          {Array.from({ length: rows }).map((_, i) => (
            <div className="kp-skel-row" key={i}>
              <Skeleton.Avatar active size="small" shape="circle" />
              <Skeleton.Input active size="small" style={{ width: '22%' }} />
              <Skeleton.Input active size="small" style={{ width: '18%' }} />
              <Skeleton.Input active size="small" style={{ width: '14%' }} />
              <Skeleton.Button active size="small" style={{ width: 68 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'form') {
    return (
      <div className="kp-skel kp-skel-form" aria-hidden="true">
        <div className="kp-skel-card">
          <Skeleton active title={{ width: '30%' }} paragraph={{ rows: 3 }} />
        </div>
        <div className="kp-skel-card">
          <Skeleton active title={{ width: '24%' }} paragraph={{ rows: 4 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="kp-skel kp-skel-dashboard" aria-hidden="true">
      <div className="kp-skel-hero">
        <Skeleton.Avatar active size="large" shape="circle" />
        <div className="kp-skel-hero-text">
          <Skeleton.Input active size="small" style={{ width: 180 }} />
          <Skeleton.Input active size="small" style={{ width: 120 }} />
        </div>
      </div>
      <div className="kp-skel-grid">
        <div className="kp-skel-card kp-skel-big">
          <Skeleton active paragraph={{ rows: 5 }} />
        </div>
        <div className="kp-skel-card">
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
        <div className="kp-skel-card">
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
        <div className="kp-skel-card">
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      </div>
    </div>
  );
}
