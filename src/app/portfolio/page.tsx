/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-12-02 16:19:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-12-17 09:21:02
 * @Description: 个人中心
 */
"use client"
import { useTheme } from "next-themes";

import ProjectCard from './components/ProjectCard'
import ResumeCard from './components/ResumeCard'
import { data } from './data'

import BlurFade from '@/components/BlurFade';
import BlurText from '@/components/BlurText';
import Highlighter from '@/components/Highlighter';
import LogoLoop from '@/components/LogoLoop'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { THEME_MODE } from '@/enums';

export default function Portfolio() {
  const { resolvedTheme } = useTheme();
  return (
    <main className="flex flex-col min-h-dvh space-y-10 max-w-3xl mx-auto px-4 py-8 pb-18">
      <BlurFade inView>
        <div className="mx-auto w-full space-y-8">
          <div className="gap-2 flex justify-between items-center">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurText
                className="text-lg font-bold tracking-tighter sm:text-4xl/none"
                text={`Hi, 我是${data.name} 👋`}
              />
              <BlurText
                className="max-w-[600px] md:text-lg"
                text={data.description}
              />
            </div>
            <Avatar className="size-28">
              <AvatarImage alt={data.name} src={data.avatarUrl} />
              <AvatarFallback>{data.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </BlurFade>
      <section>
        <BlurFade inView>
          <h2 className="text-xl font-bold">关于</h2>
        </BlurFade>
        <BlurFade inView>
          <div className="flex flex-col justify-center text-sm text-muted-foreground gap-1 mt-1">
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
      </section>
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <h2 className="text-xl font-bold">工作经历</h2>
          </BlurFade>
          {data.work.map((work) => (
            <BlurFade key={work.company} inView>
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <h2 className="text-xl font-bold">教育经历</h2>
          </BlurFade>
          {data.education.map((education) => (
            <BlurFade key={education.school} inView>
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
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <h2 className="text-xl font-bold">专业技能</h2>
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
      <section>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade inView>
            <h2 className="text-xl font-bold">个人小站</h2>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {data.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={id * 0.05}
                inView
              >
                <ProjectCard key={project.title} {...project} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}