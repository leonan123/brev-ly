import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: [
    'flex items-center justify-center gap-1.5 h-12 w-full font-semibold text-sm cursor-pointer text-white transition-colors',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:outline-transparent',
  ],

  variants: {
    variant: {
      primary: 'bg-blue-base hover:bg-blue-dark rounded-lg',
      secondary: [
        'bg-gray-200 text-gray-500 px-2 font-semibold text-xs w-auto rounded-sm outline-1 h-8 outline-gray-200',
        'hover:outline-blue-dark disabled:bg-gray-100/50',
      ],
      icon: 'size-8 outline-1 outline-gray-200 hover:outline-blue-dark rounded-sm text-gray-500 bg-gray-200',
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
