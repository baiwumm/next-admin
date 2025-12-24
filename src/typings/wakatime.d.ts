declare namespace WakaTime {
  /** @description: 总编码时间 */
  type TotalTime = {
    total: {
      hours: number,
      formatted: string
    },
    current_30_est: {
      hours: number,
      formatted: string
    },
    previous_30_sim: {
      hours: number,
      formatted: string
    },
    change_percent: number,
    trend: typeof import('@/enums').TREND.valueType
  };
}