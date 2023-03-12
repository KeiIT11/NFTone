import { Button, Group, Radio, Stack, TextInput } from '@mantine/core'
import { z } from 'zod'
import { FC, useCallback } from 'react'
import { useForm, zodResolver } from '@mantine/form'

const questionSchema = z.number().min(1, { message: '選択は必須です' })

const schema = z.object({
  questions: z.tuple([questionSchema, questionSchema, questionSchema]),
})

type FormData = z.infer<typeof schema>

export const Form: FC = () => {
  const form = useForm<FormData>({
    initialValues: {
      questions: [0, 0, 0],
    },
    validate: zodResolver(schema),
  })

  const onSubmit = useCallback((e: FormData) => {
    console.log(e)
  }, [])

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack spacing='xl'>
        {form.values.questions.map((v, index) => (
          <Radio.Group
            key={index}
            label={`質問 ${index + 1}　あなたはネチネチしていますか？`}
            withAsterisk
            {...form.getInputProps(`questions.${index}`)}
            onChange={e => form.setFieldValue(`questions.${index}`, Number(e))}
          >
            <Group mt='xs'>
              <Radio value={5} label='そう思う' />
              <Radio value={4} label='どちらかと言えばそう思う' />
              <Radio value={3} label='どちらでもない' />
              <Radio value={2} label='どちらかと言えばそう思わない' />
              <Radio value={1} label='そう思わない' />
            </Group>
          </Radio.Group>
        ))}
      </Stack>
      <Button type='submit'>送信</Button>
    </form>
  )
}
