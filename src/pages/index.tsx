import { Layout } from '@/components/Layout'
import { Answers, Form } from '@/components/form'
import { questions } from '@/constants/question'
import { changeColorToImage } from '@/utils/changeColorToImage'
import { RGB, generateGradientColor } from '@/utils/generateGradientColor'
import { useCallback, useRef, useState } from 'react'

export default function Home() {
  const [rgb, setRgb] = useState<RGB>()
  const ref = useRef<HTMLDivElement>(null)

  const onScrollToBottom = useCallback(() => {
    ref!.current!.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const onSubmit = useCallback(
    (e: Answers) => {
      let res: RGB = { R: 128, G: 128, B: 128 }

      for (let i = 0; i < e.answers.length; i++) {
        const answer = e.answers[i] - 3
        res['R'] += questions[i].weight['R'] * answer
        res['G'] += questions[i].weight['G'] * answer
        res['B'] += questions[i].weight['B'] * answer
      }

      onScrollToBottom()
      setRgb(res)
      console.log(res)

      const buffer = changeColorToImage(res)
      if (!buffer) return
      // ここでbufferを送る処理を書く
      console.log('buffer: ', buffer)
    },
    [onScrollToBottom],
  )

  return (
    <Layout title='NFTone 質問ページ'>
      <h2 className='p-10 text-white shadow-lg shadow-gray-500 rounded-2xl shadow-md shadow-black text-xl font-bold  bg-gradient-to-r font-bold from-red-600 to-violet-400'>
        「NFTone」はあなたの性格を診断し、それに基づいたカラーのNFTを作成するアプリです。
        下記の10個の質問に答えて、あなたの魅力的な一面を表現しましょう。
        <br />
        それでは、さっそく始めましょう！
      </h2>

      <div className='mt-20'>
        <Form onSubmit={onSubmit} />
      </div>

      {rgb && (
        <div className='mt-10'>
          <p className='text-center text-xl'>
            これがあなたの色です！
            <br />
            {JSON.stringify(rgb)}
          </p>
          <div
            className='h-100 rounded-2xl mt-4'
            style={{ background: `${generateGradientColor(rgb)}` }}
          ></div>
        </div>
      )}

      <div ref={ref} aria-hidden={true} />
    </Layout>
  )
}
