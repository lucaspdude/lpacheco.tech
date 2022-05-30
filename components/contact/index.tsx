import { FunctionComponent } from "react";



export interface CommandProps{
    callback?: (commandName: string) => void

}
const ContactCommand: FunctionComponent<CommandProps> = ({
    callback
}) => {

    
    return (
        <div>
            <h3 className="text-4xl font-bold">Contact info</h3>
            <h5 className="text-2xl dark:text-broom-500 text-regal-blue-500 py-3">
                Feel free to contact me on the channels provided bellow
            </h5>
            <div className="flex items-center my-3">
                <div className="font-bold uppercase">
                    Email:
                </div>
                <div>
                <a href="mailto:lucas@lpacheco.tech">lucas@lpacheco.tech</a>
                </div>
            </div>
            <div className="flex items-center my-3">
                <div className="font-bold uppercase">
                    Phone:
                </div>
                <div>
                <a href="tel:+5527999072255">+55 (27) 99907 2255</a>
                </div>
            </div>
            
            
        </div>
    );
}

export default ContactCommand;