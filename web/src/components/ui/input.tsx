import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'>

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      type="url"
      className={twMerge(
        'size-full outline-none placeholder:text-gray-400',
        className,
      )}
      {...props}
    />
  )
}
