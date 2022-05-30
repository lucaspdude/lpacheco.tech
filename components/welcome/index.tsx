/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import logo from '../../assets/logo.svg'

export interface CommandProps {
  callback?: (commandName: string) => void
}
const WelcomeCommand: FunctionComponent<CommandProps> = ({ callback }) => {

  const { t } = useTranslation('common')


  const handleCallback = (commandName: string) => {
    if (callback) callback(commandName)
  }
  return (
    <div>
      <div className="flex items-start mb-6">

          <div className="grid grid-cols-6 z-10">

                <div className="col-span-6 md:col-span-1 flex items-center justify-center">
                    <Link href="/">
                        <a className='z-10'>
                        <Image src={logo} width={106} height={216} className="z-10" alt="lpachec.tech logo" />
                        </a>
                    </Link>
                </div>

                <div className="col-span-6 md:col-span-5">
                <h2 className="text-5xl text-bold mb-3 text-regal-blue-500  dark:text-broom-500">
            {t('welcome.welcome_ln1')}
          </h2>
          <p className="text-2xl">
          {t('welcome.welcome_ln2')}
          </p>
                </div>

          </div>
    
      </div>

<hr />
      <p className='mt-3'>{t('welcome.welcome_ln3')}</p>
      <br />
      <span>
      {t('welcome.welcome_ln4')}{' '}
        <span className="font-italic">{t('welcome.welcome_ln5')}</span>{' '}
        <span
          className="text-red-500 dark:text-broom-500 text-bold cursor-pointer"
          onClick={() => handleCallback('help')}
        >
          help
        </span>
      </span>
    </div>
  )
}

export default WelcomeCommand
