import { getPathsFromGHRepo } from '../../lib/utils';
import { GetStaticPaths } from 'next';

export const QuestionPageStaticPaths: GetStaticPaths = async () => {
    const paths = await getPathsFromGHRepo({
        username: 'alexandregiordanelli',
        repo: 'questions_md'
    });

    return ({
        paths: paths.slice(0, 1),
        fallback: 'blocking'
    });
};
