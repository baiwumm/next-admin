import dayjs from 'dayjs';

import { RESPONSE_CODE, RESPONSE_MSG } from '@/enums';
import { random, sample } from '@/lib/radash';

/**
 * @description: 统一返回体
 */
export const responseMessage = (
  data: any,
  msg: string = RESPONSE_MSG.SUCCESS,
  code: number = RESPONSE_CODE.SUCCESS,
): App.Common.IResponse => ({ data, msg, code, timestamp: dayjs().valueOf() });

/**
 * 将扁平数据转换为树形结构。
 * @param items - 扁平数据数组。
 * @param rootId - 可选的根节点 ID，默认为 null 表示查找顶级节点。
 * @returns 树形结构的节点数组。
 */
// 定义一个泛型接口来描述节点的最小属性要求
interface NodeBase {
  id: string;
  parentId?: string | null;
}

// 树节点类型定义，扩展了泛型 T 以包含 children 属性
type TreeNode<T extends NodeBase> = Omit<T, 'children'> & {
  children?: TreeNode<T>[];
};
export function convertFlatDataToTree<T extends NodeBase>(items: T[]): TreeNode<T>[] {
  const map = new Map<string, TreeNode<T>>();
  const roots: TreeNode<T>[] = [];

  // 首先将所有项放入 Map 中，以便快速查找
  for (const item of items) {
    const node: TreeNode<T> = { ...item };
    map.set(node.id, node);
  }

  // 再次遍历所有项，构建父子关系
  for (const item of items) {
    const node = map.get(item.id)!;

    if (item.parentId === undefined || item.parentId === null) {
      // 如果没有父节点，则认为是根节点
      roots.push(node);
    } else {
      const parent = map.get(item.parentId);
      if (parent) {
        // 如果存在父节点，则添加到父节点的 children 数组中
        if (!parent.children) {
          parent.children = [];
        }
        parent.children!.push(node);
      }
    }
  }

  return roots;
}

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code: number) => code === RESPONSE_CODE.SUCCESS;

/**
 * @param {number} size 随机获取几张图片数组，默认获取随机一张图片
 * @description: 获取 /public/image 路径下随机图片
 */
export const getRandomImg = (size = 1) => {
  // 匹配该目录下所有的图片
  const images: string[] = [];
  for (let i = 1; i <= 20; i += 1) {
    images.push(`/images/${i}.jpg`);
  }
  // 获取图片集合
  const result = [];
  for (let i = 0; i < size; i++) {
    result[i] = sample(images);
  }
  return result.length === 1 ? result[0] : result;
};

/** @description: 生成随机颜色 */
export const randomColor = (min = 0, max = 255) => {
  // 生成三个介于 0 到 255 之间的随机数作为 RGB 的值
  const r = random(min, max);
  const g = random(min, max);
  const b = random(min, max);
  return `rgb(${r},${g},${b})`;
};

/** @description: 验证码字符 */
export const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * @description: 生成随机的汉字数组
 * @param {number} count
 */
export const generateRandomHanziArray = (count = 1) => {
  const minCode = 0x4e00; // 汉字 Unicode 范围的最小值
  const maxCode = 0x9fff; // 汉字 Unicode 范围的最大值

  const hanziArray = [];
  for (let i = 0; i < count; i++) {
    const randomCode = random(minCode, maxCode);
    hanziArray.push(String.fromCodePoint(randomCode));
  }

  return hanziArray;
};
