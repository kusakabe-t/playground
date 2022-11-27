import Head from 'next/head'
import { InferGetStaticPropsType, NextPage, GetStaticProps } from 'next'

export const IsrPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ buildTime }) => {
  return (
    <>
      <Head>
        <title>ISR Sample</title>
        <meta name="description" content="isr sample" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>ビルド時間: { buildTime }</p>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.warn('ISR Running')

  return {
    props: {
      buildTime: new Date().toLocaleString()
    },
    revalidate: 1
  }
}

export default IsrPage
