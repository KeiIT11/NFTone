import Head from 'next/head'
import { Button } from '@mantine/core'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Layout } from '@/components/Layout'

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

type FormData = z.infer<typeof schema>

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  return (
    <Layout title='Topページ'>
      <div className='bg-light-100'>aa</div>
      <Button className='mt-4'>aa</Button>
    </Layout>
  )
}
