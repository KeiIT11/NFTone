import { Layout } from '@/components/Layout'
import { Answers, Form } from '@/components/form'
import { questions } from '@/constants/question'
import { RGB, generateGradientColor } from '@/utils/generateGradientColor'
import { Center } from '@mantine/core'
import { useCallback, useState } from 'react'

export default function Home() {
  const [rgb, setRgb] = useState<RGB>()

  const onSubmit = useCallback((e: Answers) => {
    let res: RGB = { R: 128, G: 128, B: 128 }

    for (let i = 0; i < e.answers.length; i++) {
      const answer = e.answers[i] - 3
      res['R'] += questions[i].weight['R'] * answer
      res['G'] += questions[i].weight['G'] * answer
      res['B'] += questions[i].weight['B'] * answer
    }

    setRgb(res)
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
      {rgb && (
        <>
          {JSON.stringify(rgb)}
          <div
            className='h-100 rounded-2xl'
            style={{ background: `${generateGradientColor(rgb)}` }}
          ></div>
          <div
            className='h-100 rounded-2xl'
            style={{ background: `rgb(${rgb.R},${rgb.G},${rgb.B})` }}
          ></div>
        </>
      )}
    </Layout>
  )
}
