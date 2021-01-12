import { NextPage } from "next"
import React, { useEffect, useReducer, useState } from "react"
import { NotebookWithTopicsAndSubTopics } from "../../lib/types"

import { SubTopic, Topic } from "@prisma/client"
import CreatableSelect from 'react-select/creatable';
import _ from "lodash";
import { useRouter } from "next/router";


enum ActionType {
    UPDATE_SUBTOPICS,
    UPDATE_NOTEBOOK,
    UPDATE_TOPICS,
    UPDATE_DESCRIPTION,
    UPDATE_PRICE,
    UPDATE_NAME
}

type Action = 
{   
    type: ActionType.UPDATE_TOPICS, 
    topics: (Topic & {
        subtopics: SubTopic[];
    })[]
} |
{   
    type: ActionType.UPDATE_SUBTOPICS, 
    topicId: number,
    subtopics: SubTopic[]
} |
{   
    type: ActionType.UPDATE_NOTEBOOK, 
    notebook: NotebookWithTopicsAndSubTopics,
} |
{   
    type: ActionType.UPDATE_DESCRIPTION, 
    description: string,
} |
{   
    type: ActionType.UPDATE_PRICE, 
    price: number,
} |
{   
    type: ActionType.UPDATE_NAME, 
    name: string,
}

type SelectOption = {
    label: string,
    value: string,
    __isNew__?: boolean
}

const Admin: NextPage = () => {

    const router = useRouter()
        
    const notebookTag = router.query['notebookTag'] as string[]

    const initState: NotebookWithTopicsAndSubTopics = {
        id: 0,
        description: "",
        name: "",
        price: 0,
        tag: "",
        topics: []
    }

    const reducer = (state: NotebookWithTopicsAndSubTopics, action: Action) => {
        switch (action.type) {
            case ActionType.UPDATE_SUBTOPICS: {
                const newState = _.cloneDeep(state)
                const topic = newState.topics.find(x => x.id == action.topicId)
                topic.subtopics = action.subtopics
                return newState;
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
            case ActionType.UPDATE_PRICE: {
                const newState = _.cloneDeep(state)
                newState.price = action.price
                return newState
            }
            case ActionType.UPDATE_DESCRIPTION: {
                const newState = _.cloneDeep(state)
                newState.description = action.description
                return newState
            }
            case ActionType.UPDATE_NOTEBOOK: {
                return action.notebook
            }
            case ActionType.UPDATE_TOPICS: {
                const newState = _.cloneDeep(state)
                newState.topics = action.topics
                return newState;
            }
            default:
                break;
        }
        return state
    }

    const [notebook, setNotebook] = useState<NotebookWithTopicsAndSubTopics>(initState)
    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        (async () => {
            if(notebookTag?.length){
                const _notebookTag = notebookTag[0]
                const notebookFromApi: NotebookWithTopicsAndSubTopics = await fetch(`/api/notebook/${_notebookTag}`).then(x => x.ok && x.json())
                if(notebookFromApi){
                    dispatch({ type: ActionType.UPDATE_NOTEBOOK, notebook: notebookFromApi })
                    setNotebook(notebookFromApi)
                }
            }
        })()
    }, [notebookTag])


    const topics = state?.topics?.map(x => {
        return {
            label: x.name,
            value: x.id.toString(),
            __isNew__: false
        } as SelectOption
    })

    const topicsOriginal = notebook?.topics?.map(x => {
        return {
            label: x.name,
            value: x.id.toString(),
            __isNew__: false
        } as SelectOption
    })

    const createNotebook = async (_notebook: NotebookWithTopicsAndSubTopics) => {
        await fetch('/api/notebook', {
            method: 'POST',
            body: JSON.stringify(_notebook),
            headers: {'Content-Type': 'application/json'}
        }).then(x => x.ok && x.json())
    }

    return (
        <div className="bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Use a permanent address where you can receive mail.
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-3 gap-3">

                                            <div className="col-span-6 sm:col-span-2 ">
                                                <label
                                                    htmlFor="last_name"
                                                    className="block text-sm font-medium text-gray-700">Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    id="last_name"
                                                    autoComplete="family-name"
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    onChange={x => dispatch({type: ActionType.UPDATE_NAME, name: x.target.value})}
                                                    value={state?.name}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-1 ">
                                                <label
                                                    htmlFor="last_name"
                                                    className="block text-sm font-medium text-gray-700">Price</label>
                                                <input
                                                    type="number"
                                                    name="last_name"
                                                    id="last_name"
                                                    autoComplete="family-name"
                                                    onChange={x => dispatch({type: ActionType.UPDATE_PRICE, price: Number(x.target.value)})}
                                                    value={state?.price}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700  mb-1">Topics</label>
                                                <CreatableSelect
                                                    instanceId={"topics"}
                                                    isMulti
                                                    onChange={x => dispatch({
                                                        type: ActionType.UPDATE_TOPICS, topics: x?.map(y => {
                                                            return {
                                                                id: y.__isNew__ ? -Number(new Date()) : Number(y.value),
                                                                name: y.label,
                                                                subtopics: y.__isNew__ ? [] : state.topics?.find(z => z.id == Number(y.value))?.subtopics ?? [],
                                                            } as (Topic & {
                                                                subtopics: SubTopic[];
                                                            })
                                                        })
                                                    })}
                                                    isClearable={false}
                                                    value={topics}
                                                    options={topicsOriginal}

                                                />
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mt-5 mb-1">SubTopics</label>

                                                {state?.topics?.map(x => {
                                                    const subtopics = x.subtopics?.map(y => {
                                                        return {
                                                            label: y.name,
                                                            value: y.id.toString(),
                                                            __isNew__: false
                                                        } as SelectOption
                                                    })
                                                    const subtopicsOriginal = notebook?.topics.find(z => z.id == x.id)?.subtopics?.map(y => {
                                                        return {
                                                            label: y.name,
                                                            value: y.id.toString(),
                                                            __isNew__: false
                                                        } as SelectOption
                                                    })
                                                    return (
                                                        <div className="bg-gray-50 p-4 m-2 rounded-md" key={x.id}>
                                                            <span className="block text-sm font-medium text-gray-700">{x.name}</span>
                                                            <CreatableSelect
                                                                className="mt-2"
                                                                instanceId={x.id}
                                                                isMulti
                                                                onChange={y => dispatch({
                                                                    type: ActionType.UPDATE_SUBTOPICS, subtopics: y?.map(z => {
                                                                        return {
                                                                            id: z.__isNew__ ? -Number(new Date()) : Number(z.value),
                                                                            name: z.label,
                                                                            topicId: x.id
                                                                        } as SubTopic
                                                                    }), topicId: x.id
                                                                })}
                                                                isClearable={false}
                                                                value={subtopics}
                                                                options={subtopicsOriginal}

                                                            />
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mt-5 mb-1">Description</label>
                                                <textarea className="resize-y mt-1 font-mono focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={x => dispatch({type: ActionType.UPDATE_DESCRIPTION, description: x.target.value}) } value={state?.description ?? ""}/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button 
                                        onClick={async () => await createNotebook(state)}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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

export default Admin