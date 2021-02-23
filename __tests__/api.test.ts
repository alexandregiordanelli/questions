import { postClient } from 'services/client/post'
import { tokenForTest } from 'lib/utils'
import { Customer } from '@prisma/client'
import { deleteClient } from 'services/client/delete'
import { getClient } from 'services/client/get'
import { NotebookWithTopicsAndSubTopics, QuestionWithAll, CustomerWithNotebooks } from 'lib/types'
import _ from 'lodash'

jest.setTimeout(30000)

describe('API real', () => {
  const _tag = 'customer'
  let _customer: Customer = {
    id: 0,
    userId: '',
    tag: _tag,
    createdAt: null,
    updatedAt: null,
  }

  let _notebook: NotebookWithTopicsAndSubTopics = {
    customerId: 0,
    id: 0,
    tag: 'notebook-create',
    text: 'Description',
    price: 24.4,
    name: 'Name',
    createdAt: null,
    updatedAt: null,
    topics: [
      {
        id: 0,
        notebookId: 0,
        name: 'topic',
        createdAt: null,
        updatedAt: null,
        subtopics: [
          {
            id: 0,
            topicId: 0,
            name: 'subtopic 1',
            createdAt: null,
            updatedAt: null,
          },
          {
            id: 0,
            topicId: 0,
            name: 'subtopic 2',
            createdAt: null,
            updatedAt: null,
          },
        ],
      },
    ],
  }

  let _question: QuestionWithAll = {
    id: 0,
    tag: 'question-create',
    text: 'question',
    notebookId: 0,
    createdAt: null,
    updatedAt: null,
    subTopic: {
      id: 0,
      name: '',
      topicId: 0,
      createdAt: null,
      updatedAt: null,
    },
    subTopicId: 0,
    solution: 'solution',
    name: 'title',
    alternatives: [
      {
        id: 0,
        text: 'alternative a',
        questionId: 0,
        createdAt: null,
        updatedAt: null,
      },
      {
        id: 1,
        text: 'alternative b',
        questionId: 0,
        createdAt: null,
        updatedAt: null,
      },
      {
        id: 2,
        text: 'alternative c',
        questionId: 0,
        createdAt: null,
        updatedAt: null,
      },
    ],
    rightAlternative: {
      id: 0,
      alternativeId: 1,
      questionId: 0,
      createdAt: null,
      updatedAt: null,
    },
  }

  it('Create customer', async () => {
    const customer = await postClient<Customer>(_customer, '/api', tokenForTest)

    expect(customer.tag).toBe(_tag)

    _customer = customer
  })

  it('Get customer', async () => {
    const customer = await getClient<Customer>(`/api/${_tag}`)

    expect(customer.tag).toBe(_tag)

    _customer = customer
  })

  it('Update customer', async () => {
    const _newtag = 'new-customer'
    _customer.tag = _newtag
    const customer = await postClient<Customer>(_customer, '/api', tokenForTest)

    expect(customer.tag).toBe(_newtag)

    _customer = customer
  })

  it('Create notebook', async () => {
    _notebook.customerId = _customer.id
    const notebook = await postClient<NotebookWithTopicsAndSubTopics>(
      _notebook,
      `/api/${_customer.tag}`,
      tokenForTest
    )

    expect(notebook.tag).toBe(_notebook.tag)

    expect(notebook.price).toBe(_notebook.price)

    expect(notebook.name).toBe(_notebook.name)

    expect(notebook.text).toBe(_notebook.text)

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
    const notebook = await getClient<NotebookWithTopicsAndSubTopics>(
      `/api/${_customer.tag}/${_notebook.tag}`
    )

    expect(notebook.tag).toBe(_notebookTag)

    _notebook = notebook
  })

  it('Update notebook', async () => {
    const _newNotebook = _.clone(_notebook)
    _newNotebook.tag = 'notebook-update'
    _newNotebook.text = 'new description'
    _newNotebook.name = 'new name'
    _newNotebook.price = 2.21
    _newNotebook.topics = [
      ..._newNotebook.topics,
      {
        id: 0,
        name: 'new topic',
        notebookId: 0,
        createdAt: null,
        updatedAt: null,
        subtopics: [
          {
            id: 0,
            name: 'new subtopic',
            topicId: 0,
            createdAt: null,
            updatedAt: null,
          },
        ],
      },
      {
        id: 0,
        name: 'new topic 2',
        notebookId: 0,
        createdAt: null,
        updatedAt: null,
        subtopics: [
          {
            id: 0,
            name: 'new subtopic 1',
            topicId: 0,
            createdAt: null,
            updatedAt: null,
          },
          {
            id: 0,
            name: 'new subtopic 2',
            topicId: 0,
            createdAt: null,
            updatedAt: null,
          },
          {
            id: 0,
            name: 'new subtopic 3',
            topicId: 0,
            createdAt: null,
            updatedAt: null,
          },
        ],
      },
    ]

    const notebook = await postClient<NotebookWithTopicsAndSubTopics>(
      _newNotebook,
      `/api/${_customer.tag}`,
      tokenForTest
    )

    expect(notebook.tag).toBe(_newNotebook.tag)

    expect(notebook.price).toBe(_newNotebook.price)

    expect(notebook.name).toBe(_newNotebook.name)

    expect(notebook.text).toBe(_newNotebook.text)

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
      `/api/${_customer.tag}/${_notebook.tag}`,
      tokenForTest
    )

    expect(question.tag).toBe(_question.tag)
    expect(question.solution).toBe(_question.solution)
    expect(question.name).toBe(_question.name)
    expect(question.subTopic.id).toBe(_question.subTopicId)

    expect(question.alternatives).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: _question.alternatives[0].text,
        }),
        expect.objectContaining({
          text: _question.alternatives[1].text,
        }),
        expect.objectContaining({
          text: _question.alternatives[2].text,
        }),
      ])
    )

    if (_question.rightAlternative.alternativeId) {
      const alternative = question.alternatives.find(
        (x) => x.id == question.rightAlternative.alternativeId
      ).text

      const alternativeExpected = _question.alternatives.find(
        (x) => x.id == _question.rightAlternative.alternativeId
      ).text

      expect(alternative).toBe(alternativeExpected)
    }

    _question = question
  })

  it('Update question', async () => {
    const _newQuestion = _.clone(_question)
    _newQuestion.tag = 'question-update'
    _newQuestion.solution = 'new solution'
    _newQuestion.name = 'new name'
    _newQuestion.alternatives = [
      ..._newQuestion.alternatives,
      {
        id: -1,
        text: 'alternative d',
        questionId: 0,
        createdAt: null,
        updatedAt: null,
      },
      {
        id: -2,
        text: 'alternative e',
        questionId: 0,
        createdAt: null,
        updatedAt: null,
      },
    ]
    _newQuestion.rightAlternative.alternativeId = -1

    const question = await postClient<QuestionWithAll>(
      _newQuestion,
      `/api/${_customer.tag}/${_notebook.tag}`,
      tokenForTest
    )

    expect(question.tag).toBe(_newQuestion.tag)
    expect(question.solution).toBe(_newQuestion.solution)
    expect(question.name).toBe(_newQuestion.name)
    expect(question.subTopic.id).toBe(_newQuestion.subTopicId)

    expect(question.alternatives).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: _newQuestion.alternatives[0].text,
        }),
        expect.objectContaining({
          text: _newQuestion.alternatives[1].text,
        }),
        expect.objectContaining({
          text: _newQuestion.alternatives[2].text,
        }),
        expect.objectContaining({
          text: _newQuestion.alternatives[3].text,
        }),
        expect.objectContaining({
          text: _newQuestion.alternatives[4].text,
        }),
      ])
    )

    if (_newQuestion.rightAlternative?.alternativeId && question.rightAlternative?.alternativeId) {
      const alternativeReceived = question.alternatives.find(
        (x) => x.id == question.rightAlternative.alternativeId
      ).text

      const alternativeExpected = _newQuestion.alternatives.find(
        (x) => x.id == _newQuestion.rightAlternative.alternativeId
      ).text

      expect(alternativeExpected).toBe(alternativeReceived)
    } else {
      expect(question.rightAlternative).toBe(_newQuestion.rightAlternative)
    }

    _question = question
  })

  it('Get customer with Notebooks', async () => {
    const customer = await getClient<CustomerWithNotebooks>(`/api/${_customer.tag}?notebooks=true`)

    expect(customer.tag).toBe(_customer.tag)

    expect(customer.notebooks[0].tag).toBe(_notebook.tag)

    _customer = customer
  })

  it('Delete question', async () => {
    const nRows = await deleteClient(
      `/api/${[_customer.tag, _notebook.tag, _question.tag].join('/')}`,
      tokenForTest
    )

    expect(nRows).toBe(1)

    _question = null
  })

  it('Delete notebook', async () => {
    const nRows = await deleteClient(
      `/api/${[_customer.tag, _notebook.tag].join('/')}`,
      tokenForTest
    )

    expect(nRows).toBe(1)

    _notebook = null
  })

  it('Delete customer', async () => {
    const nRows = await deleteClient(`/api/${[_customer.tag].join('/')}`, tokenForTest)

    expect(nRows).toBe(1)

    _customer = null
  })
})
