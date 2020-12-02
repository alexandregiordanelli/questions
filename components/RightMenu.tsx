import { useRouter } from "next/router"
import React from "react"
import { absolute } from "../lib/utils"
import { Question } from "../lib/types"
import ActiveLink from "./ActiveLink"

const RightMenu: React.FC<{
    title: string,
    questions: Question[]
}> = props => {
    const router = useRouter()
    const slugJoined = `${(router.query.slug as string[]).join('/')}`
    return (
        <>
            <style jsx>{`
            div {
                max-height: calc(100vh - 110px - 24px);
                overflow: auto;
                position: sticky;
                top: 90px;
                grid-area: table-of-contents / table-of-contents / table-of-contents / table-of-contents;
            }
            @media screen and (max-width: 768px){
                div {
                    position: inherit;
                    padding: 24px;
                    background: rgb(250,251,252);
                    margin-bottom: 15px;
                    border-bottom: solid 1px;
                    border-color: rgb(225,228,232);
                }
            }
            span {
                font-weight: 600;
                line-height: 1.5;
                display: inline-block;
                font-size: 16px;
                margin-bottom: 4px;
            }

            ul {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            a {
                text-decoration: none;
                font-size: 14px;
                display: inline-block;
                padding-top: 4px;
                padding-bottom: 4px;
                color: rgb(88, 96, 105);
            }

            a:hover {
                
            }

            a:hover:not(.ativo){
                text-decoration: underline;
                outline: 0;
            }

            a.ativo {
                font-weight: 600;
                color: #24292e;
            }
            `}</style>
            <div>
                <span>{props.title}</span>
                <ul>
                {props.questions.map((x, i) => (
                    <li key={i}>
                        <ActiveLink activeClassName="ativo" href={absolute(slugJoined, x.url)}><a>{i+1}) {x.title}</a></ActiveLink>
                    </li>
                ))}
                </ul> 
            </div>
        </>
    )
}

export default RightMenu
