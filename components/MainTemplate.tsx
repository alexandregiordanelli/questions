import React from 'react';
import { ampUrl } from '../lib/utils';
import Link from 'next/link';
import { MainTemplateCSS } from '../styles/MainTemplateCSS';
import { useAmp } from 'next/amp'
import { Logo, LogoTextual } from './Logo';
import { useRouter } from 'next/router';

export const MainTemplate: React.FC = () => {
    const isAmp = useAmp()
    const router = useRouter();
    
    return (
        <>
            <style jsx>{MainTemplateCSS}</style>
            <div className="head">
                <div className="left">
                    <Link href="/">
                        <a>
                            <Logo size={32} color="#fff" style={{marginRight: 8}}/>
                            <div className="textual"><LogoTextual size={32} color="#fff"/></div>
                        </a>
                    </Link>
                    <h1><Link href={ampUrl(isAmp, "enem")}><a>Enem</a></Link></h1>
                </div>
                <Link href={`/login?return=${router.asPath}`}>
                    <a className="right">Sign In</a>
                </Link>
            </div>
        </>
    );
};
