import { z } from 'zod';

/**
 * @description: 新增/编辑表单
 */
export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: '此字段是必填项' })
    .max(32, { message: '最多输入32个字符' })
    .refine((val) => !/\s/.test(val), {
      message: '字段中不能包含空格',
    }),
  zh: z
    .string()
    .trim()
    .max(500, { message: '最多输入500个字符' })
    .refine((val) => !/\s/.test(val), {
      message: '字段中不能包含空格',
    })
    .optional(),
  en: z
    .string()
    .trim()
    .max(500, { message: '最多输入500个字符' })
    .refine((val) => !/\s/.test(val), {
      message: '字段中不能包含空格',
    })
    .optional(),
});

/**
 * @description: 搜索表单
 */
export const searchFormSchema = z.object({
  name: z.string().optional(),
  zh: z.string().optional(),
});
