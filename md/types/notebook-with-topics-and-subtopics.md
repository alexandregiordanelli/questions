# NotebookWithTopicsAndSubTopics

```typescript
type NotebookWithTopicsAndSubTopics = Notebook & {
  media: Media
  topics: (Topic & {
    subtopics: SubTopic[]
  })[]
}
```