import { FunctionComponent } from "react";



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


    return (
        <div>
            <span className='text-2xl '>Here is a list of helpfull comands: </span>
            <br />
            
            <HelpItem name="contact" callback={() => callback("contact")} text="Displays contact information" />
            <HelpItem name="skills" callback={() => callback("skills")} text="View skills and proficiency levels" />
            {/* <HelpItem name="portfolio" callback={() => callback("portfolio")} text="Displays portfolio" /> */}
            {/* <HelpItem name="social" callback={() => callback("social")} text="Displays links for social media" /> */}
            <HelpItem name="articles" callback={() => callback("articles")} text="List of articles written" />
            <HelpItem name="welcome" callback={() => callback("welcome")} text="Displays the initial message" />
           
            
        </div>
    );
}

export default HelpCommand;