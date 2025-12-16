import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import Link from "next/link";

import {
  Button,
  buttonVariants,
  Dock,
  DockIcon,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui";
import { cn } from "@/lib/utils";
import pkg from "#/package.json"

type Social = {
  name: string;
  url: string;
  icon: IconName;
};

export default function DockCard() {
  const socials: Social[] = [
    {
      name: "博客",
      url: 'https://baiwumm.com',
      icon: 'house'
    },
    {
      name: "GitHub",
      url: `https://github.com/${pkg.author.name}`,
      icon: 'github'
    }
  ]
  return (
    <div className="fixed bottom-6 sm:bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4 z-30">
      <Dock direction="middle" className="h-12 rounded-full">
        {socials.map(({ name, url, icon }) => (
          <DockIcon key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={url} target="_blank">
                  <Button variant="primary" appearance="ghost" mode="icon" radius="full">
                    <DynamicIcon name={icon} className="size-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
