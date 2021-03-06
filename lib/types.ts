import {
  Notebook,
  Topic,
  SubTopic,
  Alternative,
  Question,
  RightAlternative,
  Customer,
  Media,
  Subscriber,
  QuestionSubTopic,
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

export type MyNotebooks = (Subscriber & {
  notebook: Notebook & {
    customer: Customer & {
      media: Media
    }
    media: Media
  }
})[]

export type MenuWithQuestions = (Topic & {
  subtopics: (SubTopic & {
    questionSubTopics: (QuestionSubTopic & {
      question: {
        id: number
        tag: string
        name: string
        rightAlternative: {
          alternativeId: number
        }
      }
    })[]
  })[]
  notebook: {
    tag: string
  }
})[]

export type QuestionWithAll = Question & {
  alternatives: Alternative[]
  rightAlternative: RightAlternative
  // subTopic: SubTopic
  // notebook?: Notebook & {
  //   media: Media
  // }
}

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
