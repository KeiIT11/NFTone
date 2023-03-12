import { Layout } from '@/components/Layout'
import { Answers, Form } from '@/components/form'
import { questions } from '@/constants/question'
import { Center } from '@mantine/core'
import { useCallback } from 'react'

type QuestionResults = { question: string; value: number }[]

export default function Home() {
  const onSubmit = useCallback((e: Answers) => {
    // 質問と結果をマージ ex) [{question: "あなたは？", value: 5}, ...]
    const res: QuestionResults = e.answers.map((v, i) => ({
      question: questions[i],
      value: v,
    }))

    console.log(res)
  }, [])

  return (
    <Layout title='Topページ'>
      <Center>
        <Form onSubmit={onSubmit} />
      </Center>
    </Layout>
  )
}
