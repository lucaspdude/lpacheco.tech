import type { NextPage } from 'next'
import { useState } from 'react'
import Terminal from '../components/terminal'
import ThemeSwitcher from '../components/themeSwithcer'

const Home: NextPage = () => {

  const [activeTerminal, setActiveTerminal] = useState<number>(0);

  const handleActiveTerminal = (index: number) => {
    setActiveTerminal(index)
  }

  return (
    <main className='h-full bg-boston-blue-100  dark:bg-regal-blue-600 font-space+mono text-regal-blue-600 dark:text-gray-100 scroll-smooth '>
        <Terminal  handleActiveTerminal={handleActiveTerminal} isActive={activeTerminal === 0} index={0}  />

      <div className='fixed bottom-0 mb-3 right-0 mx-3'>
        <ThemeSwitcher />

      </div>
    </main>
  )
}

export default Home
