/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-12-18 10:59:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-12-18 15:39:17
 * @Description: 指标说明
 */
'use client';

import PageViewCard from './PageViewCard'; // 访问量卡片
import PaymentNumberCard from './PaymentNumberCard'; // 支付笔数卡片
import SaleCard from './SaleCard'; // 总销售额卡片
import SatisfactionCard from './SatisfactionCard'; // 客户满意度卡片

export default function StatisticChart() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* 总销售额 */}
      <SaleCard />
      {/* 访问量卡 */}
      <PageViewCard />
      {/* 支付笔数 */}
      <PaymentNumberCard />
      {/* 客户满意度 */}
      <SatisfactionCard />
    </div>
  );
}
