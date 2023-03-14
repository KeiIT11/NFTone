import { Button, Center, Group, Radio, Stack, TextInput } from '@mantine/core'
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
            label={`質問 ${index + 1}　${questions[index].question}`}
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
        <Center>
          <Button
            type='submit'
            className='mt-4 w-30 border-2 border-gray-500 duration-500 hover:(shadow-md shadow-gray-500 transform translate-y-[-5px])'
            color='dark'
            radius='xl'
            size='lg'
          >
            送信
          </Button>
        </Center>

        {/* NOTE: 色のテストのため。不要になれば消す */}
        <div>
          <Button
            type='submit'
            onClick={() => {
              form.setValues({ answers: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] })
            }}
          >
            非常にそう思わない
          </Button>
          <Button
            type='submit'
            onClick={() => {
              form.setValues({ answers: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5] })
            }}
          >
            非常にそう思う
          </Button>
          <Button
            type='submit'
            onClick={() => {
              const val1 = Math.round(Math.random() * (5 - 1) + 1)
              const val2 = Math.round(Math.random() * (5 - 1) + 1)
              const val3 = Math.round(Math.random() * (5 - 1) + 1)
              const val4 = Math.round(Math.random() * (5 - 1) + 1)
              const val5 = Math.round(Math.random() * (5 - 1) + 1)
              const val6 = Math.round(Math.random() * (5 - 1) + 1)
              const val7 = Math.round(Math.random() * (5 - 1) + 1)
              const val8 = Math.round(Math.random() * (5 - 1) + 1)
              const val9 = Math.round(Math.random() * (5 - 1) + 1)
              const val10 = Math.round(Math.random() * (5 - 1) + 1)
              form.setValues({
                answers: [
                  val1,
                  val2,
                  val3,
                  val4,
                  val5,
                  val6,
                  val7,
                  val8,
                  val9,
                  val10,
                ],
              })
            }}
          >
            ランダム
          </Button>
        </div>
      </Stack>
    </form>
  )
}
