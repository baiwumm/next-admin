import dayjs from 'dayjs';

import { LOCALES, RESPONSE_CODE, RESPONSE_MSG } from '@/enums';

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
 * @description: 将树形树形转成层级对象
 */
export const convertToLocalization = (data: App.SystemManage.Internalization[]): App.Auth.Locales => {
  const result: App.Auth.Locales = {
    zh: {},
    en: {},
  };

  function buildNestedObject(
    item: App.SystemManage.Internalization & {
      children?: App.SystemManage.Internalization[];
    },
    obj: Record<string, any>,
    lang: App.Common.Langs,
  ) {
    if (item.children) {
      obj[item.name] = {};
      for (const child of item.children) {
        buildNestedObject(child, obj[item.name], lang);
      }
    } else {
      obj[item.name] = item[lang];
    }
  }

  for (const lang of Object.values(LOCALES)) {
    for (const item of data) {
      buildNestedObject(item, result[lang], lang);
    }
  }

  return result;
};

/**
 * @description: 判断请求是否成功
 */
export const isSuccess = (code: number) => code === RESPONSE_CODE.SUCCESS;
