import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import Terminal from '../components/terminal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


export const getStaticProps: GetStaticProps = async (props) => {
  return {
    props: {
      ...(await serverSideTranslations(props.locale || 'pt-BR', [
        'common',
      ])),
    },
  }
}

const Home: NextPage = () => {

  const [activeTerminal, setActiveTerminal] = useState<number>(0);

  const handleActiveTerminal = (index: number) => {
    setActiveTerminal(index)
  }

  return (
    <main className='h-full bg-boston-blue-100  dark:bg-regal-blue-600 font-space+mono text-regal-blue-600 dark:text-gray-100 scroll-smooth break-words '>

        <Terminal  handleActiveTerminal={handleActiveTerminal} isActive={activeTerminal === 0} index={0}  />

      
    </main>
  )
}

export default Home
