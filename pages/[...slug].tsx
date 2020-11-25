import { QuestionPage } from '../components/QuestionPage/QuestionPage'
import { QuestionPageStaticPaths } from '../components/QuestionPage/QuestionPageStaticPaths'
import { QuestionPageStaticProps } from '../components/QuestionPage/QuestionPageStaticProps'

export default QuestionPage

export const getStaticPaths = QuestionPageStaticPaths

export const getStaticProps = QuestionPageStaticProps

export const config = { amp: true}