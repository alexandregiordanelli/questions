import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Menu, Question } from '../../lib/types'
import { globalCSS } from '../../styles/globalCSS'
import { katexCSS } from "../../styles/katexCSS"
import { QuestionComponent } from '../QuestionComponent'
import { MainTemplate } from '../MainTemplate'
import { QuestionBook } from '../QuestionBook'
import { useAmp } from 'next/amp'
import { ampUrl } from '../../lib/utils'
import Head from 'next/head'
import { LeftMenu } from '../LeftMenu'
import { Logo, LogoTextual } from '../Logo'
import FormEmail from '../FormEmail'
import dynamic from 'next/dynamic'
import firebase from '../../lib/firebase-client'
import Link from 'next/link'
import { MainTemplateCSS } from '../../styles/MainTemplateCSS'

export const QuestionPage: React.FC<{
    questions: Question[]
    menu: Menu[]
    questionIndex: number
    questionBook: string
}> = props => {
    const isAmp = useAmp()
    
    const router = useRouter()
        
    const slug = router.query['slug'] as string[]
        
    const deepth = slug?.length

    const { menu, questions, questionIndex, questionBook } = props

    if (deepth && !(menu || questions)) return null

    return (
        <>
            <Head>
                <link rel={isAmp? "canonical": "amphtml"} href={`https://questionsof.com${ampUrl(!isAmp, slug?.join('/'))}`}/>
                <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png"/>
                <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png"/>
                <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png"/>
                <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png"/>
                <link rel="icon" type="image/png" sizes="192x192"  href="/favicons/android-icon-192x192.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
                <meta name="msapplication-TileColor" content="#ffffff"/>
                <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png"/>
                <meta name="theme-color" content="#1b1f23"/>
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <style jsx global>
                {katexCSS}
            </style>
            <style jsx global>
                {globalCSS}
            </style>
            <style jsx>{`
                    .container {
                        display: flex;
                    }
                    .main {
                        flex-direction: column;
                        min-height: 100vh;
                        display: flex;
                    }
                    `}</style>
                    <div className="main">
                {!deepth && <IndexPage/>}
                {deepth && (<>
                    <MainTemplate/>                
                
                    <div className={"container"}>
                        {deepth >= 1 && <LeftMenu menu={menu} />}
                        {deepth > 1 && <QuestionComponent menu={menu} questions={questions} questionIndex={questionIndex} />}
                        {deepth == 1 && <QuestionBook questionBook={questionBook} startUrl={""} />}
                    </div>
                
                </>)}
                </div>
        </>
    )
}



const DynamicComponentWithNoSSR = dynamic(
    () => new Promise(resolve => resolve(FormEmail)),
    { ssr: false }
)


export const IndexPage: React.FC = () => {
    const [user, setUser] = useState(firebase.auth().currentUser) //it always born null
    const [verifyAtLeastOnce, setVerifyAtleastOnce] = useState(false)
    const imgs = [
        "https://lh3.googleusercontent.com/proxy/XZmP8KWDZev7phUM97puc-s7LHtyG3WKcQ_J2RGPX4BMlFIPnxkO58wxFbUsHgKFJK2C61ncUs36kCyS-dTtJ2dPuE4ubM2Y7FJLMe5TdO9MvSvvcXloNFOgOnR-ngWudGwoHDQYpKRT5q3GWkQ",
        "https://upload.wikimedia.org/wikipedia/en/9/97/Instituto_Tecnol%C3%B3gico_de_Aeron%C3%A1utica_%28logo%29.png",
        "https://lh3.googleusercontent.com/proxy/-XQNXlg9y9ME9OGiKdc9TB2ydabGdBa_0ymOXNvI-V1gA6dDVuH2ikqeWeKlW8McxJxHLaDjxg_IoO_ydyPlU7ev5zEN5px6"
    ]
    const names = [
        "ENEM",
        "ITA",
        "IME"
    ]

    const urls = [
        "enem",
        "",
        ""
    ]

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(user => {
            setUser(user)
            setVerifyAtleastOnce(true)
        })
    }, [])



    return (
        <>
            <div className="first">
                <div className="container">
                    <div className="flex">

                        <div className="texts">
                            <h1>Questões selecionadas para você passar</h1>
                            <span>Escolha o exame, prova, certificação e se prepare resolvendo questões</span>
                            <p>Nós já organizamos, filtramos e escolhemos as principais questões para você ter exito!</p>
                            
                        </div>
 
                            {verifyAtLeastOnce && !user && <DynamicComponentWithNoSSR/>}
                            {verifyAtLeastOnce && user && <button onClick={()=>firebase.auth().signOut()}>Sair</button>}

                    </div>
                    
                </div>
            </div>
            <div className="second">
                <div className="container">
                        <div className="flex2">
                        {[0,1,2].map((x, i) => 
                        <div className="box">
                            <div><img src={imgs[i]}/></div>
                            <h1>{!!urls[i] ? <Link href={urls[i]}><a>{names[i]}</a></Link> : names[i]}</h1>
                            <p>Utility-centric and BEM-style components to give you the building blocks for any web project.</p>
                        </div>)}
                    </div>
                    <div className="third">© QuestionsOf 2020</div>
                </div>
            </div>
            <style jsx>{`
            .first {
                background: rgb(27,31,35);
            }
            .first h1 {
                font-size: 84px;
                margin: 0px 0px 8px;
                font-weight: 600;
                color: rgb(33, 136, 255);
                line-height: 100px;
            }
            .second {
                background-color: rgb(200, 225, 255);
                color: rgb(27, 31, 35);
            }
            .second .flex {
                flex-wrap: wrap;
            }
            .third {
                margin-top: 128px;
                padding-top: 32px;
                padding-bottom: 32px;
                border-radius: 0px;
                border-width: 2px 0px 0px;
                border-image: initial;
                border-style: solid;
                border-color: rgb(27, 31, 35);
            }
            .container {
                padding-left: 32px;
                padding-right: 32px;
                max-width: 1280px;
                margin: 40px auto;
                margin-top: 128px;
                margin-bottom: 128px;
            }
            .flex {
                display: flex;
                align-items: flex-end;
            }
            .flex2 {
                display: flex;
                flex-wrap: wrap;
            }
            .texts {
                padding-left: 32px;
                padding-right: 32px;
                flex: 2;
            }
            .texts span {
                font-size: 40px;
                line-height: 1.25;
                color: rgb(219, 237, 255);
                margin-bottom: 16px;
            }
            .texts p {
                color: rgb(200, 225, 255);
            }
            .box {
                max-width: 400px;
                min-width: 300px;
                flex: 1;
                padding-right: 32px;
                margin-bottom: 64px;
            }
            .box h1 {
                font-weight: 600;
                margin: 0px;
                font-size: 24px;
            }
            .box img {
                max-width: 100%;
                max-height: 100%;
            }
            .box div{
                height: 220px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #fff;
                border-radius: 6px;
                margin-bottom: 4px;
            }
            .box p {
                margin: 0;
            }
            .second .container{
                margin-bottom: 32px;
            }
           
            @media screen and (max-width: 1012px){
                .flex{
                    flex-direction: column;
                    align-items: inherit;
                }
            }
            `}</style>
        </>
    )
}


