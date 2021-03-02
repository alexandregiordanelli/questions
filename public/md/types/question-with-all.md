# QuestionWithAll 
```typescript
type QuestionWithAll = Question & {
  alternatives: Alternative[]
  rightAlternative: RightAlternative
  subTopic: SubTopic
  notebook?: {
    name: string
    tag: string
  }
}
```