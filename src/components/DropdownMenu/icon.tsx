import { Tooltip } from "@heroui/tooltip"

export default function Icon({ fontPrefix = "ti", ...props }) {
  const sizes = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'md': 'text-md',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  }
  console.log('props', props)
  return (
    <div className={`${props.wrapperClassName ?? ''} ${props.center ? 'h-full flex items-center' : 'contents h-max'} relative ${props.text ? 'pb-4' : ''}`}>
      {props.hoverText ? <Tooltip {...props.toolTipProps} content={props.hoverText}>
        <i className={`${props.className} align-middle theicon ${fontPrefix} ${fontPrefix}-${props.children} ${sizes[props.size] ?? 'text-xl'}`}>{props.text ? <span className='pr-1 text-sm'>{props.text}</span> : ''}</i>
      </Tooltip> :
        <i className={`${props.className} align-middle ${fontPrefix} ${fontPrefix}-${props.children} ${sizes[props.size] ?? 'text-xl'}`}>{props.text ? <span className='pr-1 text-sm'>{props.text}</span> : ''}</i>}
      {props.text && props.textPlacement == "bottom" ? <span className='absolute bottom-[-5px] right-[50%] translate-x-[50%] text-sm'>{props.text}</span> : ''}
    </div>
  )
}