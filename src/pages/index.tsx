import { Layout } from '@/components/Layout'
import { Form } from '@/components/form'
import { Center } from '@mantine/core'

export default function Home() {
  return (
    <Layout title='Topページ'>
      <Center>
        <Form />
      </Center>
    </Layout>
  )
}
