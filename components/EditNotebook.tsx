import React, { useReducer, useEffect } from 'react'
import { NotebookWithTopicsAndSubTopics } from '../lib/types'
import { SubTopic, Topic, Customer, Prisma } from '@prisma/client'
import CreatableSelect from 'react-select/creatable'
import _ from 'lodash'
import slugify from 'slugify'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { postClient } from 'services/client/post'
import { mutate } from 'swr'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
enum ActionType {
  UPDATE_SUBTOPICS,
  UPDATE_NOTEBOOK,
  UPDATE_TOPICS,
  UPDATE_DESCRIPTION,
  UPDATE_PRICE,
  UPDATE_NAME,
  UPDATE_TAG,
}

type Action =
  | {
      type: ActionType.UPDATE_TOPICS
      topics: (Topic & {
        subtopics: SubTopic[]
      })[]
    }
  | {
      type: ActionType.UPDATE_SUBTOPICS
      topicId: number
      subtopics: SubTopic[]
    }
  | {
      type: ActionType.UPDATE_NOTEBOOK
      notebook: NotebookWithTopicsAndSubTopics
    }
  | {
      type: ActionType.UPDATE_DESCRIPTION
      text: string
    }
  | {
      type: ActionType.UPDATE_PRICE
      price: number
    }
  | {
      type: ActionType.UPDATE_NAME
      name: string
    }
  | {
      type: ActionType.UPDATE_TAG
      tag: string
    }

type SelectOption = {
  label: string
  value: string
  __isNew__?: boolean
}

const initState: NotebookWithTopicsAndSubTopics = {
  id: 0,
  customerId: 0,
  text: '',
  name: '',
  price: new Prisma.Decimal(0),
  tag: '',
  topics: [],
}

const reducer = (
  state: NotebookWithTopicsAndSubTopics,
  action: Action
): NotebookWithTopicsAndSubTopics => {
  switch (action.type) {
    case ActionType.UPDATE_SUBTOPICS: {
      const newState = _.cloneDeep(state)
      const topic = newState.topics.find((x) => x.id == action.topicId)
      topic.subtopics = action.subtopics
      return newState
    }
    case ActionType.UPDATE_NOTEBOOK: {
      const newState = action.notebook
      return newState
    }
    case ActionType.UPDATE_NAME: {
      const newState = _.cloneDeep(state)
      newState.name = action.name
      return newState
    }
    case ActionType.UPDATE_TAG: {
      const newState = _.cloneDeep(state)
      newState.tag = action.tag
      return newState
    }
    case ActionType.UPDATE_PRICE: {
      const newState = _.cloneDeep(state)
      newState.price = new Prisma.Decimal(action.price)
      return newState
    }
    case ActionType.UPDATE_DESCRIPTION: {
      const newState = _.cloneDeep(state)
      newState.text = action.text
      return newState
    }
    case ActionType.UPDATE_TOPICS: {
      const newState = _.cloneDeep(state)
      newState.topics = action.topics
      return newState
    }
    default: {
      return state
    }
  }
}

const highlighted = `
# [React](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/facebook/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

React is a JavaScript library for building user interfaces.

* **Declarative:** React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using [React Native](https://reactnative.dev/).

[Learn how to use React in your own project](https://reactjs.org/docs/getting-started.html).

## Installation

React has been designed for gradual adoption from the start, and **you can use as little or as much React as you need**:

* Use [Online Playgrounds](https://reactjs.org/docs/getting-started.html#online-playgrounds) to get a taste of React.
* [Add React to a Website](https://reactjs.org/docs/add-react-to-a-website.html) as a \`<script>\` tag in one minute.
* [Create a New React App](https://reactjs.org/docs/create-a-new-react-app.html) if you're looking for a powerful JavaScript toolchain.

You can use React as a \`<script>\` tag from a [CDN](https://reactjs.org/docs/cdn-links.html), or as a \`react\` package on [npm](https://www.npmjs.com/package/react).

## Documentation

You can find the React documentation [on the website](https://reactjs.org/docs).  

Check out the [Getting Started](https://reactjs.org/docs/getting-started.html) page for a quick overview.

The documentation is divided into several sections:

* [Tutorial](https://reactjs.org/tutorial/tutorial.html)
* [Main Concepts](https://reactjs.org/docs/hello-world.html)
* [Advanced Guides](https://reactjs.org/docs/jsx-in-depth.html)
* [API Reference](https://reactjs.org/docs/react-api.html)
* [Where to Get Support](https://reactjs.org/community/support.html)
* [Contributing Guide](https://reactjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/reactjs/reactjs.org).

## Examples

We have several examples [on the website](https://reactjs.org/). Here is the first one to get you started:

\`\`\`jsx
function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('container')
);
\`\`\`

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://reactjs.org/docs/introducing-jsx.html). JSX is not required to use React, but it makes code more readable, and writing it feels like writing HTML. If you're using React as a \`<script>\` tag, read [this section](https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx) on integrating JSX; otherwise, the [recommended JavaScript toolchains](https://reactjs.org/docs/create-a-new-react-app.html) handle it automatically.

## Contributing

The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### [Code of Conduct](https://code.fb.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://reactjs.org/contributing/how-to-contribute.html)

Read our [contributing guide](https://reactjs.org/contributing/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/facebook/react/labels/good%20first%20issue) that contain bugs which have a relatively limited scope. This is a great place to get started.

### License

React is [MIT licensed](./LICENSE).
                        `

