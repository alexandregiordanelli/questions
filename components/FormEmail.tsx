import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';




const FormEmail: React.FC<{
    csrfToken?: string,
    cursorPosition?: number
}> = props => {

    return (
        <div className="w-screen h-screen bg-gray-800">
            <form className="bg-white p-6 flex rounded-md items-center max-w-sm flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" method='post' action='/api/auth/signin/email'>
                <input name='csrfToken' type='hidden' defaultValue={props.csrfToken}/>
                <div className="logo relative">
                    <Logo size={200} color={!(props.cursorPosition > -1) ? "rgba(31, 41, 55)" : "rgba(156, 163, 175)"} />
                    <div className="absolute" style={{ bottom: 98, right: 92 - props.cursorPosition ?? 0 * 0.3, display: props.cursorPosition > -1 ? 'block' : 'none' }}>
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


