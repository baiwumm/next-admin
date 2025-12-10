import { XIcon } from 'lucide-react';
import * as React from 'react';

import {
  Dialog as DialogPrimitive,
  DialogClose as DialogClosePrimitive,
  type DialogCloseProps as DialogClosePrimitiveProps,
  DialogContent as DialogContentPrimitive,
  type DialogContentProps as DialogContentPrimitiveProps,
  DialogDescription as DialogDescriptionPrimitive,
  type DialogDescriptionProps as DialogDescriptionPrimitiveProps,
  DialogFooter as DialogFooterPrimitive,
  type DialogFooterProps as DialogFooterPrimitiveProps,
  DialogHeader as DialogHeaderPrimitive,
  type DialogHeaderProps as DialogHeaderPrimitiveProps,
  DialogOverlay as DialogOverlayPrimitive,
  type DialogOverlayProps as DialogOverlayPrimitiveProps,
  DialogPortal as DialogPortalPrimitive,
  type DialogProps as DialogPrimitiveProps,
  DialogTitle as DialogTitlePrimitive,
  type DialogTitleProps as DialogTitlePrimitiveProps,
  DialogTrigger as DialogTriggerPrimitive,
  type DialogTriggerProps as DialogTriggerPrimitiveProps,
} from '@/components/animate-ui/primitives/radix/dialog';
import { cn } from '@/lib/utils';

type DialogProps = DialogPrimitiveProps;

function Dialog(props: DialogProps) {
  return <DialogPrimitive {...props} />;
}

type DialogTriggerProps = DialogTriggerPrimitiveProps;

function DialogTrigger(props: DialogTriggerProps) {
  return <DialogTriggerPrimitive {...props} />;
}

type DialogCloseProps = DialogClosePrimitiveProps;

function DialogClose(props: DialogCloseProps) {
  return <DialogClosePrimitive {...props} />;
}

type DialogOverlayProps = DialogOverlayPrimitiveProps;

function DialogOverlay({ className, ...props }: DialogOverlayProps) {
  return (
    <DialogOverlayPrimitive
      className={cn('fixed inset-0 z-50 bg-black/50', className)}
      {...props}
    />
  );
}

type DialogContentProps = DialogContentPrimitiveProps & {
  showCloseButton?: boolean;
};

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortalPrimitive>
      <DialogOverlay />
      <DialogContentPrimitive
        className={cn(
          'bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogClosePrimitive className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogClosePrimitive>
        )}
      </DialogContentPrimitive>
    </DialogPortalPrimitive>
  );
}

type DialogHeaderProps = DialogHeaderPrimitiveProps;

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <DialogHeaderPrimitive
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

type DialogFooterProps = DialogFooterPrimitiveProps;

function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <DialogFooterPrimitive
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  );
}

type DialogTitleProps = DialogTitlePrimitiveProps;

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogTitlePrimitive
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

type DialogDescriptionProps = DialogDescriptionPrimitiveProps;

function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <DialogDescriptionPrimitive
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  type DialogCloseProps,
  DialogContent,
  type DialogContentProps,
  DialogDescription,
  type DialogDescriptionProps,
  DialogFooter,
  type DialogFooterProps,
  DialogHeader,
  type DialogHeaderProps,
  type DialogProps,
  DialogTitle,
  type DialogTitleProps,
  DialogTrigger,
  type DialogTriggerProps,
};
