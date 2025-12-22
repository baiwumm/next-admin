/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-02 16:19:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-22 11:00:46
 * @Description: 个人中心
 */
"use client"
import { useRequest } from 'ahooks';
import { useTheme } from "next-themes";

import GithubActivity from './components/GithubActivity';
import PostCard, { type PostCardProps } from './components/PostCard';
import ProjectCard, { type ProjectCardProps } from './components/ProjectCard'
import ResumeCard from './components/ResumeCard'
import { data, SCROLL_SPY } from './data'

import BlurFade from '@/components/BlurFade';
import BlurText from '@/components/BlurText';
import Highlighter from '@/components/Highlighter';
import LogoLoop from '@/components/LogoLoop'
import { Avatar, AvatarFallback, AvatarImage, Spinner } from '@/components/ui';
import { THEME_MODE } from '@/enums';
import { get } from '@/lib/utils';

export default function Portfolio() {
  const { resolvedTheme } = useTheme();
  const BLUR_FADE_DELAY = 0.04;
  // 获取文章
  const { data: posts = [], loading: postLoading } = useRequest(async () => {
    const res = await fetch('/api/halo/posts?page=1&size=5', {
      cache: 'no-store', // 确保获取最新数据
    });
    if (!res.ok) {
      return [];
    }
    const result = await res.json();
    return get(result, 'data.items', [])
  });
  return (
    <main className="flex flex-col min-h-dvh space-y-10 max-w-3xl mx-auto px-4 py-8 pb-18">
      <section id={SCROLL_SPY.HERO}>
        <div className="flex justify-between items-center">
          <div className="flex-col flex flex-1 gap-4">
            <BlurText
              className="text-lg font-bold tracking-tighter sm:text-4xl/none"
              text={`Hi, 我是${data.name} 👋`}
            />
            <BlurText
              className="max-w-[600px] md:text-lg"
              text={data.description}
            />
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className="size-28" >
              <AvatarImage alt={data.name} src={data.avatarUrl} />
              <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </section>
      <section id={SCROLL_SPY.ABOUT}>
        <div className="flex flex-col gap-2">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">{SCROLL_SPY.label(SCROLL_SPY.ABOUT)}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex flex-col justify-center text-sm text-muted-foreground gap-1">
              <p>擅长用 React/Vue 构建用户界面，对 工程化 和 性能优化 充满好奇</p>
              <p>正在向 {" "}
                <Highlighter action="highlight" color="#87CEFA">
                  <span className="text-white/85">
                    「更优雅的代码」
                  </span>
                </Highlighter> {" "}
                和 {" "}
                <Highlighter action="highlight" color="#87CEFA">{" "}
                  <span className="text-white/85">
                    「更高效的协作」
                  </span>
                </Highlighter>
                方向努力</p>
              “代码是写给人看的，只是顺便让机器能运行”
              <p className="font-bold">
                <Highlighter action="underline" color="#FF9800">
                  希望我的代码能像热带气候一样——永远热情，偶尔风暴 🌪️
                </Highlighter>
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id={SCROLL_SPY.ACTIVITY}>
        <div className="flex flex-col gap-4">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">{SCROLL_SPY.label(SCROLL_SPY.ACTIVITY)}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <GithubActivity />
          </BlurFade>
        </div>
      </section>
      <section id={SCROLL_SPY.WORK}>
        <div className="flex min-h-0 flex-col gap-4">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{SCROLL_SPY.label(SCROLL_SPY.WORK)}</h2>
          </BlurFade>
          {data.work.map((work, index) => (
            <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "至今"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id={SCROLL_SPY.EDUCATION}>
        <div className="flex min-h-0 flex-col gap-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{SCROLL_SPY.label(SCROLL_SPY.EDUCATION)}</h2>
          </BlurFade>
          {data.education.map((education, index) => (
            <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 9 + index * 0.05}>
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id={SCROLL_SPY.SKILLS}>
        <div className="flex min-h-0 flex-col gap-4">
          <BlurFade inView>
            <h2 className="text-xl font-bold">{SCROLL_SPY.label(SCROLL_SPY.SKILLS)}</h2>
          </BlurFade>
          <BlurFade inView>
            <LogoLoop
              logos={data.skills}
              speed={40}
              direction="left"
              logoHeight={48}
              gap={20}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor={resolvedTheme === THEME_MODE.DARK ? "#000000" : "#ffffff"}
              ariaLabel="Skill logos"
            />
          </BlurFade>
        </div>
      </section>
      <section id={SCROLL_SPY.PROJECTS}>
        <div className="flex min-h-0 flex-col gap-4">
          <BlurFade inView>
            <h2 className="text-xl font-bold">{SCROLL_SPY.label(SCROLL_SPY.PROJECTS)}</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {data.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={id * 0.05}
                inView
              >
                <ProjectCard key={project.title} {...project as ProjectCardProps} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id={SCROLL_SPY.POSTS}>
        <div className="flex min-h-0 flex-col gap-4">
          <BlurFade inView>
            <h2 className="text-xl font-bold">{SCROLL_SPY.label(SCROLL_SPY.POSTS)}</h2>
          </BlurFade>
          <BlurFade inView>
            {postLoading ? (
              <div className="flex justify-center items-center h-60">
                <Spinner />
              </div>
            ) : (
              <div className="relative">
                {(posts || []).map((post: PostCardProps) => (
                  <BlurFade key={post.post.spec.slug} inView>
                    <PostCard {...post} />
                  </BlurFade>
                ))}
              </div>
            )}
          </BlurFade>
        </div>
      </section>
    </main>
  )
}