/**
 * This script will generate a new .json secret key to guideSecret.json and log your wallet addres and airdrop tx Id.
 *
 * First Update endpoint with your QuickNode HTTP Url from quicknode.com/endpoints.
 * Run ts-node wallet.ts
 * This script will perform 4 tasks:
 * 1. Connect to the Solana Network (Make sure you replace `endpoint` with your Quicknode Endpoint URL).
 * 2. Generate a new Wallet Keypair.
 * 3. Write the Secret Key to a .json file. Format the key as an array of numbers. Use `fs` to export the array to a `.json` file.
 * 4. Airdrop 1 SOL to the newly created wallet. (note: this will only work on dev and test nets)
 */

import { Keypair, LAMPORTS_PER_SOL, Connection } from '@solana/web3.js'
import * as fs from 'fs'
import {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  toBigNumber,
} from '@metaplex-foundation/js'
// import secret from './guideSecret.json'

//STEP 1 - Connect to Solana Network
const endpoint = 'https://example.solana-devnet.quiknode.pro/000000/' //Replace with your RPC Endpoint
const solanaConnection = new Connection(endpoint)

//STEP 2 - Generate a New Solana Wallet
const keypair = Keypair.generate()
console.log(
  `Generated new KeyPair. Wallet PublicKey: `,
  keypair.publicKey.toString(),
)

//STEP 3 - Write Wallet Secret Key to a .JSON
const secret_array = keypair.secretKey
  .toString() //convert secret key to string
  .split(',') //delimit string by commas and convert to an array of strings
  .map(value => Number(value)) //convert string values to numbers inside the array

const secret = JSON.stringify(secret_array) //Covert to JSON string

fs.writeFile('guideSecret.json', secret, 'utf8', function (err) {
  if (err) throw err
  console.log('Wrote secret key to guideSecret.json.')
})

//STEP 4 - Airdrop 1 SOL to new wallet
;(async () => {
  const airdropSignature = solanaConnection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL,
  )
  try {
    const txId = await airdropSignature
    console.log(`Airdrop Transaction Id: ${txId}`)
    console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`)
  } catch (err) {
    console.log(err)
  }
})()

const QUICKNODE_RPC =
  'https://prettiest-responsive-tab.solana-devnet.discover.quiknode.pro/e5f0d0986c45abd81f4ef1d318c96a7fdabcca8a/'
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC)
const WALLET = Keypair.fromSecretKey(new Uint8Array(secret))
const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
  .use(keypairIdentity(WALLET))
  .use(
    bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: QUICKNODE_RPC,
      timeout: 60000,
    }),
  )

const CONFIG = {
  uploadPath: 'uploads/',
  imgFileName: 'image.png',
  imgType: 'image/png',
  imgName: 'QuickNode Pixel',
  description: 'Pixel infrastructure for everyone!',
  attributes: [
    { trait_type: 'Speed', value: 'Quick' },
    { trait_type: 'Type', value: 'Pixelated' },
    { trait_type: 'Background', value: 'QuickNode Blue' },
  ],
  sellerFeeBasisPoints: 500, //500 bp = 5%
  symbol: 'QNPIX',
  creators: [{ address: WALLET.publicKey, share: 100 }],
}

async function uploadImage(
  filePath: string,
  fileName: string,
): Promise<string> {
  console.log(`Step 1 - Uploading Image`)
  const imgBuffer = fs.readFileSync(filePath + fileName)
  const imgMetaplexFile = toMetaplexFile(imgBuffer, fileName)
  const imgUri = await METAPLEX.storage().upload(imgMetaplexFile)
  console.log(`   Image URI:`, imgUri)
  return imgUri
}

async function uploadMetadata(
  imgUri: string,
  imgType: string,
  nftName: string,
  description: string,
  attributes: { trait_type: string; value: string }[],
) {
  console.log(`Step 2 - Uploading Metadata`)
  const { uri } = await METAPLEX.nfts().uploadMetadata({
    name: nftName,
    description: description,
    image: imgUri,
    attributes: attributes,
    properties: {
      files: [
        {
          type: imgType,
          uri: imgUri,
        },
      ],
    },
  })
  console.log('   Metadata URI:', uri)
  return uri
}

async function mintNft(
  metadataUri: string,
  name: string,
  sellerFee: number,
  symbol: string,
  creators: { address: PublicKey; share: number }[],
) {
  console.log(`Step 3 - Minting NFT`)
  const { nft } = await METAPLEX.nfts().create({
    uri: metadataUri,
    name: name,
    sellerFeeBasisPoints: sellerFee,
    symbol: symbol,
    creators: creators,
    isMutable: false,
    maxSupply: toBigNumber(1),
  })
  console.log(`   Success!🎉`)
  console.log(
    `   Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`,
  )
}

export async function solana() {
  console.log(
    `Minting ${
      CONFIG.imgName
    } to an NFT in Wallet ${WALLET.publicKey.toBase58()}`,
  )
  //Step 1 - Upload Image
  const imgUri = await uploadImage(CONFIG.uploadPath, CONFIG.imgFileName)
  //Step 2 - Upload Metadata
  //const metadataUri = await uploadMetadata("https://plus.unsplash.com/premium_photo-1672264150574-4761d2dc3e26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3ODcxNzk3Nw&ixlib=rb-4.0.3&q=80&w=1080",CONFIG.imgType,CONFIG.imgName, CONFIG.description, CONFIG.attributes);
  const metadataUri = await uploadMetadata(
    imgUri,
    CONFIG.imgType,
    CONFIG.imgName,
    CONFIG.description,
    CONFIG.attributes,
  )
  //Step 3 - Mint NFT
  mintNft(
    metadataUri,
    CONFIG.imgName,
    CONFIG.sellerFeeBasisPoints,
    CONFIG.symbol,
    CONFIG.creators,
  )
}

solana()
