import { FunctionComponent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";

import HelpCommand from "../help";
import WelcomeCommand from "../welcome";
import ErrorCommand from "../error";
import ArticlesCommand from "../articles";
import SkillsCommand from "../skills";
import ContactCommand from "../contact";

interface TerminalProps{
    handleActiveTerminal: (index: number) => void,
    isActive: boolean
    index: number
}

interface Command {
    key: string
    content: string | ReactNode
    isClearCommand?: boolean
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
            key: "help",
            content:  <HelpCommand callback={(commandName:string) =>handleFillForm(commandName)} />,
        },
        {
            key: "articles",
            content:  <ArticlesCommand  />,
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


    const inputRef = useRef<HTMLInputElement>(null);
    const scrollBottomRef = useRef<HTMLDivElement>(null);

    const handleExecuteCommand = (commandString: string) => {

        const currentStack = stack;
        console.log(currentStack.length);


        const filteredCommand = commands.filter((command)=> {
            return command.key === commandString
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

        }else{
            
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

      useEffect(() => {
        console.log(stack)
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



    return(
        <div className={`border-2 overflow-y-scroll h-full ${isActive ? ' ring-2 ring-red-500' : 'border-zinc-600'} `} onClick={handleFocus}>
            <div className="px-6 py-6 ">

            {stack && stack.length > 0 && stack.map((item, i) => (
                <div key={i} className="border-b-2 border-white/25 pb-3 mt-3" 
                >
                    <span className="flex justify-end">
                        {item.timeStamp.toLocaleTimeString()}
                    </span>
                    <div className="">
                        {item.content}
                    </div>
                </div>
            ))}

            <div className="flex items-center">
                <div>
                    <span className="text-red-500 font-bold">visitor</span>
                    <span>$: </span>
                </div>
                <input ref={inputRef} type="text" className={`w-full my-3 px-3 bg-transparent focus:ring-0 focus:ring-offset-0 focus:border-0 outline-0 caret-regal-blue-500 dark:caret-broom-500 ${commandExists ? 'text-green-500 text-bold' : 'text-red-500' }  `} onKeyDown={(e) => handleCommand(e)} onChange={handleCheckCommandExists}  />
                <div ref={scrollBottomRef} />
                
            </div>
            

            </div>

        </div>
    )
}

export default Terminal;