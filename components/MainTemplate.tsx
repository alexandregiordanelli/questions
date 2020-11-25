import React, { useState } from 'react';
import { Menu } from '../lib/types';
import { ampUrl } from '../lib/utils';
import Link from 'next/link';
import { LeftMenu } from './LeftMenu';
import { MainTemplateCSS } from '../styles/MainTemplateCSS';

export const MainTemplate: React.FC<{
    menu: Menu[];
}> = props => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <>
            <style jsx>{MainTemplateCSS}</style>
            <div className="main">
                <div className="head"><h1><Link href="/"><a>QuestionsOf</a></Link> {'>'} <Link href={ampUrl(true, "enem")}><a>Enem</a></Link></h1></div>
                <div className={"container"}>
                    <div className={"menu"}>
                        <input id="menu-check" type="checkbox" onChange={x => setToggleMenu(x.target.checked)} checked={toggleMenu} />
                        <LeftMenu menu={props.menu} />
                    </div>
                    <div className="grid">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};
