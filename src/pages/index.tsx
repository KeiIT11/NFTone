import { Layout } from '@/components/Layout'
import { Answers, Form } from '@/components/form'
import { questions } from '@/constants/question'
import { changeColorToImage } from '@/utils/changeColorToImage'
import { RGB, generateGradientColor } from '@/utils/generateGradientColor'
import { useCallback, useState } from 'react'
import { createNFT } from '@/utils/solana'
import { Button } from '@mantine/core'

export default function Home() {
  const [rgb, setRgb] = useState<RGB>()
  const [imageBuffer, setImageBuffer] = useState<Buffer>()

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
    
    const buffer = changeColorToImage(res)
    if (!buffer) return
    // ここでbufferを送る処理を書く
    setImageBuffer(buffer)
    console.log('buffer: ', buffer)
    //const nftUri = createNFT(buffer)
    //console.log(nftUri)
  }, [])

  
  // onSubmitで、setImageBuffer(buffer)
  const onClickNFTButton = useCallback(async () => {
    if (!imageBuffer) return
    const nftUri = createNFT(imageBuffer)
    console.log(nftUri)
  }, [imageBuffer])

  return (
    <Layout title='NFT Personality Test 質問ページ'>
      <h2 className='bg-black p-10 rounded-2xl shadow-md shadow-black'>
        <div className='text-xl font-bold bg-gradient-to-r bg-clip-text font-bold from-red-600 to-violet-400 text-transparent'>
          「NFT Personality
          Test」はあなたの性格を診断し、それに基づいたカラーのNFTを作成するアプリです。
          下記の10個の質問に答えて、あなたの魅力的な一面を表現しましょう。
          <br />
          それでは、さっそく始めましょう！
        </div>
      </h2>

      <div className='mt-20'>
        <Form onSubmit={onSubmit} />
      </div>

      {rgb && (
        <>
          <p>これがあなたの色です</p>
          {JSON.stringify(rgb)}
          <div
            className='h-100 rounded-2xl'
            style={{ background: `${generateGradientColor(rgb)}` }}
          ></div>
        </>
      )}
      <Button onClick={onClickNFTButton}>
        createNFT
      </Button>
    </Layout>
  )
}
