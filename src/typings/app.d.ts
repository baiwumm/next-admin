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
    /** @description: 查询时间 */
    type SearchTime = {
      startTime?: number; // 开始时间
      endTime?: number; // 结束时间
    };
    /** @description: 列项公共时间 */
    type ColumnTime = {
      created_at: string; // 创建时间
      updated_at: string; // 更新时间
    }
    /** @description: 列配置项 */
    type ColumnOption = {
      uid: string;
      name: string;
      sortable?: boolean;
      show?: boolean;
    }
  }
  namespace SystemSettings {
    /** @description: 菜单管理 */
    type Menu = {
      id: string;
      label: string;
      path: string;
      icon: string;
      redirect?: string;
      sort: number;
      parent_id?: string | null;
      children: Menu[];
    } & Common.ColumnTime;
    /** @description: 保存参数 */
    type MenuSaveParams = Partial<Pick<Menu, 'id' | 'parent_id' | 'redirect'>> &
      Pick<Menu, 'label' | 'path' | 'icon' | 'sort'> & {
        user_id?: string;
      };
  }
}
