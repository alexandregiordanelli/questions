import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { getCustomerByTag, getCustomerNotebooksByTag } from 'services/server/getCustomer'
import { getNotebookByTags } from 'services/server/getNotebook'
import { getQuestionByTags } from 'services/server/getQuestion'

import {
  CustomerWithNotebooks,
  NotebookWithTopicsAndSubTopics,
  QuestionWithAll,
  MenuWithQuestions,
  Suggestions,
} from 'lib/types'
import { Customer } from '@prisma/client'
import { useRouter } from 'next/router'
import { useAmp } from 'next/amp'
import HeadHtml from 'components/HeadHtml'
import { urlEnv, ampCanonicalUrl } from 'lib/utils'
import { Header } from 'components/Header'
import getMenu from 'services/server/getMenu'
import { LeftMenu } from 'components/Pages/Notebook/LeftMenu'
import { QuestionFormWithRightMenu } from 'components/Pages/Notebook/QuestionFormWithRightMenu'
import getSuggestions from 'services/server/getSuggestions'
import { useData } from 'services/client/get'
import { NotebookCard } from 'components/NotebookCard'

type CustomerPageProps = {
  customer: CustomerWithNotebooks
}

type NotebookPageProps = {
  customer: Customer
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions
}

type QuestionPageProps = {
  suggestions: Suggestions
  question: QuestionWithAll
} & NotebookPageProps

type PageProps = CustomerPageProps | NotebookPageProps | QuestionPageProps

const CustomerPage: React.FC<CustomerPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  const { data: customer } = useData<CustomerWithNotebooks>(
    `/api/${props.customer.tag}?notebooks=true`,
    props.customer
  )
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>

      <div
        className="flex min-h-screen bg-gray-100 flex-col"
        // style={{ backgroundImage: `url("/graph-paper.svg")` }}
      >
        <Header />
        <div className=" bg-white border-t border-b">
          <h1 className="text-xl font-medium text-black my-8 ml-8">{customer.tag}</h1>
        </div>
        <div className="flex flex-wrap">
          {props.customer.notebooks.map((x, i) => (
            <NotebookCard notebook={x} key={i} customerTag={props.customer.tag} className="m-8" />
          ))}
        </div>
      </div>
    </>
  )
}

