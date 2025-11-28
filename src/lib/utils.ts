import { formatHsl, oklch } from 'culori';
import dayjs from 'dayjs';
import { eq } from 'es-toolkit/compat'
import { toast } from 'sonner';

import { RESPONSE_CODE, RESPONSE_MSG } from '@/lib/constant';

/**
 * @description: 统一返回体
 */
export const responseMessage = (
  data: unknown,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): App.Common.IResponse => ({ data, msg, code, timestamp: dayjs().valueOf() });

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code?: number): boolean => eq(code, RESPONSE_CODE.SUCCESS);

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
 * 将 OKLCH 转换为纯 HSL 数值格式 (不带 hsl() 前缀)
 * @param color OKLCH 格式颜色
 * @returns 纯 HSL 数值字符串
 */
export const HexToHSLValue = (color: string) => {

  // 确保 color 是 HEX 格式
  const isValidHex = /^#[0-9A-Fa-f]{3,6}$/.test(color);
  if (!isValidHex) {
    toast.error("HEX 颜色格式不对!")
    return '212.02 100% 46.67%';
  }

  // 将 HEX 颜色转换为 HSL 格式
  const hslString = formatHsl(oklch(color)) as string; // 格式: "hsl(212.02, 100%, 46.67%)"

  // 使用正则表达式提取数字部分（h, s, l）
  const match = hslString.match(/(\d+\.\d+|\d+)%?/g);

  if (!match || match.length !== 3) {
    toast.error("HSL 颜色格式不对!")
    return '212.02 100% 46.67%';
  }

  const [h, s, l] = match; // 解构获取 H, S, L

  // 返回类似 "212.02 100% 46.67%" 格式
  return `${h} ${s} ${l}`;
};