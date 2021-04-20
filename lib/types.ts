import { definitions } from './types2'

export type Alternative = definitions['Alternative']
export type Notebook = definitions['Notebook']
export type Topic = definitions['Topic']
export type SubTopic = definitions['SubTopic']

export type Question = definitions['Question']
export type RightAlternative = definitions['RightAlternative']

export type Customer = definitions['Customer']
export type Media = definitions['Media']
export type Subscriber = definitions['Subscriber']
export type QuestionSubTopic = definitions['QuestionSubTopic']

export type ChosenAlternative = definitions['ChosenAlternative']

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

export type CustomerWithNotebooks = Customer & { Media: Media } & {
  notebooks: (Notebook & {
    Media: Media
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
