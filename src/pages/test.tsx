import { Avatar, Button, Center, Loader } from '@mantine/core'
import { ChangeEvent, useCallback, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { NextPage } from 'next'
import { Layout } from '@/components/Layout'

const Test: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [imageName, setImageName] = useState('')

  const uploadPostImg = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Plese select the image file.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      setIsLoading(true)
      const { error } = await supabase.storage
        .from('image')
        .upload(fileName, file)

      if (error) {
        throw new Error(error.message)
      }
      setImageName(fileName)
      setIsLoading(false)
    },
    [],
  )

  return (
    <Layout>
      <Center className='flex-col'>
        {isLoading && <Loader />}
        <Avatar
          size='lg'
          radius='sm'
          className='transform duration-300'
          // src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/image/${imageName}`}
          src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/image/0.6867921553645171.png`}
        />
        {imageName && (
          <Avatar
            size='lg'
            radius='sm'
            className='transform duration-300'
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/image/${imageName}`}
          />
        )}
        <label>
          <div className='cursor-pointer border border-black'>
            ファイルを選択
          </div>
          <input
            type='file'
            id='post'
            accept='image/*'
            className='hidden'
            onChange={uploadPostImg}
          />
        </label>
      </Center>
    </Layout>
  )
}

export default Test
