"use client"

import { BookOpenText, House, Mail, Moon, Sun } from "lucide-react"
import { AnimatePresence, motion } from 'motion/react';
import Link from "next/link"
import { useTheme } from "next-themes";
import { type MouseEvent, type ReactNode } from 'react'

import {
  Button,
  Dock,
  DockIcon,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui"
import { THEME_MODE } from '@/enums';
import { GithubIcon, JuejinIcon } from '@/lib/icons';
import pkg from '#/package.json';

type Social = {
  name: string;
  url: string;
  icon: ReactNode;
}

export default function DockCard() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === THEME_MODE.DARK;

  const socials: Social[] = [
    {
      name: "博客",
      url: 'https://baiwumm.com',
      icon: <BookOpenText />,
    },
    {
      name: "GitHub",
      url: `https://github.com/${pkg.author.name}`,
      icon: <GithubIcon />
    },
    {
      name: "掘金",
      url: 'https://juejin.cn/user/1917147257534279',
      icon: <JuejinIcon />
    },
    {
      name: "Email",
      url: `mailto:${pkg.author.email}`,
      icon: <Mail />
    }
  ]

  // 判断是否支持 startViewTransition API
  const enableTransitions = () =>
    "startViewTransition" in document && window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  // 切换主题
  const performThemeToggle = async (x: number, y: number) => {

    if (!enableTransitions()) {
      setTheme(isDark ? THEME_MODE.LIGHT : THEME_MODE.DARK);
      return;
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      )}px at ${x}px ${y}px)`,
    ];

    await document.startViewTransition(async () => {
      setTheme(isDark ? THEME_MODE.LIGHT : THEME_MODE.DARK);
    }).ready;

    document.documentElement.animate(
      { clipPath: !isDark ? clipPath.reverse() : clipPath },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: `::view-transition-${!isDark ? "old" : "new"}(root)`,
      }
    );
  };
  const handleToggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const { clientX: x, clientY: y } = event;
    performThemeToggle(x, y);
  };
  return (
    <div className="fixed inset-x-0 bottom-2 z-30 mx-auto flex origin-bottom h-full max-h-12">
      <div className="fixed bottom-0 inset-x-0 h-14 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock direction="middle" className="mt-0 h-full gap-1">
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href='/' aria-label="主页" target="_blank">
                <Button mode="icon" appearance="ghost" radius="full">
                  <House />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>主页</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
        <Separator orientation="vertical" className="h-full" />
        {socials.map(({ name, url, icon }) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={url} aria-label={name} target="_blank">
                  <Button mode="icon" appearance="ghost" radius="full">
                    {icon}
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="ThemeToggle"
                mode="icon"
                appearance="ghost"
                radius="full"
                onClick={handleToggleTheme}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="text-neutral-800 dark:text-neutral-200"
                    >
                      <Moon className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="text-neutral-800 dark:text-neutral-200"
                    >
                      <Sun className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>主题模式</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  )
}
