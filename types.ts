export type Menu = {
    title: string;
    topics: Topic[];
};
export type Topic = {
    title: string;
    topic: string;
    url: string;
};
export type Question = {
    file: string;
    title: string;
    url: string;
    topic: string;
    content?: string;
    absolutUrl?: string;
};
export type Nav = {
    menu: Menu[]
    questions: Question[]
}
