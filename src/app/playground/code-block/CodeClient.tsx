'use client';
import { type FC } from 'react';

import {
  Code,
  CodeBlock,
  CodeHeader,
} from '@/components/ui';
import { ReactIcon } from '@/lib/icons';

type CodeBlockPageProps = {
  code: string;
  fileName: string;
  lang: string;
}

const CodeClient: FC<CodeBlockPageProps> = ({ code, fileName, lang }) => {
  return (
    <Code className="w-full h-100" code={code}>
      <CodeHeader icon={ReactIcon} copyButton>
        {fileName}
      </CodeHeader>
      <CodeBlock cursor lang={lang} writing duration={1000} />
    </Code>
  )
}
export default CodeClient;