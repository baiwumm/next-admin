import { PERIODS } from '@/enums';
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

/**
 * 生成模拟销售额统计数据
 * @param type - 统计周期类型: 'day' | 'week' | 'month' | 'year'
 * @returns 按指定格式返回的销售额数据数组
 */
export interface DualMetricDataItem {
  period: string;
  sales: number; // 销售额（柱状图）
  orders: number; // 订单数（折线图）
}
export function generateDualMetricData(type: typeof PERIODS.valueType): DualMetricDataItem[] {
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateWithTrend = (base: number, variance: number, index: number) => {
    // 加入轻微周期性（如周末高、月底高）
    const trend = type === 'week' && [5, 6].includes(index) ? 1.3 : 1; // 周六日高
    const value = base + (Math.random() - 0.5) * variance;
    return Math.max(0, Math.round(value * trend));
  };

  switch (type) {
    case 'day':
      return Array.from({ length: 24 }, (_, i) => {
        const sales = generateWithTrend(3000, 2000, i);
        const orders = Math.max(1, Math.round(sales / randomInt(80, 150))); // 客单价 80~150
        return {
          period: `${String(i).padStart(2, '0')}:00`,
          sales,
          orders,
        };
      });

    case 'week':
      const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return weekdays.map((_, i) => {
        const sales = generateWithTrend(15000, 8000, i);
        const orders = Math.max(1, Math.round(sales / randomInt(100, 200)));
        return {
          period: weekdays[i],
          sales,
          orders,
        };
      });

    case 'month':
      return Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;
        // 月底冲量：25-31 日更高
        const isEndOfMonth = day >= 25;
        const sales = isEndOfMonth
          ? randomInt(25000, 40000)
          : randomInt(10000, 25000);
        const orders = Math.max(1, Math.round(sales / randomInt(120, 180)));
        return {
          period: String(day).padStart(2, '0'),
          sales,
          orders,
        };
      });

    case 'year':
      return Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        // 双11/双12 冲高
        const isPromotion = [10, 11].includes(i); // 11月、12月（索引10=11月）
        const sales = isPromotion
          ? randomInt(80000, 120000)
          : randomInt(30000, 70000);
        const orders = Math.max(1, Math.round(sales / randomInt(150, 250)));
        return {
          period: `${month}月`,
          sales,
          orders,
        };
      });

    default:
      throw new Error('Invalid period type');
  }
}