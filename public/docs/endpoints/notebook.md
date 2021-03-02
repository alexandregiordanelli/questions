# Notebook

```
POST https://questionsof.com/api/{customerTag}
```

```typescript
type NotebookWithTopicsAndSubTopics = Notebook & {
  media: Media
  topics: (Topic & {
    subtopics: SubTopic[]
  })[]
}
```


```
{
    customerId: 0,
    id: 0,
    tag: 'notebook-create',
    text: 'Description',
    price: 24.4,
    name: 'Name',
    createdAt: null,
    updatedAt: null,
    mediaId: 0,
    media: null,
    topics: [
      {
        id: 0,
        notebookId: 0,
        name: 'topic',
        createdAt: null,
        updatedAt: null,
        order: 0,
        subtopics: [
          {
            id: 0,
            topicId: 0,
            name: 'subtopic 1',
            createdAt: null,
            updatedAt: null,
            order: 0,
          },
          {
            id: 0,
            topicId: 0,
            name: 'subtopic 2',
            createdAt: null,
            updatedAt: null,
            order: 0,
          },
        ],
      },
    ],
  }
```