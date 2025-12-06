'use client';

import { Slot } from '@radix-ui/react-slot';

import { buttonVariants } from '@/components/animate-ui/components/buttons/button';
import {
  RippleButton,
  type RippleButtonProps as ButtonProps,
  RippleButtonRipples,
} from '@/components/animate-ui/components/buttons/ripple';

function Button({
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : RippleButton;

  return (
    <Comp {...props}>
      {children}
      {!asChild && <RippleButtonRipples />}
    </Comp>
  );
}

export { Button, type ButtonProps, buttonVariants };
export type { VariantProps } from 'class-variance-authority';