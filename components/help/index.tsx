import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";



export interface CommandProps{
    callback: (commandName: string) => void
}
interface HelpItemProps{
    callback: () => void
    name: string
    text: string
}
const HelpItem: FunctionComponent<HelpItemProps> = ({
    callback,
    name,
    text
}) => {

    return (
        <div className='grid grid-cols-4 my-2 py-3 px-3 hover:bg-white/25 transition-all ease-in-out duration-200' onClick={callback}>
                <span className='col-span-4 md:col-span-1 dark:text-broom-500 text-regal-blue-500 cursor-pointer'>
                    <b>{name}</b>
                </span>
                <span className='col-span-4 md:col-span-3'>
                    {text}
                </span>
        </div>
    )
}
const HelpCommand: FunctionComponent<CommandProps> = ({
    callback
}) => {


    const {t} = useTranslation();

    return (
        <div>
            <span className='text-2xl '>{t('help.ln1')}</span>
            <br />
            
            <HelpItem name="contact" callback={() => callback("contact")} text={t('help.ln2')} />
            <HelpItem name="skills" callback={() => callback("skills")} text={t('help.ln3')} />



            <HelpItem name="welcome" callback={() => callback("welcome")} text={t('help.ln4')} />


            <h3 className="py-3 border-t border-white/25 text-2xl dark:text-broom-500 text-regal-blue-500">{t('help.ln5')}</h3>
            <p>{t('help.ln6')}</p>
            <HelpItem name="change-theme" callback={() => callback("change-theme")} text={t('help.ln7')} />

            <h3 className="py-3 border-t border-white/25 text-2xl dark:text-broom-500 text-regal-blue-500">{t('help.ln8')}</h3>
            <p>{t('help.ln9')}</p>
            <HelpItem name="language-pt" callback={() => callback("language-pt")} text="Displays the initial message" />
            <HelpItem name="language-en" callback={() => callback("language-en")} text="Displays the initial message" />
            <HelpItem name="language-es" callback={() => callback("language-es")} text="Displays the initial message" />
           
            
        </div>
    );
}

export default HelpCommand;