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
  notebook?: {
    name: string
    tag: string
  }
}
export type Suggestions = {
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
