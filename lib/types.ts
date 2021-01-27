import {
  Notebook,
  Topic,
  SubTopic,
  Alternative,
  Question,
  RightAlternative,
  Customer,
} from '@prisma/client'

export type MenuWithQuestions = (Topic & {
  subtopics: (SubTopic & {
    questions: {
      tag: string
    }[]
  })[]
})[]
export type QuestionWithAll = Question & {
  alternatives: Alternative[]
  rightAlternative: RightAlternative
  subTopic: SubTopic
}
export type Suggestions = {
  tag: string
  title: string
}[]

export type CustomerWithNotebooks = Customer & {
  notebooks: Notebook[]
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
export type CustomerHook = {
  customer: Customer
} & DataBaseHook

export type NotebookHook = {
  notebook: NotebookWithTopicsAndSubTopics
} & DataBaseHook

export type QuestionHook = {
  question: QuestionWithAll
} & DataBaseHook

export type CustomerWithNotebooksHook = {
  customer: CustomerWithNotebooks
} & DataBaseHook

export type DataBaseHook = {
  isLoading: boolean
  isError: any
}
