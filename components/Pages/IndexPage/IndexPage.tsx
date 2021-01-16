import React from 'react';

import Link from 'next/link';
import Image from 'next/image'
import { Img } from '../../Img';
import EditNotebook from '../../EditNotebook';
import { useRouter } from 'next/router';
import { Notebook } from '@prisma/client';
export const IndexPage: React.FC<{
    notebooks: Notebook[]
}> = props => {

    
    const router = useRouter()

    return (
        <>
            {router.query.add && <EditNotebook />}
            <div className="first">
                <div className="container">
                    <div className="flex">

                        <div className="texts">
                            <h1>Questões selecionadas para você passar</h1>
                            <span>Escolha o exame, prova, certificação e se prepare resolvendo questões</span>
                            <p>Nós já organizamos, filtramos e escolhemos as principais questões para você ter exito!</p>

                        </div>

                        {/* {state.user.currentUser?.isAnonymous && <DynamicComponentWithNoSSR />} */}
                        {/* {state.user.currentUser && <button onClick={() => firebase.auth().currentUser.delete()}>Sair</button>} */}

                    </div>

                </div>
            </div>
            <div className="second">
                <div className="container">
                    <div className="flex2">
                        {props.notebooks.map((x, i) => <div key={i} className="box">
                            <div>
                                {/* <Img 
                                src={imgs[i]} width={368} height={220}  /> */}
                            </div>
                            <h1><Link href={x.tag}><a>{x.name}</a></Link></h1>
                            <p>Utility-centric and BEM-style components to give you the building blocks for any web project.</p>
                        </div>)}
                    </div>
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
    );
};

export default IndexPage