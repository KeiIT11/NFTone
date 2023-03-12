import { Button, Group, Radio, Stack, TextInput } from '@mantine/core'
import { z } from 'zod'
import { FC } from 'react'
import { useForm, zodResolver } from '@mantine/form'
import { questions } from '@/constants/question'

const answerSchema = z.number().min(1, { message: '選択は必須です' })

const schema = z.object({
  answers: z.tuple([
    answerSchema,
    answerSchema,
    answerSchema,
    answerSchema,
    answerSchema,
    answerSchema,
    answerSchema,
    answerSchema,
    answerSchema,
    answerSchema,
  ]),
})

export type Answers = z.infer<typeof schema>

type Props = { onSubmit: (paramas: Answers) => void }

export const Form: FC<Props> = ({ onSubmit }) => {
  const form = useForm<Answers>({
    initialValues: {
      answers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    validate: zodResolver(schema),
  })

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack className='gap-10'>
        {form.values.answers.map((v, index) => (
          <Radio.Group
            key={index}
            {...form.getInputProps(`answers.${index}`)}
            label={`質問 ${index + 1}　${questions[index]}`}
            size='md'
            withAsterisk
            onChange={e => form.setFieldValue(`answers.${index}`, Number(e))}
            classNames={{
              label: 'text-lg',
              error: 'mt-2',
            }}
            className='border-b border-b-gray-300 pb-10'
          >
            <Group mt='xl'>
              {[
                { label: '非常にそう思う', value: 5 },
                { label: 'そう思う', value: 4 },
                { label: 'どちらでもない', value: 3 },
                { label: 'そう思わない', value: 2 },
                { label: '非常にそう思わない', value: 1 },
              ].map(v => (
                <Radio
                  key={v.value}
                  value={v.value}
                  label={v.label}
                  size='sm'
                  classNames={{
                    label: 'cursor-pointer',
                    radio: 'cursor-pointer',
                  }}
                />
              ))}
            </Group>
          </Radio.Group>
        ))}
        <div>
          <Button type='submit' className='mt-4'>
            送信
          </Button>
        </div>
      </Stack>
    </form>
  )
}
