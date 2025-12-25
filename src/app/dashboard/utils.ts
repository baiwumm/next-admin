import { randomNumber } from '@/lib/utils';

export type StatisticData = {
  data: number; // 当前数据
  comparison: number; // 环比数据
  trend: 'up' | 'down'; // 趋势（上升或下降）
  percent: number; // 趋势百分比
};

/**
 * 生成模拟的统计数据
 * @param baseMin - 当前的最小基准值（默认 800）
 * @param baseMax - 当前的最大基准值（默认 2000）
 */
export function getStatisticData(baseMin = 800, baseMax = 2000): StatisticData {
  // 1. 生成当前周期
  const data = randomNumber(baseMin, baseMax);

  // 2. 模拟上一周期数据：在当前值的 70% ~ 110% 范围内波动（允许小幅上涨或下降）
  const varianceFactor = 0.3; // 最大波动幅度 ±30%
  const minPrev = Math.max(100, Math.floor(data * (1 - varianceFactor)));
  const maxPrev = Math.floor(data * (1 + varianceFactor));
  const comparison = randomNumber(minPrev, maxPrev);

  // 3. 计算变化百分比（保留一位小数）
  const percent = parseFloat(((data - comparison) / comparison * 100).toFixed(1));

  // 4. 判断趋势
  const trend = data >= comparison ? 'up' : 'down';

  return {
    data,
    comparison,
    trend,
    percent,
  };
}