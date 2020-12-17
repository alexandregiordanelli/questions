import { Pages } from '../components/Pages/Pages'
import { PagesStaticPaths } from '../components/Pages/PagesStaticPaths'
import { PagesStaticProps } from '../components/Pages/PagesStaticProps'

export default Pages

export const getStaticPaths = PagesStaticPaths

export const getStaticProps = PagesStaticProps