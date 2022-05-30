import { FunctionComponent } from "react";


import angular from '../../assets/logos/angular.svg';
import css from '../../assets/logos/css.svg';
import html from '../../assets/logos/html.svg';
import javascript from '../../assets/logos/javascript.svg';
import typescript from '../../assets/logos/typescript.svg';
import next from '../../assets/logos/next.svg';
import react from '../../assets/logos/react.svg';
import scss from '../../assets/logos/scss.svg';
import node from '../../assets/logos/node.svg';
import laravel from '../../assets/logos/laravel.svg';
import dotnet from '../../assets/logos/dotnet.svg';
import Image from "next/image";


export interface CommandProps{
    callback: (commandName: string) => void
}

interface ArticleProps{
    title: string
    level: number
    icon: string
}
const Skill:FunctionComponent<ArticleProps> = ({
    title,
    level,
    icon
}) => {




    return (
        <div className=' my-2 py-3 px-3 hover:bg-white/25 transition-all ease-in-out duration-200 ' >


        <div className="md:flex items-center ">
            <Image src={icon} height={36} width={36} alt={`${title} Skill Level`}  />
            <span className=' dark:text-broom-500 text-regal-blue-500 cursor-pointer md:w-48 px-3 '>
                <b>{title}</b>
            </span>
        <span className='col-span-4 md:col-span-3 flex items-center '>
            {Array.from([1,2,3,4,5]).map((i) => (
                    <span key={i} className={` border rounded-full  border-green-800  dark:border-green-500 ml-1 w-8 h-2 py-1  ${level >= i ? 'bg-green-800 dark:bg-green-500' : '' }  `} />
                ))}

                <span className="mx-3">
                    {level}/5
                </span>

        </span>
        </div>
            
         
</div>
    )

}
const SkillsCommand: FunctionComponent = ({
}) => {


    return (
        <div>
            <div className=''>



                <h3 className="text-4xl font-bold">Frontend</h3>
                <Skill title="HTML" level={5} icon={html} />
                <Skill title="CSS" level={5} icon={css} />
                <Skill title="SCSS" level={5} icon={scss} />
                <Skill title="Vanila Javascript" level={4} icon={javascript} />
                <Skill title="Typescript" level={4} icon={typescript} />
                <Skill title="React" level={4} icon={react} />
                <Skill title="NextJS" level={5} icon={next} />
                <Skill title="Angular" level={4} icon={angular} />
                

                <h3 className="text-4xl font-bold mt-6">Backend</h3>
                <Skill title="NodeJS" level={5} icon={node} />
                <Skill title="Laravel" level={4} icon={laravel} />
                <Skill title="C#" level={3} icon={dotnet} />
                


            </div>

           
        </div>
    );
}

export default SkillsCommand;