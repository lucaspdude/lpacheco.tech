import { FunctionComponent } from "react";



export interface CommandProps{
    name: string
    callback?: (commandName: string) => void

}
const ErrorCommand: FunctionComponent<CommandProps> = ({
    name,
    callback
}) => {

    const handleCallback = (commandName: string) => {
        if(callback)callback(commandName)
    }
    return (
        <div>

            <span className=''> The  <b> <span className="text-red-500 text-bold text-2xl">{name} </span> </b> command is not reconized. </span>
                <br />
                <span> 
                    You can type (or click) <span className='cursor-pointer dark:text-broom-500 text-regal-blue-500 text-bold' onClick={() => handleCallback('help')} >help </span> to view a list of available commands
                </span>
            
        </div>
    );
}

export default ErrorCommand;