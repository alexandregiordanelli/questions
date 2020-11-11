import { useRouter } from "next/router"
import React from "react"
import { absolute } from "../lib/utils"
import { Question } from "../types"
import ActiveLink from "./ActiveLink"

const NavPointer: React.FC<{
    title: string,
    questions: Question[]
}> = props => {
    const router = useRouter()
    return (
        <>
            <style jsx>{`
            div {
                max-height: calc(100vh - 110px - 48px);
                position: sticky;
                top: 90px;
                grid-area: table-of-contents / table-of-contents / table-of-contents / table-of-contents;
            }
            @media screen and (max-width: 768px){
                div {
                    position: inherit;
                    padding: 24px;
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

            li {
                display: inline;
            }

            a {
                display: inline-block;
                width: 40px;
                padding: 5px 10px;
                font-style: normal;
                line-height: 20px;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                border: 1px solid transparent;
                border-radius: 6px;
                transition: border-color .2s cubic-bezier(.3,0,.5,1);
            }

            a:hover:not(.ativo){
                text-decoration: none;
                border-color: #e1e4e8;
                outline: 0;
                transition-duration: .1s;
            }

            :global(.ativo) {
                background-color: #0366d6;
                color: white;
            }
            `}</style>
            <div>
                <span>{props.title}</span>
                <ul>
                {props.questions.map((x, i) => (
                    <li key={i}>
                        <ActiveLink activeClassName="ativo" href={absolute(router.asPath, x.url)}><a>{i+1}</a></ActiveLink>
                    </li>
                ))}
                </ul> 
            </div>
        </>
    )
}

export default NavPointer
