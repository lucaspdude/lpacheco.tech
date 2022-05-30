import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";



export interface CommandProps{
    name: string
    callback?: (commandName: string) => void

}
const ErrorCommand: FunctionComponent<CommandProps> = ({
    name,
    callback
}) => {

    const {t} = useTranslation();
    const handleCallback = (commandName: string) => {
        if(callback)callback(commandName)
    }
    return (
        <div>

            <span className=''> {t('error.ln1')}  <b> <span className="text-red-500 text-bold text-2xl">{name} </span> </b> {t('error.ln2')} </span>
                <br />
                <span> 
                    {t('error.ln3')} <span className='cursor-pointer dark:text-broom-500 text-regal-blue-500 text-bold' onClick={() => handleCallback('help')} >help </span> {t('error.ln4')}
                </span>
            
        </div>
    );
}

export default ErrorCommand;