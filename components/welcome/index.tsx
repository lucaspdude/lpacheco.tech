/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'

import logo from '../../assets/logo.svg'

export interface CommandProps {
  callback?: (commandName: string) => void
}
const WelcomeCommand: FunctionComponent<CommandProps> = ({ callback }) => {
  const handleCallback = (commandName: string) => {
    if (callback) callback(commandName)
  }
  return (
    <div>
      <div className="flex items-start mb-6">

          <div className="grid grid-cols-6">

                <div className="col-span-6 md:col-span-1 flex items-center justify-center">
                    <Link href="/">
                        <a>
                        <Image src={logo} width={106} height={216} alt="lpachec.tech logo" />
                        </a>
                    </Link>
                </div>

                <div className="col-span-6 md:col-span-5">
                <h2 className="text-5xl text-bold mb-3 text-regal-blue-500  dark:text-broom-500">
            Welcome to lpacheco.tech
          </h2>
          <p className="text-2xl">
            This website was made to test an idea and with the purpose to be
            used as a portfolio for my personal projects and stuff I'm
            passionate about
          </p>
                </div>

          </div>
    
      </div>

      <span>You can start by typing a command on the prompt bellow.</span>
      <br />
      <span>
        To view a list of helpfull commands, type{' '}
        <span className="font-italic">(or click)</span>{' '}
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
