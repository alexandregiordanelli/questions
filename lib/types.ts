import { Notebook, Topic, SubTopic, Alternative, Question, RightAlternative } from '@prisma/client'

export type MenuWithQuestions = (Topic & {
  subtopics: (SubTopic & {
    questions: {
      tag: string
    }[]
  })[]
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
}[]

export type NotebookWithTopicsAndSubTopics = Notebook & {
  topics: (Topic & {
    subtopics: SubTopic[]
  })[]
}

export type PagesProps = {
  notebook: NotebookWithTopicsAndSubTopics
  menu: MenuWithQuestions
  question?: QuestionWithAll
  suggestions?: Suggestions
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
