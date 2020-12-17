import React from 'react';
import { ampUrl } from '../lib/utils';
import Link from 'next/link';
import { HeaderCSS } from '../styles/HeaderCSS';
import { useAmp } from 'next/amp'
import { Logo, LogoTextual } from './Logo';
import { useRouter } from 'next/router';
import { useStateValue } from './State';

export const Header: React.FC = () => {
    const isAmp = useAmp()
    const router = useRouter();
    const [state, dispatch] = useStateValue();

    

    return (
        <>
            <style jsx>{HeaderCSS}</style>
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
                {!(state.user.currentUser && !state.user.currentUser.isAnonymous) && <Link href={`/login?return=${router.asPath}`}>
                    <a className="right">Sign In</a>
                </Link>}
            </div>
        </>
    );
};
