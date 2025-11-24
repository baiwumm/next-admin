/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-24 10:52:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-24 10:53:09
 * @Description: 主题选择器
 */
import { Button } from "@heroui/react";
import { formatHex, oklch } from 'culori';
import { keys, map, omit, upperFirst } from 'es-toolkit/compat'
import { type FC } from 'react';
import colors from 'tailwindcss/colors';

import { useAppStore } from '@/store/useAppStore';

type Color = keyof typeof colors;

const PrimaryColorPicker: FC = () => {
  const primaryColor = useAppStore((s) => s.primaryColor);
  const setPrimaryColor = useAppStore((s) => s.setPrimaryColor);
  const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white'];
  const primaryColors = keys(omit(colors, colorsToOmit)) as Color[];
  const blackHex = '#000000';
  const isBlack = blackHex === primaryColor;
  // 渲染圆点
  const renderDot = (color: Color) => (
    <span className="inline-block size-2 rounded-full"
      style={{ backgroundColor: colors[color]?.[500] }} />
  )

  // 转成 hex 格式
  const colorToHex = (color: Color) => {
    const okColor = colors[color]?.[500]; // OKLCH 字符串
    return formatHex(oklch(okColor)) as string;
  }
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        variant={isBlack ? 'flat' : 'ghost'}
        startContent={(
          <span className="inline-block w-2 h-2 rounded-full bg-black" />
        )}
        size='sm'
        className="justify-start"
        onPress={() => setPrimaryColor(blackHex)}
      >
        Black
      </Button>
      {map(primaryColors, color => (
        <Button
          variant={colorToHex(color) === primaryColor ? 'flat' : 'ghost'}
          startContent={renderDot(color)}
          size='sm'
          className='justify-start'
          key={color}
          onPress={() => setPrimaryColor(colorToHex(color))}
        >
          {upperFirst(color)}
        </Button>
      ))}
    </div>
  )
}
export default PrimaryColorPicker;