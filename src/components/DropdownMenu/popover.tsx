import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { omit } from 'es-toolkit'
import { useEffect, useRef, useState } from "react";

export default function PopoverWrap({ content, ...props }) {
  const [sref, setSref] = useState()
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setSref(ref.current)
    }
  }, [ref.current])

  return (
    <div ref={ref}>
      {sref && <Popover {...omit(props, ['children'])} portalContainer={document.querySelector(".vaul-backdrop") && sref ? sref.closest('[data-vaul-drawer]') : document.querySelector('body')}>
        <PopoverTrigger>{props.children}</PopoverTrigger>
        <PopoverContent className={"w-max p-0" + (props.className ?? '')}>{content}</PopoverContent>
      </Popover>}
    </div>
  );
}