import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { csrfToken } from 'next-auth/client'
import { NextPage } from "next";
import FormEmail from "../../components/FormEmail";


const SignIn: NextPage<{
    csrfToken: string
}> = props => {
    const [email, setEmail] = useState('');
    const [cursorPosition, setCursorPosition] = useState(-1);

    useEffect(() => {
        if (email.length == 0)
            setCursorPosition(-1);
    }, [cursorPosition]);

    return (
        <FormEmail csrfToken={props.csrfToken} cursorPosition={cursorPosition}>
            <label className="w-full">
                <span className="mb-1 font-semibold text-sm leading-5">Email</span>
                <input type="text" className="p-2 text-base block w-full rounded text-gray-900" name="email" onKeyDown={x => {
                    const number = x.currentTarget.selectionStart;
                    setTimeout(() => setCursorPosition(number), 0);
                }} onChange={x => setEmail(x.target.value)} value={email} />
            </label>
            <button type="submit" className="bg-green-600 text-white rounded-md mt-4 px-4 py-2 cursor-pointer">Send Magic Link to Email</button>
        </FormEmail>
    );
}

SignIn.getInitialProps = async (context) => {
    return {
        csrfToken: await csrfToken(context)
    }
}

export default SignIn