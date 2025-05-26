import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center gap-1.5 h-12 w-full cursor-pointer rounded-lg text-white transition-colors disabled:cursor-not-allowed font-semibold text-sm disabled:opacity-50 disabled:hover:outline-transparent',

  variants: {
    variant: {
      primary: 'bg-blue-base hover:bg-blue-dark ',
      secondary:
        'bg-gray-200 text-gray-500 outline-2 h-8 outline-gray-200 hover:outline-blue-dark font-semibold text-xs disabled:bg-gray-100/50 max-w-[70px] rounded-sm',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        button({
          variant,
        }),
        className,
      )}
      {...props}
    />
  )
}
