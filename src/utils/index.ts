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
 * @description: 将扁平数据转换为树形结构
 */
type TreeNode<T> = T & { children?: TreeNode<T>[] };
export const convertFlatDataToTree = <T extends { id: string; parentId?: string }>(
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
    const parentNode = map[node.parentId ?? rootId];
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
