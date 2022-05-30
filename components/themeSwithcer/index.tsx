import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'

import { FiMoon, FiSun } from 'react-icons/fi'
import { useTheme } from 'next-themes'

const ThemeSwitcher = () => {
  const [enabled, setEnabled] = useState<boolean>(false)
  const { systemTheme, theme, setTheme } = useTheme()

  const handleChangeTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme

    if (currentTheme === 'dark') {
      setTheme('light')
      localStorage.setItem('@blockchain.theme', JSON.stringify('light'))
    } else {
      setTheme('dark')
      localStorage.setItem('@blockchain.theme', JSON.stringify('dark'))
    }
  }

  useEffect(() => {
    if (systemTheme && theme) {
      const localstorageTheme = localStorage.getItem('@blockchain.theme')

      const currentTheme = theme === 'system' ? systemTheme : theme

      if (currentTheme === 'dark') {
        setEnabled(true)
      } else if (
        currentTheme === 'light' &&
        localstorageTheme &&
        JSON.parse(localstorageTheme) === 'dark'
      ) {
        setEnabled(true)
      } else {
        setEnabled(false)
      }
    }
  }, [systemTheme, theme])

  return (
    <Switch
      checked={enabled}
      onChange={handleChangeTheme}
      className={`${!enabled ? 'bg-gray-200' : 'bg-zinc-700'}
         px-1 relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span className="my-auto">{enabled && <FiSun color="yellow" />}</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-4' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-gray-500 shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
      <span className="my-auto ml-auto">
        {!enabled && <FiMoon color="#000" />}
      </span>
    </Switch>
  )
}

export default ThemeSwitcher
