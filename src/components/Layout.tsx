import { FC, ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title?: string
}

export const Layout: FC<Props> = ({ title = 'Color My NFT', children }) => {
  return (
    <div className='min-h-screen bg-black overflow-hidden'>
      <Head>
        <title>{title}</title>
        <meta name='description' content='NFTone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='bg-black shadow-lg shadow-gray-500 w-full text-center'>
        <h1 className='text-4xl font-bold py-20 bg-gradient-to-r bg-clip-text font-bold from-red-600 via-violet-400 to-blue-600 text-transparent sm:(text-6xl py-30)'>
          NFTone
        </h1>
      </header>

      <main>
        <div className='mx-auto max-w-750px my-20 px-4'>{children}</div>
      </main>
    </div>
  )
}
