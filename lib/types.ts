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

export type MyNotebooks = (Subscriber & {
  notebook: Notebook & {
    customer: Customer & {
      Media: Media
    }
    Media: Media
  }
})[]

export type MenuWithQuestions = Topic & {
  SubTopic: (SubTopic & {
    QuestionSubTopic: (QuestionSubTopic & {
      Question: {
        id: number
        tag: string
        name: string
        RightAlternative: {
          alternativeId: number
        }[]
      }
    })[]
  })[]
  Notebook: {
    tag: string
  }
}

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
  Media: Media
  Topics: (Topic & {
    SubTopics: SubTopic[]
  })[]
}

export type Path = {
  params: {
    slug: string[]
  }
}

export type MediaWithUrl = {
  url: string
} & Media
