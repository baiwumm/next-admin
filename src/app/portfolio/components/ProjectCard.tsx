import { Globe } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  GitHubStarsButton
} from "@/components/ui";
import { cn } from "@/lib/utils";
import pkg from '#/package.json'

export interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  image?: string;
  video?: string;
  repo?: string;
  className?: string;
}

export default function ProjectCard({
  title,
  href,
  description,
  tags,
  image,
  video,
  repo,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full rounded-lg gap-2"
      }
    >
      <Link
        href={href || "#"}
        target='_blank'
        className={cn("block cursor-pointer", className)}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top" // needed because random black line at bottom of video
          />
        ) : null}
        {image ? (
          <Image
            src={image}
            alt={title}
            width={526}
            height={274}
            className="w-full overflow-hidden object-cover object-top p-3 hover:scale-105 transition-all duration-300 ease-out"
          />
        ) : null}
      </Link>
      <CardHeader className="px-3 py-1 border-none">
        <CardTitle className="text-base flex justify-between items-center gap-2">
          <div className="relative flex">
            <div className={cn('size-2 rounded-full', 'bg-green-500 dark:bg-green-400')} />
            <div className={cn('absolute inset-0 size-2 rounded-full animate-ping opacity-75', 'bg-green-500 dark:bg-green-400')} />
          </div>
          <span>{title}</span>
        </CardTitle>
        <div className="prose max-w-full text-pretty text-xs text-muted-foreground overflow-hidden line-clamp-3 wrap-break-word">
          {description}
        </div>
      </CardHeader>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto px-3">
          {tags?.map((tag) => (
            <Badge
              variant="secondary"
              size="sm"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <div className="flex flex-row flex-wrap items-start gap-1 px-3 pb-3">
        {href ? (
          <Link href={href} target="_blank">
            <Button size="xs">
              <Globe />
              Website
            </Button>
          </Link>
        ) : null}
        {repo ? (
          <Link href={`https://github.com/${pkg.author.name}/${repo}`} target="_blank">
            <GitHubStarsButton
              size='xs'
              username={pkg.author.name}
              repo={repo}
              className="gap-2"
            />
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
