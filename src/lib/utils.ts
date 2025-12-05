import { type ClassValue, clsx } from "clsx"
import dayjs from 'dayjs';
import { twMerge } from "tailwind-merge"

import { COLOR_STYLE, RESPONSE, THEME_PRIMARY_COLOR } from '@/enums';

/**
 * @description: 合并类名
 * @param {array} inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Pick a list of properties from an object
 * into a new object
 */
export const pick = <T extends object, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key]
    return acc
  }, {} as Pick<T, TKeys>)
}

/**
 * Omit a list of properties from an object
 * returning a new object with the properties
 * that remain
 */
export const omit = <T, TKeys extends keyof T>(
  obj: T,
  keys: TKeys[]
): Omit<T, TKeys> => {
  if (!obj) return {} as Omit<T, TKeys>
  if (!keys || keys.length === 0) return obj as Omit<T, TKeys>
  return keys.reduce(
    (acc, key) => {
      // Gross, I know, it's mutating the object, but we
      // are allowing it in this very limited scope due
      // to the performance implications of an omit func.
      // Not a pattern or practice to use elsewhere.
      delete acc[key]
      return acc
    },
    { ...obj }
  )
}

/**
 * Dynamically get a nested value from an array or
 * object with a string.
 *
 * @example get(person, 'friends[0].name')
 */
export const get = <TDefault = unknown>(
  value: unknown,
  path: string,
  defaultValue?: TDefault
): TDefault => {
  const segments = path.split(/[\.\[\]]/g)
  let current: any = value
  for (const key of segments) {
    if (current === null) return defaultValue as TDefault
    if (current === undefined) return defaultValue as TDefault
    const dequoted = key.replace(/['"]/g, '')
    if (dequoted.trim() === '') continue
    current = current[dequoted]
  }
  if (current === undefined) return defaultValue as TDefault
  return current
}

/**
 * @description: 统一返回体
 */
export const responseMessage = (
  data: unknown,
  msg: string = RESPONSE.labels[0],
  code: number = RESPONSE.SUCCESS,
): Api.IResponse => ({ data, msg, code, timestamp: dayjs().valueOf() });

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code?: number): boolean => code === RESPONSE.SUCCESS;

/**
 * @description: 将扁平数据转换为树形结构
 */
type TreeNode<T> = T & { children?: TreeNode<T>[] };
export const convertFlatDataToTree = <T extends { id: string; parent_id?: string }>(
  flatData: T[],
  rootId?: string,
): TreeNode<T>[] => {
  const map: Record<string, TreeNode<T>> = {};
  const roots: TreeNode<T>[] = [];

  // 将所有节点添加到 map 中，以 id 作为 key
  flatData.forEach((node) => {
    map[node.id] = { ...node } as TreeNode<T>; // 明确类型转换为 TreeNode<T>
  });

  // 遍历所有节点，构建树形结构
  flatData.forEach((node) => {
    const parentNode = map[(node.parent_id ?? rootId) as string];
    if (parentNode) {
      let children = parentNode.children;
      if (!children) {
        children = [];
        Object.assign(parentNode, { children }); // 添加 children 属性
      }
      children.push(map[node.id]);
    } else {
      // 如果找不到父节点，将当前节点作为根节点
      roots.push(map[node.id]);
    }
  });

  // 移除空的 children 属性
  const cleanUpEmptyChildren = (nodes: TreeNode<T>[]): TreeNode<T>[] =>
    nodes.map((node) => ({
      ...node,
      children: node.children && node.children.length > 0 ? cleanUpEmptyChildren(node.children) : undefined,
    }));

  return cleanUpEmptyChildren(roots);
};

/**
 * @description: 初始化主题色
 * @param {typeof} color
 */
export const initializePrimaryColor = (color: typeof THEME_PRIMARY_COLOR.valueType) => {
  if (typeof document !== 'undefined') {
    // 清空 theme- 开头的类名
    const html = document.documentElement;
    Array.from(html.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        html.classList.remove(className)
      })
    // 如果不是默认主题色，则添加对应的类名
    if (color !== THEME_PRIMARY_COLOR.DEFAULT) {
      html.classList.add(`theme-${color}`);
    }
  }
}

// 初始化色彩风格
export const initializeColorStyle = (value: typeof COLOR_STYLE.valueType) => {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    html.classList.remove(`color-${COLOR_STYLE.GREY}`, `color-${COLOR_STYLE.INVERT}`);
    if (value !== COLOR_STYLE.DEFAULT) {
      html.classList.add(`color-${value}`);
    }
  }
}
