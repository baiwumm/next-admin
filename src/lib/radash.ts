/**
 * @description: 获取对象指定路径的值
 */
export const get = <TDefault = unknown>(value: any, path: string, defaultValue?: TDefault): TDefault => {
  const segments = path.split(/[\.\[\]]/g);
  let current: any = value;
  for (const key of segments) {
    if (current === null) return defaultValue as TDefault;
    if (current === undefined) return defaultValue as TDefault;
    const dequoted = key.replace(/['"]/g, '');
    if (dequoted.trim() === '') continue;
    current = current[dequoted];
  }
  if (current === undefined) return defaultValue as TDefault;
  return current;
};

/**
 * @description: 获取随机数
 * @param {number} min
 * @param {number} max
 */
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * @description: 数组求和
 * @param {T} array
 * @param {(item: T) => number} fn
 */
export function sum<T extends object | number>(array: readonly any[], fn?: (item: T) => number): number {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0);
}

/**
 * @description: 随机获取数组中的一项
 */
export const sample = <T>(array: readonly T[]): T | null => {
  const max = array.length;
  if (max === 0) {
    return null;
  }
  const index = random(0, max - 1);
  return array[index];
};

/**
 * @description: 随机打乱数组
 */
export const shuffle = <T>(array: readonly T[]): T[] => {
  return array
    .map((a) => ({ rand: Math.random(), value: a }))
    .sort((a, b) => a.rand - b.rand)
    .map((a) => a.value);
};

/**
 * @description: 挑选属性
 */
export const pick = <T extends object, TKeys extends keyof T>(obj: T, keys: TKeys[]): Pick<T, TKeys> => {
  if (!obj) return {} as Pick<T, TKeys>;
  return keys.reduce(
    (acc, key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) acc[key] = obj[key];
      return acc;
    },
    {} as Pick<T, TKeys>,
  );
};
