import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createLink } from '../http/create-link'
import { Button } from './ui/button'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

const createShortLinkSchema = z.object({
  originalUrl: z
    .string()
    .url('Informe uma URL válida')
    .min(1, 'Informe uma URL válida'),
  shortUrlSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'informe um valor válido, ex: meu-link-exemplo',
  }),
})

type CreateShortLinkFormData = z.infer<typeof createShortLinkSchema>

export function CreateShortLinkForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateShortLinkFormData>({
    resolver: zodResolver(createShortLinkSchema),
  })

  async function onSubmit(data: CreateShortLinkFormData) {
    await createLink(data)
    console.log(data)
  }

  console.log({ errors })
  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormItem data-invalid={!!errors.originalUrl}>
        <FormLabel htmlFor="original-url">LINK ORIGINAL</FormLabel>
        <FormControl>
          <Input
            id="original-url"
            type="url"
            placeholder="www.exemplo.com"
            aria-invalid={!!errors.originalUrl}
            aria-errormessage="original-url-error"
            {...register('originalUrl')}
          />
        </FormControl>

        {errors.originalUrl && (
          <FormMessage id="original-url-error">
            {errors.originalUrl.message}
          </FormMessage>
        )}
      </FormItem>

      <FormItem data-invalid={!!errors.shortUrlSlug}>
        <FormLabel htmlFor="short-url">LINK ENCURTADO</FormLabel>

        <FormControl>
          <span className="mr-px text-gray-400">brev.ly/</span>
          <Input
            id="short-url"
            aria-invalid={!!errors.shortUrlSlug}
            aria-errormessage="short-url-error"
            {...register('shortUrlSlug')}
          />
        </FormControl>

        {errors.shortUrlSlug && (
          <FormMessage id="short-url-error">
            {errors.shortUrlSlug.message}
          </FormMessage>
        )}
      </FormItem>

      <Button type="submit" disabled={isSubmitting}>
        Salvar link
      </Button>
    </form>
  )
}
