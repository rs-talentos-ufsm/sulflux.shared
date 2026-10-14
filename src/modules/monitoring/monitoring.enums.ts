export const MonitoringEventType = {
  Ready: 'READY',
  Processing: 'PROCESSING',
  Sent: 'SENT',
  Season: 'SEASON',
} as const;

export type EnumMonitoringEventType =
  (typeof MonitoringEventType)[keyof typeof MonitoringEventType];
