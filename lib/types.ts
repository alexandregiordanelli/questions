import {
  Notebook,
  Topic,
  SubTopic,
  Alternative,
  Question,
  RightAlternative,
  Customer,
} from '@prisma/client'
import { SessionBase } from 'next-auth/_utils'

export type SessionWithCustomer = {
  customer?: Customer
} & SessionBase
export type MenuWithQuestions = (Topic & {
  subtopics: (SubTopic & {
    questions: {
      tag: string
    }[]
  })[]
  notebook: {
    tag: string
  }
})[]
export type QuestionWithAll = Question & {
  notebook: Notebook
  alternatives: Alternative[]
  rightAlternative: RightAlternative
  subTopic: SubTopic
}
export type Suggestions = {
  tag: string
  title: string
  notebook: {
    tag: string
  }
}[]

export type CustomerWithNotebooks = Customer & {
  notebooks: NotebookWithTopicsAndSubTopics[]
}

export type CustomerWithNotebook = Customer & {
  notebook: NotebookWithTopicsAndSubTopics
}

export type NotebookWithTopicsAndSubTopics = Notebook & {
  topics: (Topic & {
    subtopics: SubTopic[]
  })[]
}

export type Path = {
  params: {
    slug: string[]
  }
}

export enum Env {
  development = 'development',
  preview = 'preview',
  production = 'production',
}
