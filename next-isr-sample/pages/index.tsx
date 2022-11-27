import { InferGetStaticPropsType, NextPage, GetStaticProps } from 'next'
import Link from 'next/link'

export const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ buildTime }) => {
  return (
    <>
      <main style={{padding: '16px'}}>
        <div>
          <Link href="/isr-page">ISRで生成されたページへのリンク (prefetch有効)</Link>
        </div>
        <div style={{ marginTop: '32px'}}>
          <Link href="/isr-page2" prefetch={false}>ISRで生成されたページへのリンク (prefetch無効)</Link>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  console.warn('ISR Running')

  return {
    props: {
      buildTime: new Date().toLocaleString()
    }
  }
}

export default Home
