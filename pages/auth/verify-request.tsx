import { NextPage } from "next";
import FormEmail from "../../components/FormEmail";

const VerifyRequest: NextPage = () => {
    
    return (
        <FormEmail>
            <p className="text-2xl text-center my-4 font-medium text-gray-700">Abra o email com o link que você recebeu para se logar.</p>
        </FormEmail>
    );
}

export default VerifyRequest


