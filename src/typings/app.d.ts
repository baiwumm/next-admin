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
    type PaginatingQueryRecord<T = unknown> = {
      records: T[];
    } & PaginatingResponse;
    /** @description: 响应体 */
    type IResponse<T = unknown> = {
      code: number; // 状态码
      data: T; // 数据
      msg: string; // 消息
      timestamp: number; // 时间戳
    };
    /** @description: 国际化语言 */
    type Langs = 'zh' | 'en';
    /** @description: 查询时间 */
    type SearchTime = {
      startTime?: number; // 开始时间
      endTime?: number; // 结束时间
    };
  }
  namespace Auth {
    /** @description: 国际化层级数据 */
    type Locales = Record<Common.Langs, unknown>;
    /** @description: 掘金参数 */
    type JuejinParams = {
      user_id: string;
      sort_type: number;
      cursor: string;
    };
  }
  namespace SystemManage {
    /** @description: 用户管理 */
    type User = import('@prisma/client').User & {
      accounts: import('@prisma/client').Account[];
    };
    /** @description: 查询参数 */
    type UserSearchParams = Common.PaginatingParams & {
      name?: string;
      email?: string;
    };
    /** @description: 菜单管理 */
    type Menu = import('@prisma/client').Menu & {
      parent: null | Menu;
    };
    /** @description: 查询参数 */
    type MenuSearchParams = Common.SearchTime & {
      name?: string;
    };
    /** @description: 保存参数 */
    type MenuSaveParams = Partial<Pick<Menu, 'id' | 'parentId' | 'redirect'>> &
      Pick<Menu, 'name' | 'path' | 'icon' | 'sort'>;
  }
}
