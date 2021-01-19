import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';


const linearPositionEye = (x: number) => {
    if(x < 40)
        return 92 - x * 0.3
    else if(x > -1)
        return 80
}

const FormEmail: React.FC<{
    csrfToken?: string,
    cursorPosition?: number
}> = props => {

    return (
        <div className="w-screen h-screen bg-gray-800 pt-4">
            <form className="bg-white p-6 flex rounded-md items-center flex-col sm:absolute top-1/2 left-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-sm" method='post' action='/api/auth/signin/email'>
                <input name='csrfToken' type='hidden' defaultValue={props.csrfToken}/>
                <div className="logo relative">
                    <Logo size={200} color={!(props.cursorPosition > -1) ? "rgba(31, 41, 55)" : "rgba(156, 163, 175)"} />
                    <div className={`absolute ${props.cursorPosition > -1 ? 'block': 'hidden'}`} style={{ bottom: 98, right: linearPositionEye(props.cursorPosition ?? 0) }}>
                        <svg width="9px" height="13px" viewBox="0 0 9 13">
                            <ellipse fill="#000000" cx="4.5" cy="6.5" rx="4.5" ry="6.5"></ellipse>
                        </svg>
                    </div>
                </div>

                {props.children}
            </form>
        </div>
    );
};

export default FormEmail


