export type Menu = {
    title: string
    topics: Topic[]
};
export type Topic = {
    title: string
    topic: string
    url: string
};
export type Question = {
    file: string
    title: string
    url: string
    topic: string;
    content?: string
    absolutUrl?: string
};
export type Nav = {
    menu: Menu[]
    questions: Question[]
}
export type Notebook = {
    name: string
    files: string[]
}

export type GitHub = {
    username: string
    repo: string
}

export type Path = {
    params: {
        slug: string[]
    }
}

export type QuestionParsed = {
    question: string
    solution: string
    options: string[]
    answer: number
}