const NotebookPage: React.FC<NotebookPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>

      <Header />
      <div className=" bg-white border-t border-b">
        <div className="max-w-screen-lg mx-auto items-center">
          <h1 className="text-xl font-medium text-black my-8">{props.notebook.name}</h1>
        </div>
      </div>
      <div className="bg-gray-50 shadow-inner">
        <div className="flex max-w-screen-lg mx-auto">
          <p className="py-8 pr-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis laoreet magna,
            eget molestie urna mollis et. In lorem arcu, cursus sed felis non, porttitor fringilla
            lectus. Phasellus pretium suscipit luctus. Proin iaculis elit nisl, quis elementum ex
            consequat et. Integer posuere ipsum et sem egestas, et vulputate enim aliquam. Donec vel
            maximus nisl. Curabitur id tempor magna. Mauris feugiat orci vehicula risus eleifend
            venenatis. Curabitur quis turpis faucibus, interdum nisl tempor, sagittis lectus. Proin
            at eros in arcu mattis ullamcorper vitae sed elit. Pellentesque habitant morbi tristique
            senectus et netus et malesuada fames ac turpis egestas. Integer facilisis diam vitae
            risus rutrum, in sollicitudin urna mollis. Pellentesque eleifend augue lacinia, posuere
            elit sit amet, imperdiet neque. Maecenas at hendrerit magna, vitae lobortis arcu.
            Aliquam non porta lacus, et efficitur erat. Nam non nisi quis purus ullamcorper
            tristique ut bibendum lorem. Duis lacinia, neque et mollis tincidunt, orci lectus
            laoreet tellus, at posuere ipsum urna vitae erat. Duis tincidunt dapibus accumsan. Cras
            hendrerit nisl eu sapien rutrum elementum. Quisque aliquam est a volutpat vulputate.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed eu est eget sapien
            tristique dapibus in ac nisl. Nullam tempor malesuada faucibus. Phasellus rutrum urna
            nec vehicula vehicula. Quisque et ullamcorper lacus, eget ornare neque. Nunc nec massa
            hendrerit, mattis mauris sit amet, rutrum sapien. Suspendisse ut libero neque. Nulla
            pretium magna quis porttitor ullamcorper. Nam lacinia elit augue, at cursus mi fermentum
            id. Suspendisse ultricies eget arcu non scelerisque. Cras eget pharetra turpis. Donec
            scelerisque pharetra viverra. Pellentesque pulvinar sem in congue rutrum. Duis
            scelerisque, augue quis aliquam faucibus, quam felis interdum nunc, non feugiat sapien
            augue id est. Quisque eleifend congue hendrerit. Donec eget ligula elementum, suscipit
            augue vel, imperdiet tortor. Maecenas dui nulla, pulvinar gravida blandit id, finibus
            venenatis leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Vestibulum vehicula turpis quam, sed volutpat lorem suscipit id. Nulla
            nec turpis metus. Vestibulum tempus, quam sed tempus imperdiet, urna tortor ultricies
            augue, nec condimentum metus lectus sit amet tortor. Etiam consequat ultricies rutrum.
            Aliquam erat volutpat. Maecenas vitae ultrices enim. Morbi id auctor mi, a condimentum
            est. Sed ligula turpis, imperdiet elementum feugiat at, rhoncus sed turpis. Aliquam id
            laoreet lectus. Integer euismod tellus pulvinar libero condimentum cursus. Pellentesque
            eleifend velit vel auctor commodo.
          </p>
          <div>
            <div className="sticky top-24 transform -translate-y-8">
              <NotebookCard
                notebook={props.notebook}
                customerTag={props.customer.tag}
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const QuestionPage: React.FC<QuestionPageProps> = (props) => {
  const router = useRouter()
  const isAmp = useAmp()
  const { data: customer } = useData<Customer>(`/api/${props.customer.tag}`, props.customer)
  const { data: notebook } = useData<NotebookWithTopicsAndSubTopics>(
    `/api/${props.customer.tag}/${props.notebook.tag}`,
    props.notebook
  )
  const { data: question } = useData<QuestionWithAll>(
    `/api/${props.customer.tag}/${props.notebook.tag}/${props.question.tag}`,
    props.question
  )
  return (
    <>
      <HeadHtml>
        <link
          rel={isAmp ? 'canonical' : 'amphtml'}
          href={`${urlEnv}${ampCanonicalUrl(isAmp, router.asPath)}`}
        />
      </HeadHtml>

      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex">
          <LeftMenu menu={props.menu} notebookTag={notebook.tag} customerTag={customer.tag} />
          <QuestionFormWithRightMenu
            question={question}
            suggestions={props.suggestions}
            notebookTag={notebook.tag}
            customerTag={customer.tag}
          />
        </div>
      </div>
    </>
  )
}

export const Page: NextPage<PageProps> = (props) => {
  if ('question' in props) {
    return (
      <QuestionPage
        customer={props.customer}
        notebook={props.notebook}
        menu={props.menu}
        suggestions={props.suggestions}
        question={props.question}
      />
    )
  } else if ('notebook' in props) {
    return <NotebookPage customer={props.customer} notebook={props.notebook} menu={props.menu} />
  } else if ('customer' in props) {
    return <CustomerPage customer={props.customer} />
  } else return null
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  try {
    const tags = context.params.tags as string[]

    const [customerTag, notebookTag, questionTag] = tags

    if (tags.length == 1) {
      const customer = await getCustomerNotebooksByTag(customerTag)

      if (customer) {
        return {
          props: {
            customer,
          },
          revalidate: 1,
        }
      }
    } else if (tags.length == 2) {
      const customer = await getCustomerByTag(customerTag)
      const notebook = await getNotebookByTags(customerTag, notebookTag)
      const menu = await getMenu(notebookTag)

      if (customer && notebook) {
        return {
          props: {
            customer,
            notebook,
            menu,
          },
          revalidate: 1,
        }
      }
    } else if (tags.length == 3) {
      const customer = await getCustomerByTag(customerTag)
      const notebook = await getNotebookByTags(customerTag, notebookTag)
      const question = await getQuestionByTags(customerTag, notebookTag, questionTag)

      if (customer && notebook && question) {
        const menu = await getMenu(notebookTag)
        const suggestions = await getSuggestions(notebookTag, question.subTopicId)

        return {
          props: {
            customer,
            notebook,
            menu,
            suggestions,
            question,
          },
          revalidate: 1,
        }
      }
    }

    return {
      notFound: true,
    }
  } catch (e) {
    console.log(e)
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export default Page
