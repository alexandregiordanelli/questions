import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import firebase from '../lib/firebase-client'
import { urlEnv } from '../lib/utils';

export const loginAnonymously = async () => {
    try{
        if(!firebase.auth().currentUser) 
            await firebase.auth().signInAnonymously()
    }
    catch(e){
        console.log('loginAnonymously', e)
    }
}

export const loginGitHub = async () => {
    try{
        const provider = new firebase.auth.GithubAuthProvider()
        await firebase.auth().signInWithRedirect(provider)
    } catch(e){
        console.log("poi")
    }
}

export const sendEmailLogin = async (url: string, email: string) => {
    url = url.split('').some(x => x == '?') ? url.concat(`&email=${encodeURIComponent(email)}`): url.concat(`?email=${email}`)

    await firebase.auth().sendSignInLinkToEmail(email, {
        url,
        handleCodeInApp: true,
    })
}

export const linkAuth = async (router: NextRouter) => {
    const url = `${urlEnv}${router.asPath}`

    const credential = firebase.auth.EmailAuthProvider.credentialWithLink(router.query.email as string, url);

    console.log("tentar linkAuth")
    await firebase.auth().currentUser.linkWithCredential(credential)

}

export const parseLinkEmailLogin = async (router: NextRouter) => {
    const url = `${urlEnv}${router.asPath}`

    //if (firebase.auth().isSignInWithEmailLink(url)) {
        console.log("tentar parseLinkEmailLogin")
        await firebase.auth().signInWithEmailLink(router.query.email as string, url)
    //}
}

const FormEmail = props => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [cursorPosition, setCursorPosition] = useState(-1);

    useEffect(() => {
        if (email.length == 0)
            setCursorPosition(-1);
    }, [cursorPosition]);

    useEffect(() => {
        firebase.auth().getRedirectResult().then(function(result) {
            const credential = result.credential as firebase.auth.OAuthCredential;
            if (credential) {
              console.log(credential.accessToken);
            }
            var user = result.user;
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }, [])

    const OnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await sendEmailLogin(`${urlEnv}${router.asPath}`, email)
    }

    return (
        <>
        <form className="formLogin" onSubmit={OnSubmit}>
            <div className="logo">
                <Logo size={200} color={cursorPosition > -1 ? "rgb(33,136,255)" : "rgb(27,31,35)"} />
                <div className="eye" style={{ right: 92 - cursorPosition * 0.3, display: cursorPosition > -1 ? 'block' : 'none' }}>
                    <svg width="9px" height="13px" viewBox="0 0 9 13">
                        <ellipse fill="#000000" cx="4.5" cy="6.5" rx="4.5" ry="6.5"></ellipse>
                    </svg>
                </div>
            </div>

            {!router.query['email'] ? <>
                <label>
                    <span>Email</span>
                    <input type="text" className="email" name="email" onKeyDown={x => {
                        const number = x.currentTarget.selectionStart;
                        setTimeout(() => setCursorPosition(number), 0);
                    }} onChange={x => setEmail(x.target.value)} value={email} />
                </label>
                <input type="submit" className="signupButton" value="Receber Link de Acesso"/>
                <input type="button" className="signupButton" value="Continue with GitHub" onClick={loginGitHub}/>
            </> : <p>Abra o email com o link que você recebeu em {router.query['email']} para se logar.</p>}
        </form>
        <style jsx>{`
        .formLogin {
            background: white;
            padding: 24px;
            flex-flow: column;
            display: flex;
            border-radius: 6px;
            align-items: center;
            flex: 1;
            max-width: 400px;
        }
        .email {
            min-height: 46px;
            padding: 10px;
            font-size: 16px;
            display: block;
            width: 100%;
            border-radius: 5px;
            border: solid 1px #E4E4E9;
            color: rgb(36, 41, 46);
        }
        .email:focus{
            border-color: #0366d6;
            box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
            outline: 0;
            
        }
        .signupButton {
            padding: 20px 32px;
            background: #2ebc4f;
            color: white;
            border-radius: 6px;
            border: 0;
            font-size: 16px;
            display: block;
            width: 100%;
            font-family: inherit;
            margin-top: 16px;
            transition: .2s;
            cursor: pointer;
        }
        .formLogin label span {
            margin-bottom: 5px;
            font-weight: 600;
            font-size: 14px;
            line-height: 21px;
        }
        .formLogin label {
            width: 100%;
        }
        .signupButton:hover {
            background: #28a745;
        }
        .logo{
            position: relative;
        }
        .eye{
            position: absolute;
            bottom: 98px;
        }
        `}</style>
        </>
    );
};

export default FormEmail


