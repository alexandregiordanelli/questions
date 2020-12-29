import { GetStaticPaths } from 'next';
import getQuestions from '../../services/getQuestions';

export const PagesStaticPaths: GetStaticPaths = async () => {

    const paths = await getQuestions('enem')

    return ({
        paths: [],
        fallback: 'blocking'
    });
};