export const EditNotebook: React.FC<{
  customer: Customer
  notebook?: NotebookWithTopicsAndSubTopics
}> = (props) => {
  const initNotebook = props.notebook ? props.notebook : initState

  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, initNotebook)

  useEffect(() => {
    dispatch({ type: ActionType.UPDATE_NOTEBOOK, notebook: initNotebook })
  }, [initNotebook])

  const postNotebook = async (_notebook: NotebookWithTopicsAndSubTopics): Promise<void> => {
    _notebook.customerId = props.customer.id

    try {
      NProgress.start()
      const notebook = await postClient<NotebookWithTopicsAndSubTopics>(
        _notebook,
        `/api/${props.customer.tag}`
      )
      mutate(`/api/${props.customer.tag}/${notebook.tag}`, notebook)
      router.push(`/${props.customer.tag}/${notebook.tag}`)
    } catch (e) {
      NProgress.done()
      console.log(e)
    }
  }

  const topics = state?.topics?.map((x) => {
    return {
      label: x.name,
      value: x.id.toString(),
      __isNew__: false,
    } as SelectOption
  })

  const topicsOriginal = initNotebook?.topics?.map((x) => {
    return {
      label: x.name,
      value: x.id.toString(),
      __isNew__: false,
    } as SelectOption
  })

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-6 sm:col-span-2 ">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Notebook&apos;s name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(x) => {
                          dispatch({ type: ActionType.UPDATE_NAME, name: x.target.value })
                          dispatch({
                            type: ActionType.UPDATE_TAG,
                            tag: slugify(x.target.value, {
                              lower: true,
                            }),
                          })
                        }}
                        value={state?.name}
                      />
                      <span className="text-xs font-medium text-right block">
                        {state?.tag && `questionsof.com/${state?.tag}`}
                      </span>
                    </div>

                    <div className="col-span-6 sm:col-span-1 ">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          onChange={(x) =>
                            dispatch({
                              type: ActionType.UPDATE_PRICE,
                              price: Number(x.target.value),
                            })
                          }
                          value={state?.price.toString()}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="currency" className="sr-only">
                            Currency
                          </label>
                          <select
                            id="currency"
                            name="currency"
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                          >
                            <option>USD</option>
                            <option>CAD</option>
                            <option>EUR</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700  mb-1"
                      >
                        Topics
                      </label>
                      <CreatableSelect
                        instanceId={'topics'}
                        isMulti
                        onChange={(x) =>
                          dispatch({
                            type: ActionType.UPDATE_TOPICS,
                            topics: x?.map((y) => {
                              return {
                                id: y.__isNew__ ? -Number(new Date()) : Number(y.value),
                                name: y.label,
                                subtopics: y.__isNew__
                                  ? []
                                  : state.topics?.find((z) => z.id == Number(y.value))?.subtopics ??
                                    [],
                              } as Topic & {
                                subtopics: SubTopic[]
                              }
                            }),
                          })
                        }
                        isClearable={false}
                        value={topics}
                        options={topicsOriginal}
                      />

                      {state?.topics?.map((x) => {
                        const subtopics = x.subtopics?.map((y) => {
                          return {
                            label: y.name,
                            value: y.id.toString(),
                            __isNew__: false,
                          } as SelectOption
                        })
                        const subtopicsOriginal = initNotebook?.topics
                          .find((z) => z.id == x.id)
                          ?.subtopics?.map((y) => {
                            return {
                              label: y.name,
                              value: y.id.toString(),
                              __isNew__: false,
                            } as SelectOption
                          })
                        return (
                          <div className="bg-gray-50 p-4 my-2 rounded-md" key={x.id}>
                            <span className="block text-sm font-medium text-gray-700">
                              SubTopics of <span className="text-gray-900 font-bold">{x.name}</span>
                            </span>
                            <CreatableSelect
                              className="mt-2"
                              instanceId={x.id}
                              isMulti
                              onChange={(y) =>
                                dispatch({
                                  type: ActionType.UPDATE_SUBTOPICS,
                                  subtopics: y?.map((z) => {
                                    return {
                                      id: z.__isNew__ ? -Number(new Date()) : Number(z.value),
                                      name: z.label,
                                      topicId: x.id,
                                    } as SubTopic
                                  }),
                                  topicId: x.id,
                                })
                              }
                              isClearable={false}
                              value={subtopics}
                              options={subtopicsOriginal}
                            />
                          </div>
                        )
                      })}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <CodeMirror
                        className="text-xs"
                        options={{
                          mode: 'gfm',
                          lineNumbers: true,
                          lineWrapping: true,
                        }}
                        value={highlighted}
                        onChange={(editor, data, value) => {
                          dispatch({
                            type: ActionType.UPDATE_DESCRIPTION,
                            text: value,
                          })
                        }}
                      />
                      <textarea>{state.text}</textarea>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={() => {
                      if (props.notebook) {
                        router.replace(`/${props.customer.tag}/${props.notebook.tag}`)
                      } else {
                        router.replace(`/${props.customer.tag}`)
                      }
                    }}
                    className="inline-flex justify-center py-2 px-4 border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => await postNotebook(state)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
