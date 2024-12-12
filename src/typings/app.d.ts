declare namespace App {
  namespace Common {
    /** @description: 请求分页参数 */
    type PaginatingParams = {
      current: number; // 页码
      size: number; // 条数
    };
    /** @description: 分页响应体 */
    type PaginatingResponse = {
      total: number; // 总条数
    } & PaginatingParams;
    /** @description: 分页列表 */
    type PaginatingQueryRecord<T = any> = {
      records: T[];
    } & PaginatingResponse;
    /** @description: 响应体 */
    type IResponse<T = any> = {
      code: number; // 状态码
      data: T; // 数据
      msg: string; // 消息
      timestamp: number; // 时间戳
    };
  }
  namespace SystemManage {
    /** @description: 国际化 */
    type Internalization = import('@prisma/client').Internalization;
    /** @description: 查询参数 */
    type InternalizationSearchParams = Partial<Pick<Internalization, 'name' | 'zh'>>;
  }
}
