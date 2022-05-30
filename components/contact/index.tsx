import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";



const ContactCommand: FunctionComponent = ({
}) => {

    const {t} = useTranslation();
    
    return (
        <div>
            <h3 className="text-4xl font-bold">Contact info</h3>
            <h5 className="text-2xl dark:text-broom-500 text-regal-blue-500 py-3">
                {t('contact.ln1')}
            </h5>
            <div className="flex items-center my-3">
                <div className="font-bold uppercase">
                {t('contact.ln2')}:
                </div>
                <div>
                <a href="mailto:lucas@lpacheco.tech">lucas@lpacheco.tech</a>
                </div>
            </div>
            <div className="flex items-center my-3">
                <div className="font-bold uppercase">
                Github:
                </div>
                <div>
                <a href="https://github.com/lucaspdude" target="_blank" rel="noreferrer">@lucaspdude</a>
                </div>
            </div>
            
            
        </div>
    );
}

export default ContactCommand;