import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import Image from "next/image";
import Link from "next/link";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  GitHubStarsButton
} from "@/components/ui";
import { cn } from "@/lib/utils";
import pkg from '#/package.json'

interface Props {
  title: string;
  href?: string;
  description: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: IconName;
    type: string;
    href: string;
  }[];
  repo?: string;
  className?: string;
}

export default function ProjectCard({
  title,
  href,
  description,
  tags,
  link,
  image,
  video,
  links,
  repo,
  className,
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full"
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
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <div className="hidden text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty text-xs text-muted-foreground dark:prose-invert">
            {description}
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-3 py-1">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
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
      </CardContent>
      <CardFooter className="p-3 border-none">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Button size="xs">
                  <DynamicIcon name={link.icon} />
                  {link.type}
                </Button>
              </Link>
            ))}
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
        )}
      </CardFooter>
    </Card>
  );
}
