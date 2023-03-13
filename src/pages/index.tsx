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
    <Layout title='NFT Personality Test 質問ページ'>
      <div className='bg-black p-10 rounded-2xl shadow-md shadow-black'>
        <div className='text-xl font-bold bg-gradient-to-r bg-clip-text font-bold from-red-600 to-violet-400 text-transparent'>
          「NFT Personality
          Test」はあなたの性格を診断し、それに基づいたカラーのNFTを作成するアプリです。
          下記の10個の質問に答えて、あなたの魅力的な一面を表現しましょう。
          <br />
          それでは、さっそく始めましょう！
        </div>
      </div>
      <div className='mt-20'>
        <Form onSubmit={onSubmit} />
      </div>
    </Layout>
  )
}
