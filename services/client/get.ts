import { urlEnv } from 'lib/utils'
import fetch from 'node-fetch'
import useSWR from 'swr'
import { Customer } from '@prisma/client'
import {
  NotebookWithTopicsAndSubTopics,
  QuestionWithAll,
  CustomerWithNotebooks,
  CustomerHook,
  CustomerWithNotebooksHook,
  NotebookHook,
  QuestionHook,
} from 'lib/types'
export const getClient = async <T>(_tags: string[]): Promise<T> => {
  try {
    const response = await fetch(`${urlEnv}/api/${_tags.join('/')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const res: T = await response.json()
      return res
    } else {
      throw new Error(await response.text())
    }
  } catch (e) {
    console.log(e.message)
  }
}

export const fetcher = <T>(url: string): Promise<T> => fetch(url).then((r) => r.json())

export const useCustomer = (_customer: Customer): CustomerHook => {
  const { data, error } = useSWR<Customer>(`/api/${_customer.username}`, fetcher, {
    initialData: _customer,
  })

  return {
    customer: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useCustomerWithNotebooks = (
  _customer: CustomerWithNotebooks
): CustomerWithNotebooksHook => {
  const { data, error } = useSWR<CustomerWithNotebooks>(
    `/api/${_customer.username}?notebooks`,
    fetcher,
    {
      initialData: _customer,
    }
  )

  return {
    customer: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useNotebook = (
  _customerTag: string,
  _notebook: NotebookWithTopicsAndSubTopics
): NotebookHook => {
  const { data, error } = useSWR<NotebookWithTopicsAndSubTopics>(
    `/api/${_customerTag}/${_notebook.tag}`,
    fetcher,
    {
      initialData: _notebook,
    }
  )

  return {
    notebook: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const useQuestion = (
  _customerTag: string,
  _notebookTag: string,
  _question: QuestionWithAll
): QuestionHook => {
  const { data, error } = useSWR<QuestionWithAll>(
    `/api/${_customerTag}/${_notebookTag}/${_question.tag}`,
    fetcher,
    {
      initialData: _question,
    }
  )

  return {
    question: data,
    isLoading: !error && !data,
    isError: error,
  }
}
