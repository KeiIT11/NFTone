import { Layout } from '@/components/Layout'
import { Answers, Form } from '@/components/form'
import { questions } from '@/constants/question'
import { Center } from '@mantine/core'
import { useCallback, useState } from 'react'

type RGB = { R: number; G: number; B: number }

export default function Home() {
  const [rgb, setRgb] = useState<RGB>()

  const onSubmit = useCallback((e: Answers) => {
    let res: RGB = { R: 0, G: 0, B: 0 }

    for (let i = 0; i < e.answers.length; i++) {
      const answer = e.answers[i]
      res['R'] += questions[i].weight['R'] * answer
      res['G'] += questions[i].weight['G'] * answer
      res['B'] += questions[i].weight['B'] * answer
    }

    setRgb(res)
    console.log(res)
  }, [])

  return (
    <Layout title='Topページ'>
      <Center>
        <Form onSubmit={onSubmit} />
      </Center>
      {JSON.stringify(rgb)}
    </Layout>
  )
}
