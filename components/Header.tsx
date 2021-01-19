import React from 'react';
import { ampUrl } from '../lib/utils';
import Link from 'next/link';
import { useAmp } from 'next/amp'
import { Logo, LogoTextual } from './Logo';
import { useRouter } from 'next/router';
import {
    signIn, 
    signOut,
    useSession
  } from 'next-auth/client'
export const Header: React.FC = () => {
    const isAmp = useAmp()
    const [ session, loading ] = useSession()

    return (
        <>
            <div className="bg-gray-800 top-0 sticky h-16 items-center justify-between flex p-1 z-10">
                <div className="items-center flex">
                    <Link href="/">
                        <a className="items-center flex">
                            <Logo size={32} color="#fff" className="mx-2" />
                            <LogoTextual size={32} color="#fff" className="hidden sm:block"/>
                        </a>
                    </Link>
                    <h1><Link href={ampUrl(isAmp, "enem")}><a>Enem</a></Link></h1>
                </div>
                {!session && <>
                    Not signed in <br/>
                    <button onClick={() => signIn()}>Sign in</button>
                    </>}
                    {session && <>
                    Signed in as {session.user.email} <br/>
                    <button onClick={() => signOut()}>Sign out</button>
                    </>}

            </div>
        </>
    );
};
