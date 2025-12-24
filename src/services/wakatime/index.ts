import { httpRequest } from '@/lib/request';

/**
 * @description: 获取总编码时间
 */
export const getTotalTime = () => {
  return httpRequest.get<Api.IResponse<WakaTime.TotalTime>>('/wakatime/total-time');
};