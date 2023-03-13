import { Layout } from '@/components/Layout'
import { NextPage } from 'next'

import Arweave from 'arweave'
import { ChangeEvent, useCallback, useState } from 'react'
import { Loader } from '@mantine/core'

const Test: NextPage = () => {
  const [transactionId, setTransactionId] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [imageName, setImageName] = useState('')

  // arweaveの設定
  const arweave = Arweave.init({})

  arweave.wallets.generate().then(key => {
    console.log(key)
  })

  const createTransaction = async () => {
    let key = await arweave.wallets.generate()

    // Plain text
    let transactionA = await arweave.createTransaction(
      {
        data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>',
      },
      key,
    )

    // Buffer
    let transactionB = await arweave.createTransaction(
      {
        data: Buffer.from('Some data', 'utf8'),
      },
      key,
    )

    console.log(transactionA)
  }
  createTransaction()

  const createTransaction2 = useCallback(
    async (file: File) => {
      try {
        const transaction = await arweave.createTransaction({
          // data: file, // fileだと型エラーで受け取れない
          data: 'file', // 文字列だと渡せる
        })
        // sign in
        await arweave.transactions.sign(transaction)
        // upload
        const uploader = await arweave.transactions.getUploader(transaction)

        while (!uploader.isComplete) {
          await uploader.uploadChunk()
          console.log(
            `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`,
          )
        }
        setTransactionId(transaction.id)
      } catch (err) {
        console.log('error: ', err)
      }
    },
    [arweave],
  )

  const uploadPostImg = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Plese select the image file.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}${file.name}.${fileExt}`
      console.log(file)
      setIsLoading(true)

      createTransaction2(file)

      setImageName(fileName)
      setIsLoading(false)
    },
    [createTransaction2],
  )

  // createTransaction2()
  return (
    <Layout>
      <label htmlFor='post'>
        <div className='border-2 border-black inline-block'>ファイルを選択</div>
        <input
          type='file'
          id='post'
          accept='image/*'
          className='hidden'
          onChange={uploadPostImg}
        />
      </label>
      {isLoading && <Loader />}
      {imageName}
    </Layout>
  )
}

export default Test
