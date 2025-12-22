"use client"

import { BookOpenText, House, Mail, Moon, Sun } from "lucide-react"
import { AnimatePresence, motion } from 'motion/react';
import Image from "next/image";
import Link from "next/link"
import { useTheme } from "next-themes";
import { type ReactNode } from 'react'

import {
  type Resolved,
  type ThemeSelection,
  ThemeToggler as ThemeTogglerPrimitive
} from '@/components/animate-ui/primitives/effects/theme-toggler';
import {
  Button,
  Dock,
  DockIcon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui"
import { THEME_MODE } from '@/enums';
import { GithubIcon, JuejinIcon, WechatIcon } from '@/lib/icons';
import { useAppStore } from '@/store/useAppStore';
import pkg from '#/package.json';

type Social = {
  name: string;
  url: string;
  icon: ReactNode;
}

type Wechat = {
  name: string;
  image: string;
}

export default function DockCard() {
  const themeModeDirection = useAppStore((s) => s.themeModeDirection);
  const { theme, resolvedTheme, setTheme } = useTheme();
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

  const wechat: Wechat[] = [
    { name: "微信", image: '/portfolio/wechat.jpg' },
    { name: "公众号", image: '/portfolio/wechatOA.jpg' },
    { name: "小程序", image: '/portfolio/app.jpg' }
  ]
  return (
    <div className="fixed inset-x-0 bottom-2 z-30 mx-auto flex origin-bottom h-full max-h-12">
      <div className="fixed bottom-0 inset-x-0 h-14 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock direction="middle" className="mt-0 h-full gap-0.5">
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href='/' aria-label="主页" target="_blank">
                <Button mode="icon" variant="ghost" radius="full">
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
        <DockIcon>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="rounded-full" size='icon'>
                <WechatIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2">
              <div className="grid grid-cols-3 gap-1">
                {wechat.map(({ name, image }, index) => (
                  <div key={index} className="flex flex-col items-center justify-center text-xs text-muted-foreground">
                    <Image src={image} width={80} height={80} alt={name} />
                    <p>{name}</p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </DockIcon>
        {socials.map(({ name, url, icon }) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={url} aria-label={name} target="_blank">
                  <Button mode="icon" variant="ghost" radius="full">
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
          <ThemeTogglerPrimitive
            theme={theme as ThemeSelection}
            resolvedTheme={resolvedTheme as Resolved}
            setTheme={setTheme}
            direction={themeModeDirection}
          >
            {({ toggleTheme }) => (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    aria-label="ThemeToggle"
                    variant="ghost"
                    className="rounded-full"
                    size='icon'
                    onClick={() => toggleTheme(isDark ? THEME_MODE.LIGHT : THEME_MODE.DARK)}
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
            )}
          </ThemeTogglerPrimitive>
        </DockIcon>
      </Dock>
    </div>
  )
}
