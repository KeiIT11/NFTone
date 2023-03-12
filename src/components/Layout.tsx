import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
  children: ReactNode
  title?: string
}

const menus = [
  { path: '/', label: 'ホーム' },
  { path: '/about', label: '私たちについて' },
]

export const Layout: FC<Props> = ({
  title = 'nft-personality-test',
  children,
}) => {
  const router = useRouter()

  return (
    <div className='min-h-screen bg-gray-100 overflow-hidden'>
      <Head>
        <title>{title}</title>
        <meta name='description' content='nft-personality-test' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='bg-blue-500 shadow-lg w-full py-2'>
        <nav className='flex mx-5 items-center justify-between'>
          <h1 className='cursor-pointer flex mt-0 mb-1 px-2 transform text-2xl items-center'>
            <Image src='/favicon.ico' height={50} width={50} alt='' />
            <span className='font-bold ml-3'>nft-personality-test</span>
          </h1>
          <div className='hidden md:(flex gap-3) '>
            {menus.map(menu => (
              <Link href={menu.path} key={menu.path}>
                <div className={`font-bold text-white text-sm group`}>
                  {menu.label}
                  <div
                    className={`
                    ${
                      router.pathname === menu.path ? 'w-full' : 'w-0'
                    } bg-white h-1px mt-1 duration-150 group-hover:w-full`}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <div className='mx-auto max-w-800px py-10 px-4'>{children}</div>
      </main>
    </div>
  )
}
