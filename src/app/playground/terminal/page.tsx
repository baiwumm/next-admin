/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-31 10:19:15
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-31 10:46:19
 * @Description: 终端
 */
import { AnimatedSpan, Terminal, TypingAnimation } from "@/components/ui";

export default function TerminalPage() {
  return (
    <div className="flex justify-center">
      <Terminal className="max-h-auto">
        <TypingAnimation>&gt; git clone https://github.com/baiwumm/next-ultra.git</TypingAnimation>
        <AnimatedSpan className="text-green-500">✔ Clone Success!.</AnimatedSpan>
        <TypingAnimation>&gt; cd next-ultra</TypingAnimation>
        <TypingAnimation>&gt; pnpm install</TypingAnimation>
        <AnimatedSpan className="text-green-500">✔ Lockfile is up to date, resolution step is skipped</AnimatedSpan>
        <AnimatedSpan className="text-green-500">✔ Already up to date</AnimatedSpan>
        <AnimatedSpan className="text-green-500">✔ Done in 2.9s using pnpm v10.25.0</AnimatedSpan>
        <TypingAnimation>&gt; pnpm dev</TypingAnimation>
        <AnimatedSpan className="text-green-500">✔ next dev -p 5173.</AnimatedSpan>
        <AnimatedSpan className="text-purple-500">▲ Next.js 16.0.10 (Turbopack)</AnimatedSpan>
        <AnimatedSpan className="text-blue-500">- Local: http://localhost:5173</AnimatedSpan>
        <AnimatedSpan className="text-blue-500">- Network: http://10.8.0.22:5173</AnimatedSpan>
        <AnimatedSpan className="text-blue-500">- Environments: .env</AnimatedSpan>
        <AnimatedSpan className="text-green-500">✓ Starting...</AnimatedSpan>
        <TypingAnimation className="text-muted-foreground">Success! Project initialization completed.</TypingAnimation>
        <TypingAnimation className="text-muted-foreground">You may now add components.</TypingAnimation>
      </Terminal>
    </div>
  );
}
