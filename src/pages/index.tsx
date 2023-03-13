import { Layout } from '@/components/Layout'
import { Answers, Form } from '@/components/form'
import { questions } from '@/constants/question'
import { Center } from '@mantine/core'
import { useCallback, useState } from 'react'

type RGB = { R: number; G: number; B: number }

const generateGradientColor = (rgb: RGB) => {
  const r = rgb.R
  const g = rgb.G
  const b = rgb.B
  // const r = rgb.R % 155
  // const g = rgb.G % 155
  // const b = rgb.B % 155

  return `linear-gradient(to right, rgb(${r}, ${g}, ${b}), rgb(${r + 100}, ${
    g + 100
  },${b + 100}))`
}

export default function Home() {
  const [rgb, setRgb] = useState<RGB>()

  const onSubmit = useCallback((e: Answers) => {
    let res: RGB = { R: 128, G: 128, B: 128 }
    // let res: RGB = { R: 150, G: 150, B: 150 }

    for (let i = 0; i < e.answers.length; i++) {
      // const answer = e.answers[i]
      const answer = e.answers[i] - 3
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
