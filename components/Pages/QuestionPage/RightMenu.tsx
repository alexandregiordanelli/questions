import { useRouter } from "next/router"
import React, { useState } from "react"
import { absolute } from "../../../lib/utils"
import { Question } from "../../../lib/types"
import ActiveLink from "../../ActiveLink"
import {BeakerIcon, ChevronDownIcon, ChevronUpIcon, ZapIcon} from '@primer/octicons-react'

const RightMenu: React.FC<{
    title: JSX.Element,
    questions: Question[]
}> = props => {
    const router = useRouter()
    const slugJoined = `${(router.query.slug as string[]).join('/')}`
    const [toggleMenu, setToggleMenu] = useState(false);
    
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
            label {
                font-weight: 600;
                line-height: 1.5;
                display: inline-block;
                font-size: 16px;
                margin-bottom: 4px;
            }
            #title-menu-right-check {
                display: none;
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

            a:hover:not(.ativo){
                text-decoration: underline;
                outline: 0;
            }

            a.ativo {
                font-weight: 600;
                color: #24292e;
            }

            .icon {
                    display: none;
                    color: rgb(88, 96, 105);
            }

            @media screen and (max-width: 768px){
                label {
                    margin-bottom: 0;
                }
                .title-menu-right {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    display: flex;
                    padding: 16px;
                    cursor: pointer;
                }
                .icon {
                    display: block;
                }

                div {
                    position: inherit;
                    background: rgb(250,251,252);
                    border: solid 1px rgb(225,228,232);
                    max-height: inherit;
                    margin: 24px;
                    border-radius: 6px;
                }
                a {
                    font-size: 16px;
                }
                ul {
                    display: none;
                    border-top: 1px solid rgb(225, 228, 232);
                    padding: 16px;
                }
                #title-menu-right-check:checked + ul {
                    display: block;
                }
            }
            `}</style>
            <div>

                    <label className="title-menu-right" htmlFor="title-menu-right-check">
                        <span>{props.title}</span>
                        <span className="icon"><ChevronDownIcon verticalAlign='middle' /></span>
                    </label>

                <input id="title-menu-right-check" type="checkbox" onChange={x => setToggleMenu(x.target.checked)} checked={toggleMenu} />
                <ul>
                {props.questions.map((x, i) => (
                    <li key={i}>
                        <ActiveLink activeClassName="ativo" href={absolute(slugJoined, x.url)}><a>{x.title}</a></ActiveLink>
                    </li>
                ))}
                </ul> 
            </div>
        </>
    )
}

export default RightMenu