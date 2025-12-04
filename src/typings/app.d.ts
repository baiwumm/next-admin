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
    /** @description: 菜单 Key */
    type RouteKey = keyof (typeof import('#/messages/en.json'))['Route']
  }
  namespace SystemSettings {
    /** @description: 菜单管理 */
    type Menu = {
      id: string;
      label: Common.RouteKey;
      path: string;
      icon: import('lucide-react/dynamic').IconName;
      desc?: Common.RouteKey | null;
      redirect?: string;
      sort: number;
      parent_id?: string | null;
      children: Menu[];
    } & Common.ColumnTime;
    /** @description: 保存参数 */
    type MenuSaveParams = Partial<Pick<Menu, 'id' | 'parent_id' | 'desc' | 'redirect'>> &
      Pick<Menu, 'label' | 'path' | 'icon' | 'sort'> & {
        user_id?: string;
      };

    /** @description: 用户管理 */
    type User = {
      id: string; // 主键
      aud: string; // 认证来源（通常是 authenticated）
      role: string; // 用户角色（一般是 authenticated，内部用途）
      email: string | null; // 用户注册邮箱
      phone: string; // 用户手机号（如果使用手机号注册）
      app_metadata: Record<string, unknown>; // 应用元数据，由 Supabase 自动维护，例如：provider（注册方式，如 email、google、github）等
      user_metadata: Record<string, unknown>; // 自定义用户元数据（你在注册或更新用户时传入的自定义字段）
      identities: string[] | null; // 用户的身份提供者（例如邮箱、Google、GitHub 登录等）详细信息
      created_at: string; // 用户创建时间（注册时间）
      updated_at: string; // 用户信息最后更新时间
      last_sign_in_at: string?; // 用户上次登录时间
      confirmed_at?: string; // 用户邮箱验证通过的时间（如果验证过）
      email_confirmed_at?: string; // 邮箱验证时间（同上）
      phone_confirmed_at?: string; // 手机号验证时间（如使用手机注册）
      confirmation_sent_at?: string; // 注册确认邮件发送时间
    }
    /** @description: 用户查询参数 */
    type SearchUserParams = {
      page: number;
      perPage: number
    }
  }
}
