import React, { useState } from 'react';
import { Menu } from '../lib/types';
import { ampUrl } from '../lib/utils';
import Link from 'next/link';
import { LeftMenu } from './LeftMenu';
import { MainTemplateCSS } from '../styles/MainTemplateCSS';
import { ChevronRightIcon, ThreeBarsIcon } from '@primer/octicons-react';
import { useAmp } from 'next/amp'
import { Logo, LogoTextual } from './Logo';

export const MainTemplate: React.FC = props => {
    const isAmp = useAmp()

    return (
        <>
            <style jsx>{MainTemplateCSS}</style>
            <div className="main">
                <div className="head">
                    <Link href="/">
                        <a>
                            <Logo size={32} color="#fff" style={{marginRight: 8}}/>
                            <div className="textual"><LogoTextual size={32} color="#fff"/></div>
                        </a>
                    </Link>
                    <h1><Link href={ampUrl(isAmp, "enem")}><a>Enem</a></Link></h1>
                </div>
                {props.children}
            </div>
        </>
    );
};
