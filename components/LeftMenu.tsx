import React from 'react';
import { Menu } from '../lib/types';
import ActiveLink from './ActiveLink';

export const LeftMenu = (props: {
    menu: Menu[];
    slugJoined: string;
}) => {
    return (
        <>
            <style jsx>{`
            .menu {
                top: 66px;
                height: calc(100vh - 66px);
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

            .submenu a.active {
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
                    right: -260px;
                    position: fixed;
                    border-width: 0px 0px 0px 1px;
                    transition: 0.5s;
                }
            }
            `}</style>
            <ul className={"menu"}>
                {props.menu.map((x, i) => (
                    <li key={`${i}.0`} className={"menu-block"}>
                        {x.title}
                        <ul className={"submenu"}>
                            {x.topics.map((y, j) => {
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
                ))}
            </ul>
        </>
    );
};
