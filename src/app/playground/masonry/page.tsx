/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-31 15:26:50
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-31 16:18:54
 * @Description: 瀑布流
 */
"use client"
import BlurFade from '@/components/BlurFade';
import { Masonry, MasonryItem } from "@/components/ui/masonry";

export default function MasonryPage() {
  function generateItems(count: number): { id: string; number: number; aspectRatio: string }[] {
    const ratios = ["1/1", "4/3", "3/4", "2/3", "3/2"];
    return Array.from({ length: count }, (_, i) => {
      const id = String(i + 1);
      const aspectRatio = ratios[Math.floor(Math.random() * ratios.length)];
      return { id, number: i + 1, aspectRatio };
    });
  }
  return (
    <Masonry gap={10} columnWidth={200} linear>
      {generateItems(100).map((item) => (
        <MasonryItem key={item.id}>
          <BlurFade
            inView
            className="flex items-center justify-center rounded-lg border bg-card text-card-foreground shadow-xs text-3xl font-bold transition-all duration-300 hover:scale-[1.05]"
            style={{ aspectRatio: item.aspectRatio }}
          >
            {item.number}
          </BlurFade>
        </MasonryItem>
      ))}
    </Masonry>
  );
}