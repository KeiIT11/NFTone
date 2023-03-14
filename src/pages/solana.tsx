import { useEffect, useState } from 'react'
// import { Connection, PublicKey, Wallet } from '@solana/web3.js'
// import { Metadata, METADATA_SCHEMA } from '@metaplex/js'
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
} from '@metaplex-foundation/js'
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js'
import { Layout } from '@/components/Layout'
import { Button, Center } from '@mantine/core'

const IMAGE_URL =
  'https://ehhqwyiaosvwpuorougy.supabase.co/storage/v1/object/public/image/0.0031757945269734744.png'

export default function Solana() {
  // const [wallet, setWallet] = useState(null)
  // const [connection, setConnection] = useState<Connection | null>(null)

  // useEffect(() => {
  //   const init = async () => {
  //     const connection = new Connection('https://api.mainnet-beta.solana.com')
  //     setConnection(connection)
  //     const wallet = new Wallet('PRIVATE_KEY_HERE', connection)
  //     setWallet(wallet)
  //   }
  //   init()
  // }, [])

  const Cluster = {
    devnet: 'https://api.devnet.solana.com',
    testnet: 'https://api.testnet.solana.com',
    mainnet: 'https://api.mainnet-beta.solana.com',
  }

  // solanaとmetaplexの接続
  // const connection = new Connection(clusterApiUrl('mainnet-beta'))
  const connection = new Connection(Cluster.devnet, 'confirmed')
  const wallet = Keypair.generate()
  // const metaplex = new Metaplex(connection)
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(wallet))
    .use(bundlrStorage({ address: 'https://devnet.bundlr.network' }))
  // .use(bundlrStorage())

  console.log('connection: ', connection)
  console.log('metaplex: ', metaplex)
  console.log('wallet: ', wallet)

  const createNFT = async () => {
    console.log('createNFT')
    // 新しいNFTを作成する
    // https://github.com/metaplex-foundation/js#create
    // ミントアカウント、関連するトークンアカウントが必要？
    try {
      const { nft } = await metaplex.nfts().create({
        uri: IMAGE_URL,
        name: 'My NFT',
        sellerFeeBasisPoints: 500, // Represents 5.00%.
      })
      console.log('nft: ', nft)
    } catch (e) {
      console.error(e)
    }

    // NFTの説明であるJSONをメタデータをアップロードする？
    // const { uri } = await metaplex.nfts().uploadMetadata({
    //   name: 'My NFT',
    //   description: 'My description',
    //   image: IMAGE_URL,
    // })
    // console.log('uri: ', uri)
  }

  return (
    <Layout>
      <Center>
        <Button
          onClick={createNFT}
          color='dark'
          className='duration-1000 hover:(transform scale-200 rotate-360 text-red-600)'
        >
          Create NFT
        </Button>
      </Center>
    </Layout>
  )
}
