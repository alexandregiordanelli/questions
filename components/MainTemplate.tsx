import React, { useState } from 'react';
import { Menu } from '../lib/types';
import { ampUrl } from '../lib/utils';
import Link from 'next/link';
import { LeftMenu } from './LeftMenu';
import { MainTemplateCSS } from '../styles/MainTemplateCSS';
import { ChevronRightIcon, ThreeBarsIcon } from '@primer/octicons-react';
import { useAmp } from 'next/amp';

export const MainTemplate: React.FC<{
    menu: Menu[];
}> = props => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const isAmp = useAmp()

    return (
        <>
            <style jsx>{MainTemplateCSS}</style>
            <div className="main">
                <div className="head"><h1><Link href="/"><a>QuestionsOf</a></Link> <ChevronRightIcon/> <Link href={ampUrl(isAmp, "enem")}><a>Enem</a></Link></h1></div>
                <div className={"container"}>
                    <div className={"menu"}>
                        
                        <input id="menu-check" type="checkbox" onChange={x => setToggleMenu(x.target.checked)} checked={toggleMenu} />
                        <LeftMenu menu={props.menu} />
                    </div>
                    {props.children}
                </div>
            </div>
        </>
    );
};
