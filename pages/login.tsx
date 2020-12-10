import FormEmail from "../components/FormEmail";
import { globalCSS } from "../styles/globalCSS";

const Login = () => {
    return (
        <>  
            <style jsx global>
                {globalCSS}
            </style>
            <style jsx>{`
            .container {
                background: rgb(27,31,35);
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }    
            `}</style>
            <div className="container">
                <FormEmail/>
            </div>
        </>
    )
}

export default Login