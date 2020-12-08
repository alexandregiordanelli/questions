import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import firebase from '../lib/firebase-client'
import { LoaderComponent } from 'next/dynamic';

export const sendEmailLogin = (email: string) => {
    firebase.auth().sendSignInLinkToEmail(email, {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'http://localhost:3000?email='+email,
        handleCodeInApp: true,
      })
    .then(() => {
        console.log("aqui")
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      // window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(error => {
        console.log("error")
      // Some error occurred, you can inspect the code: error.code
    });
}

export const parseLinkEmailLogin = (url) => {
    if (firebase.auth().isSignInWithEmailLink(url)) {
        firebase.auth().signInWithEmailLink("alexandre.giordanelli@gmail.com", url)
          .then(result => {
              console.log(result)
            // Clear email from storage.
            //window.localStorage.removeItem('emailForSignIn');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch(error => {
              console.log(error)
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
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
        if(router.query["apiKey"] && router.query["oobCode"]){
            parseLinkEmailLogin("http://localhost:3000" + router.asPath)
        }
    }, [router.query]);

    return (
        <>
        <form className="formLogin" onSubmit={() => sendEmailLogin(email)}>
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
            margin-top: 46px;
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


