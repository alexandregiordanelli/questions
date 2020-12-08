import { ChevronDownIcon, ThreeBarsIcon } from '@primer/octicons-react';
import React, { useState } from 'react';
import { Menu } from '../lib/types';
import ActiveLink from './ActiveLink';

export const LeftMenu = (props: {
    menu: Menu[];
}) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <>
            <style jsx>{`
                
            .menu {
                top: 62px;
                height: calc(100vh - 62px);
                overflow: auto;
                color: rgb(47, 54, 61);
                background-color: rgb(250, 251, 252);
                width: 260px;
                position: sticky;
                border-width: 0px 1px 0px 0px;
                border-style: solid;
                border-color: rgb(225, 228, 232);
                display: block;
                z-index: 1;
                padding: 0;
                margin: 0;
                list-style: none;
            }
            .menu a:hover {
                text-decoration: underline;
            }
            .submenu {
                font-size: 14px;
                list-style: none;
                padding: 0;
                margin: 0;
                margin-top: 16px;
                display: none;
            }
            
            .submenu a {
                text-decoration: none;
                font-size: 14px;
                display: block;
                padding-top: 4px;
                padding-bottom: 4px;
                margin-top: 8px;
                color: rgb(3, 102, 214);
            }

            .menu a.active, .submenu a.active {
                font-weight: 600;
                color: rgb(47, 54, 61);
            }

            .menu-block {
                padding: 24px;
                border-width: 1px 0px 0px;
                border-radius: 0px;
                border-style: solid;
                border-color: rgb(225, 228, 232);
            }



            @media screen and (max-width: 1012px){
                .menu {
                    left: -260px;
                    position: fixed;
                    border-width: 0px 1px 0px 0px;
                    transition: 0.5s;
                }
            }

            #menu-check {
                display: none;
            }

            .menu-check-label {
                z-index: 1;
                left: 14px;
                top: 14px;
                position: fixed;
                padding: 6px 16px;
                display: none;
                cursor: pointer;
                line-height: 20px;
                border-radius: 6px;
                font-size: 14px;
                color: rgb(200,225,255);
                border: 1px solid rgb(68,77,86);
            }

            .menu-check-label:hover {
                color: rgb(255, 255, 255);
                background-color: rgb(3, 102, 214);
                border-color: rgba(27, 31, 35, 0.15);
                box-shadow: rgba(27, 31, 35, 0.1) 0px 1px 0px, rgba(255, 255, 255, 0.03) 0px 2px 0px inset;
            }


            :global(.menuItemLabel) {
                display: none;
            }
            :global(.menuItemLabel:checked ~ ul) {
                display: block;
            }


            @media screen and (max-width: 1012px){
            
                .menu-check-label {
                    display: block;
                }

                :global(#menu-check:checked ~ ul) {
                    left: 0;
                }
            }

            `}</style>
            <div>
                <label htmlFor="menu-check" className="menu-check-label"><ThreeBarsIcon /></label>
                <input id="menu-check" type="checkbox" onChange={x => setToggleMenu(x.target.checked)} checked={toggleMenu} />
                <ul className={"menu"}>
                    {props.menu.sort((a, b) => a.title > b.title ? 1 : -1).map((x, i) => {
                        const topicsSorted = x.topics.sort((a, b) => a.title > b.title ? 1 : -1)
                        return (
                            <li key={`${i}.0`} className={"menu-block"}>
                                <MenuItem id={`${i}.0`} url={topicsSorted[0].url} title={x.title} hasExpanded={topicsSorted.length > 1}/>
                                <ul className={"submenu"}>
                                    {topicsSorted.map((y, j) => {
                                        if (y.url) {
                                            return (
                                                <li key={`${i}.${j}`}>
                                                    <ActiveLink href={y.url}>
                                                        <a>{y.title}</a>
                                                    </ActiveLink>
                                                </li>
                                            );
                                        }
                                    })}
                                </ul>
                            </li>
                        )
                    }
                    )}
                </ul>
            </div>
        </>
    );
};

const MenuItem: React.FC<{
    id: string
    hasExpanded: boolean
    url: string
    title: string
}> = props => {
    const [opened, toggleOpened] = useState(false)
    let component = <ActiveLink href={props.url}>
        <a>{props.title}</a>
        </ActiveLink>
    if(props.hasExpanded){
        component = <>
            <label htmlFor={props.id}>
                <ActiveLink href={props.url}>
                    <a>{props.title}</a>
                </ActiveLink>
                <ChevronDownIcon/>
            </label>
            <input id={props.id} 
                className="menuItemLabel"
                type="checkbox" 
                onChange={x => toggleOpened(x.target.checked)} 
                checked={opened} 
            />
            <style jsx>{`
            label {
                display: flex;
                align-items: center;
                cursor: pointer;
                justify-content: space-between;
            }
        `}</style>
        </>
    }
    return component
}
