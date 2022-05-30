import { FunctionComponent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";

import HelpCommand from "../help";
import WelcomeCommand from "../welcome";
import ErrorCommand from "../error";
import SkillsCommand from "../skills";
import ContactCommand from "../contact";
import { FiSend, FiTerminal } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

interface TerminalProps{
    handleActiveTerminal: (index: number) => void,
    isActive: boolean
    index: number
}

interface Command {
    key: string
    content: string | ReactNode
    isClearCommand?: boolean
    isLanguageCommand?: boolean
    isChangeThemeCommand?: boolean
}

interface StackItem{
    content: string | ReactNode,
    timeStamp: Date
}
const Terminal: FunctionComponent<TerminalProps> = ({
    handleActiveTerminal,
    isActive,
    index
}) => {

    const { t, i18n } = useTranslation('common')


        const [commandHistory, setCommandHistory] = useState<string[]>([]);
        const [commandHistoryIndex, setCommandHistoryIndex] = useState<number | null>(null);
        const [stack, setStack] = useState<StackItem[]>([])

        useEffect(() => {
            setStack([
                {
                    content: <WelcomeCommand callback={(commandName: string) => handleFillForm(commandName)} />,
                    timeStamp: new Date()
                }
            ])
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])





    const commands: Command[] = [

        {
            key: "welcome",
            content:  <WelcomeCommand callback={(commandName:string) =>handleFillForm(commandName)} />,
        },
        {
            key: "change-theme",
            content: "theme",
            isChangeThemeCommand: true
        },
        {
            key: "language-pt",
            content: "pt",
            isLanguageCommand: true
        },
        {
            key: "language-es",
            content: "es",
            isLanguageCommand: true
        },
        {
            key: "language-en",
            content: "en",
            isLanguageCommand: true
        },
        {
            key: "help",
            content:  <HelpCommand callback={(commandName:string) =>handleFillForm(commandName)} />,
        },
        {
            key: "skills",
            content:  <SkillsCommand  />,
        },
        {
            key: "contact",
            content:  <ContactCommand />,
        },
        {
            key: "clear",
            content: "help command content",
            isClearCommand: true
        }

    ]


    const [commandExists, setCommandExists] = useState<boolean>(false);

    const handleCheckCommandExists = () => {
        const input = inputRef.current.value;
        if(input.length === 0 || input === ""){
            setCommandExists(false)
        }

        const filtered = commands.filter((command) => {
            return command.key === input;
        })

        setCommandExists( filtered.length > 0 ? true : false)



    }


    const router = useRouter();

    const [currentLang, setCurrentLang] = useState<string>('pt')



    useEffect(() => {
        const localStorageHasLanguage = localStorage.getItem('@blockchain.lang')
    
        if (localStorageHasLanguage) {
          const parsedLanguage = JSON.parse(localStorageHasLanguage)
          handleSwithLanguage(parsedLanguage)
        }
      }, [])

    const handleSwithLanguage = (language: string) => {
        i18n.changeLanguage(language)
        setCurrentLang(language)
        localStorage.setItem('@blockchain.lang', JSON.stringify(language))
        router.push(router.route, router.route, { locale: language })
        handleFocus();
      }



      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

      

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollBottomRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const mountedComponents = useRef<HTMLDivElement>(null);

    const handleExecuteCommand = (commandString: string) => {

        const currentStack = stack;


        const filteredCommand = commands.filter((command)=> {
            return command.key === commandString.toLowerCase()
        })


        

        if(filteredCommand.length === 0){
            setStack([...stack, {
                content: <ErrorCommand name={commandString} callback={(commandName:string) =>handleExecuteCommand(commandName)} />,
                timeStamp: new Date() 
            }])
            setCommandHistory([...commandHistory, inputRef.current?.value]);
            setCommandHistoryIndex(null);
            inputRef.current.value = ""
            return;
        }

       
        if(filteredCommand.length > 0 && filteredCommand[0].isClearCommand){
            setStack([]);

        }else if(filteredCommand.length >0 && filteredCommand[0].isLanguageCommand){
            handleSwithLanguage(filteredCommand[0].content.toString());
        }
        else if(filteredCommand.length >0 && filteredCommand[0].isChangeThemeCommand){
            handleChangeTheme();
        }
        else{
            
            setStack([...currentStack, {
                content: filteredCommand[0].content,
                timeStamp: new Date(),
            }])
        }
               

        setCommandHistory([...commandHistory, inputRef.current?.value]);
        setCommandHistoryIndex(null);
        inputRef.current.value = ""

        


    }



    const scrollToBottom = () => {
        scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(( ) => {
        scrollToBottom();
      }, [stack])

    const handleCommand = (event: KeyboardEvent) => {
        if(event.key === "Enter" && inputRef.current.value !== ""){
            
            handleExecuteCommand(inputRef.current?.value)

        }


        if(event.key === "ArrowUp"){


            if(!commandHistoryIndex && commandHistoryIndex !== 0){

                setCommandHistoryIndex(commandHistory.length -1);
                inputRef.current.value = commandHistory[commandHistory.length -1] ?? ""
                
            }else{

                if(commandHistoryIndex > 0 ){
                    setCommandHistoryIndex(commandHistoryIndex - 1);
                    inputRef.current.value = commandHistory[commandHistoryIndex - 1] ?? ""
                }else{
                    setCommandHistoryIndex(0)
                    inputRef.current.value = commandHistory[0] ?? ""
                }
            }
        }

        if(event.key === "ArrowDown"){


            if(commandHistory.length === 0){
                return;
            }

            if(commandHistoryIndex === commandHistory.length -1){
                return;
            }

            if(commandHistoryIndex){
                setCommandHistoryIndex(commandHistoryIndex + 1);
                inputRef.current.value = commandHistory[commandHistoryIndex + 1] ?? ""
            }


                    



        }
    }

    const handleFillForm = (commandName: string) => {
        inputRef.current.value = commandName;

    }

    const handleFocus = () => {
        handleActiveTerminal(index);
        inputRef.current?.focus()

    }

    const handleMountedComponentClicks = (event) => {
        
        event.preventDefault()
    }

    const handlePressSendButton = () => {
        console.log('clicked')
        console.log(inputRef.current.value)

        if(inputRef.current.value !== ""){
            
            handleExecuteCommand(inputRef.current?.value)

        }
    }


    const emojiLang = {
        pt: '🇧🇷',
        en: '🇺🇸',
        es: '🇪🇸',
      }

    return(
        <div className={`border-2 overflow-y-scroll h-full ${isActive ? ' ring-2 ring-red-500' : 'border-zinc-600'} `} >
            <div className="px-6 py-6 h-full " ref={containerRef} onClick={handleFocus}>

                {stack && stack.length > 0 && stack.map((item, i) => (
                    <div key={i} className="border-b-2 border-white/25 pb-3 mt-3" 
                    ref={mountedComponents}
                    onClick={handleMountedComponentClicks}
                    >
                        <span className="flex justify-end">
                            {item.timeStamp.toLocaleTimeString()}
                        </span>
                        <div className="">
                            {item.content}
                        </div>
                    </div>
                ))}

                <div className="md:flex md:items-center pb-12 mb-12">
                    <div className="flex items-center">
                        <span className="px-3">{emojiLang[currentLang]}</span>
                        <span className="text-red-500 font-bold">{t('misc.visitor')}</span>
                        <span>$: </span>
                    </div>
                    <div className="flex items-center w-full">
                    <input ref={inputRef} type="text" className={`
                     border-b-2 border-white
                     md:border-0
                    
                    w-full my-3 px-3 bg-transparent md:focus:ring-0 md:focus:ring-offset-0 md:focus:border-0 outline-0 caret-regal-blue-500 dark:caret-broom-500 ${commandExists ? 'text-green-800 dark:text-green-500  text-bold' : 'text-red-500' }  `} onKeyDown={(e) => handleCommand(e)} onChange={handleCheckCommandExists}  />
                    <div className="md:hidden">
                        <button onClick={handlePressSendButton}>
                            <FiSend size={24} />
                        </button>
                    </div>
                    </div>
                    
                    
                </div>
                <div className="pb-12"></div>
                <div className="pb-12" ref={scrollBottomRef} />


                <div className='fixed bottom-0 my-3 left-3 mx-3'>
        
                    <button className=" bg-broom-500 rounded-md px-3 py-3" onClick={handleFocus}>
                        <FiTerminal size={36} color="blue" />
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Terminal;