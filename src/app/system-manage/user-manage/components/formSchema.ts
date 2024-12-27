import { z } from 'zod';

/**
 * @description: 新增/编辑表单
 */
export const formSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(1, { message: '此字段是必填项' })
    .max(32, { message: '最多输入32个字符' })
    .refine((val) => !/\s/.test(val), {
      message: '字段中不能包含空格',
    }),
  cnName: z
    .string()
    .trim()
    .min(1, { message: '此字段是必填项' })
    .max(12, { message: '最多输入12个字符' })
    .refine((val) => !/\s/.test(val), {
      message: '字段中不能包含空格',
    }),
  email: z.string().email({ message: '邮件格式不正确' }),
  phone: z
    .string()
    .trim()
    .length(11, { message: '手机号码必须是11位' })
    .regex(/^[1-9]\d{10}$/, { message: '请输入有效的手机号码' }),
  sex: z.enum(['FEMALE', 'MALE']),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  sort: z.number().min(1).max(99),
  password: z.string().trim().min(1, { message: '此字段是必填项' }).max(12, { message: '最多输入12个字符' }),
});

/**
 * @description: 搜索表单
 */
export const searchFormSchema = z.object({
  userName: z.string().optional(),
});
