import { postClient } from 'services/client/post'
import { tokenForTest } from 'lib/utils'
import { Customer } from '@prisma/client'
import { deleteClient } from 'services/client/delete'
import { getClient } from 'services/client/get'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll, CustomerWithNotebooks } from 'lib/types'
import _ from 'lodash'

jest.setTimeout(30000)

describe('API real', () => {
  const _username = 'customer'
  let _customer: Customer = {
    id: 0,
    userId: '',
    username: _username,
  }

  let _notebook: NotebookWithTopicsAndSubTopics = {
    customerId: 0,
    id: 0,
    tag: 'notebook-create',
    description: 'Description',
    price: 1,
    name: 'Name',
    topics: [
      {
        id: 0,
        notebookId: 0,
        name: 'topic',
        subtopics: [
          {
            id: 0,
            topicId: 0,
            name: 'subtopic 1',
          },
          {
            id: 0,
            topicId: 0,
            name: 'subtopic 2',
          },
        ],
      },
    ],
  }

  let _question: QuestionWithAll = {
    id: 0,
    tag: 'question-create',
    question: 'question',
    notebookId: 0,
    subTopic: {
      id: 0,
      name: '',
      topicId: 0,
    },
    subTopicId: 0,
    solution: 'solution',
    title: 'title',
    alternatives: [
      {
        id: 0,
        alternative: 'alternative a',
        questionId: 0,
      },
      {
        id: 1,
        alternative: 'alternative b',
        questionId: 0,
      },
      {
        id: 2,
        alternative: 'alternative c',
        questionId: 0,
      },
    ],
    rightAlternative: {
      id: 0,
      alternativeId: 1,
      questionId: 0,
    },
  }

  it('Create customer', async () => {
    const customer = await postClient<Customer>(_customer, [], tokenForTest)

    expect(customer.username).toBe(_username)

    _customer = customer
  })

  it('Get customer', async () => {
    const customer = await getClient<Customer>([`${_username}`])

    expect(customer.username).toBe(_username)

    _customer = customer
  })

  it('Update customer', async () => {
    const _newUsername = 'new-customer'
    _customer.username = _newUsername
    const customer = await postClient<Customer>(_customer, [], tokenForTest)

    expect(customer.username).toBe(_newUsername)

    _customer = customer
  })

  it('Create notebook', async () => {
    _notebook.customerId = _customer.id
    const notebook = await postClient<NotebookWithTopicsAndSubTopics>(
      _notebook,
      [_customer.username],
      tokenForTest
    )

    expect(notebook.tag).toBe(_notebook.tag)

    expect(notebook.price).toBe(_notebook.price)

    expect(notebook.name).toBe(_notebook.name)

    expect(notebook.description).toBe(_notebook.description)

    expect(notebook.topics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: _notebook.topics[0].name,
        }),
      ])
    )

    expect(notebook.topics[0].subtopics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: _notebook.topics[0].subtopics[0].name,
        }),
        expect.objectContaining({
          name: _notebook.topics[0].subtopics[1].name,
        }),
      ])
    )

    _notebook = notebook
  })

  it('Get notebook', async () => {
    const _notebookTag = _notebook.tag
    const notebook = await getClient<NotebookWithTopicsAndSubTopics>([
      _customer.username,
      _notebook.tag,
    ])

    expect(notebook.tag).toBe(_notebookTag)

    _notebook = notebook
  })

  it('Update notebook', async () => {
    const _newNotebook = _.clone(_notebook)
    _newNotebook.tag = 'notebook-update'
    _newNotebook.description = 'new description'
    _newNotebook.name = 'new name'
    _newNotebook.price = 2
    _newNotebook.topics = [
      ..._newNotebook.topics,
      {
        id: 0,
        name: 'new topic',
        notebookId: 0,
        subtopics: [
          {
            id: 0,
            name: 'new subtopic',
            topicId: 0,
          },
        ],
      },
      {
        id: 0,
        name: 'new topic 2',
        notebookId: 0,
        subtopics: [
          {
            id: 0,
            name: 'new subtopic 1',
            topicId: 0,
          },
          {
            id: 0,
            name: 'new subtopic 2',
            topicId: 0,
          },
          {
            id: 0,
            name: 'new subtopic 3',
            topicId: 0,
          },
        ],
      },
    ]

    const notebook = await postClient<NotebookWithTopicsAndSubTopics>(
      _newNotebook,
      [_customer.username],
      tokenForTest
    )

    expect(notebook.tag).toBe(_newNotebook.tag)

    expect(notebook.price).toBe(_newNotebook.price)

    expect(notebook.name).toBe(_newNotebook.name)

    expect(notebook.description).toBe(_newNotebook.description)

    expect(notebook.topics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: _newNotebook.topics[0].name,
        }),
        expect.objectContaining({
          name: _newNotebook.topics[1].name,
        }),
        expect.objectContaining({
          name: _newNotebook.topics[2].name,
        }),
      ])
    )

    expect(notebook.topics[0].subtopics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: _newNotebook.topics[0].subtopics[0].name,
        }),
        expect.objectContaining({
          name: _newNotebook.topics[0].subtopics[1].name,
        }),
      ])
    )

    expect(notebook.topics[1].subtopics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: _newNotebook.topics[1].subtopics[0].name,
        }),
      ])
    )

    expect(notebook.topics[2].subtopics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: _newNotebook.topics[2].subtopics[0].name,
        }),
        expect.objectContaining({
          name: _newNotebook.topics[2].subtopics[1].name,
        }),
        expect.objectContaining({
          name: _newNotebook.topics[2].subtopics[2].name,
        }),
      ])
    )

    _notebook = notebook
  })

  it('Create question', async () => {
    _question.notebookId = _notebook.id
    _question.subTopicId = _notebook.topics[0].subtopics[0].id

    const question = await postClient<QuestionWithAll>(
      _question,
      [_customer.username, _notebook.tag],
      tokenForTest
    )

    expect(question.tag).toBe(_question.tag)
    expect(question.solution).toBe(_question.solution)
    expect(question.title).toBe(_question.title)
    expect(question.subTopic.id).toBe(_question.subTopicId)

    expect(question.alternatives).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alternative: _question.alternatives[0].alternative,
        }),
        expect.objectContaining({
          alternative: _question.alternatives[1].alternative,
        }),
        expect.objectContaining({
          alternative: _question.alternatives[2].alternative,
        }),
      ])
    )

    if (_question.rightAlternative.alternativeId) {
      const alternative = question.alternatives.find(
        (x) => x.id == question.rightAlternative.alternativeId
      ).alternative

      const alternativeExpected = _question.alternatives.find(
        (x) => x.id == _question.rightAlternative.alternativeId
      ).alternative

      expect(alternative).toBe(alternativeExpected)
    }

    _question = question
  })

  it('Update question', async () => {
    const _newQuestion = _.clone(_question)
    _newQuestion.tag = 'question-update'
    _newQuestion.solution = 'new solution'
    _newQuestion.title = 'new name'
    _newQuestion.alternatives = [
      ..._newQuestion.alternatives,
      {
        id: -1,
        alternative: 'alternative d',
        questionId: 0,
      },
      {
        id: -2,
        alternative: 'alternative e',
        questionId: 0,
      },
    ]
    _newQuestion.rightAlternative.alternativeId = -1

    const question = await postClient<QuestionWithAll>(
      _newQuestion,
      [_customer.username, _notebook.tag],
      tokenForTest
    )

    expect(question.tag).toBe(_newQuestion.tag)
    expect(question.solution).toBe(_newQuestion.solution)
    expect(question.title).toBe(_newQuestion.title)
    expect(question.subTopic.id).toBe(_newQuestion.subTopicId)

    expect(question.alternatives).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          alternative: _newQuestion.alternatives[0].alternative,
        }),
        expect.objectContaining({
          alternative: _newQuestion.alternatives[1].alternative,
        }),
        expect.objectContaining({
          alternative: _newQuestion.alternatives[2].alternative,
        }),
        expect.objectContaining({
          alternative: _newQuestion.alternatives[3].alternative,
        }),
        expect.objectContaining({
          alternative: _newQuestion.alternatives[4].alternative,
        }),
      ])
    )

    if (_newQuestion.rightAlternative?.alternativeId && question.rightAlternative?.alternativeId) {
      const alternativeReceived = question.alternatives.find(
        (x) => x.id == question.rightAlternative.alternativeId
      ).alternative

      const alternativeExpected = _newQuestion.alternatives.find(
        (x) => x.id == _newQuestion.rightAlternative.alternativeId
      ).alternative

      expect(alternativeExpected).toBe(alternativeReceived)
    } else {
      expect(question.rightAlternative).toBe(_newQuestion.rightAlternative)
    }

    _question = question
  })

  it('Get customer with Notebooks', async () => {
    const customer = await getClient<CustomerWithNotebooks>([
      `${_customer.username}?notebooks=true`,
    ])

    expect(customer.username).toBe(_customer.username)

    expect(customer.notebooks[0].tag).toBe(_notebook.tag)

    _customer = customer
  })

  it('Delete question', async () => {
    const nRows = await deleteClient(
      [_customer.username, _notebook.tag, _question.tag],
      tokenForTest
    )

    expect(nRows).toBe(1)

    _question = null
  })

  it('Delete notebook', async () => {
    const nRows = await deleteClient([_customer.username, _notebook.tag], tokenForTest)

    expect(nRows).toBe(1)

    _notebook = null
  })

  it('Delete customer', async () => {
    const nRows = await deleteClient([_customer.username], tokenForTest)

    expect(nRows).toBe(1)

    _customer = null
  })
})
