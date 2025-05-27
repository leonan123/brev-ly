import { WarningIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type FormItemProps = ComponentProps<'div'>

export function FormItem({ className, ...props }: FormItemProps) {
  return (
    <div
      className={twMerge('group space-y-2 text-gray-500', className)}
      {...props}
    />
  )
}

type FormLabelProps = ComponentProps<'label'>

export function FormLabel({ className, ...props }: FormLabelProps) {
  return (
    <label
      className={twMerge(
        'text-xxs group-focus-within:text-blue-base group-data-[invalid=true]:text-danger transition-all group-focus-within:font-bold',
        className,
      )}
      {...props}
    />
  )
}

type FormControlProps = ComponentProps<'div'>

export function FormControl({ className, ...props }: FormControlProps) {
  return (
    <div
      className={twMerge(
        'group-focus-within:border-blue-base group-data-[invalid=true]:border-danger flex h-12 w-full items-center rounded-lg border-[1.5px] border-gray-300 px-4 text-sm transition-colors',
        className,
      )}
      {...props}
    />
  )
}

type FormMessageProps = ComponentProps<'p'>

export function FormMessage({ className, ...props }: FormMessageProps) {
  return (
    <div className="flex items-center gap-2">
      <WarningIcon size={16} className="text-danger" />

      <p
        className={twMerge('text-xs text-gray-500 transition-all', className)}
        {...props}
      />
    </div>
  )
}
