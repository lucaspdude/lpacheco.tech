import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";



export interface CommandProps{
    callback: (commandName: string) => void
}

interface ArticleProps{
    title: string
    url: string
    date?: string
}
const Article:FunctionComponent<ArticleProps> = ({
    title,
    url,
    date
}) => {

    const router = useRouter();

    const handleGoToArticle = () => {
        router.push(`/articles/${url}`)
    }

    return (
        <div className="w-full py-3 px-3 hover:bg-white/25 transition-all ease-in-out duration-200">
            <h4 onClick={handleGoToArticle} className="text-2xl text-regal-blue-500 dark:text-broom-500 cursor-pointer">{title}</h4>
            {date && (
                <span className="flex py-3">
                    <span className="text-regal-blue-500 dark:text-red-500">PUBLISHED:</span>  <span className="text-bold"> {date}</span>
            </span>
            )}
            
        </div>
    )

}
const ArticlesCommand: FunctionComponent<CommandProps> = ({
    callback
}) => {


    return (
        <div>
            <span className='text-2xl '>Here is a list of my artcles: </span>
            <br />
            <div className=''>
        

               <Article title="Lorem ipsum dolor sit amet consectetur." url="lorem-ipsun" date={new Date().toLocaleDateString()} />
               <Article title="Lorem ipsum dolor sit amet consectetur." url="lorem-ipsun" date={new Date().toLocaleDateString()} />
               <Article title="Lorem ipsum dolor sit amet consectetur." url="lorem-ipsun" date={new Date().toLocaleDateString()} />
               <Article title="Lorem ipsum dolor sit amet consectetur." url="lorem-ipsun" date={new Date().toLocaleDateString()} />
                
                

            </div>

           
        </div>
    );
}

export default ArticlesCommand;