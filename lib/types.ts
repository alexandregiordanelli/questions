import {
  Notebook,
  Topic,
  SubTopic,
  Alternative,
  Question,
  RightAlternative,
  Customer,
  Media,
} from '@prisma/client'

export type Menu = {
  items: {
    name: string
    url?: string
    subItems?: {
      name: string
      url: string
    }[]
  }[]
}

export type MenuWithQuestions = (Topic & {
  subtopics: (SubTopic & {
    questions: {
      id: number
      tag: string
      rightAlternative: {
        alternativeId: number
      }
    }[]
  })[]
  notebook: {
    tag: string
  }
})[]
export type QuestionWithAll = Question & {
  alternatives: Alternative[]
  rightAlternative: RightAlternative
  subTopic: SubTopic
  notebook?: {
    name: string
    tag: string
    customerId: number
  }
}
export type Suggestions = {
  id: number
  tag: string
  name: string
}[]

export type CustomerWithNotebooks = Customer & { media: Media } & {
  notebooks: (Notebook & {
    media: Media
  })[]
}

export type NotebookWithTopicsAndSubTopics = Notebook & {
  media: Media
  topics: (Topic & {
    subtopics: SubTopic[]
  })[]
}

export type Path = {
  params: {
    slug: string[]
  }
}

export type DataBaseHook<T> = {
  data: T
  isLoading: boolean
  isError: Record<string, unknown>
}
export type MediaWithUrl = {
  url: string
} & Media
