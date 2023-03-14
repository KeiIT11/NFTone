import { FC, ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title?: string
}

export const Layout: FC<Props> = ({
  title = 'nft-personality-test',
  children,
}) => {
  return (
    <div className='min-h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>{title}</title>
        <meta name='description' content='nft-personality-test' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='bg-black shadow-md shadow-black w-full'>
        <nav className='text-center'>
          <h1 className='cursor-pointer text-4xl font-bold py-20 bg-gradient-to-r bg-clip-text font-bold from-red-600 via-violet-400 to-blue-600 text-transparent'>
            NFT Personality Test
          </h1>
        </nav>
      </header>

      <main>
        <div className='mx-auto max-w-750px my-20 px-4'>{children}</div>
      </main>
    </div>
  )
}
