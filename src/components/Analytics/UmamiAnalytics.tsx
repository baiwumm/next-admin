/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-01-08 09:21:56
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-01-08 09:22:25
 * @Description: Umami 统计分析
 */
import Script from 'next/script';

const UmamiAnalytics = () => {
  return process.env.UMAMI_ANALYTICS && process.env.NODE_ENV === 'production' ? (
    <Script src="https://umami.baiwumm.com/script.js" data-website-id={process.env.UMAMI_ANALYTICS} />
  ) : null;
};
export default UmamiAnalytics;
