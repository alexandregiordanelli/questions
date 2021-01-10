import { NextPage } from "next"
import React, { KeyboardEventHandler, useEffect, useState } from "react"
import { MenuWithQuestions, NotebookWithTopicsAndSubTopics } from "../lib/types"

import { CheckIcon, PencilIcon, PlusIcon, TrashIcon } from "@primer/octicons-react"
import { SubTopic, Topic } from "@prisma/client"
import _ from 'lodash'
import { LeftMenu, MenuCore } from "../components/Pages/Notebook/LeftMenu"
enum ContentTypeItem {
    Topic,
    SubTopic
}

enum OperationType {
    Add,
    Edit
}

const FormItemEdit: React.FC<{
    contentType: ContentTypeItem
    operationType: OperationType
    onRemove?: () => void
    onAdd?: (value: TopicForm) => void
    onOk?: (value: TopicForm) => void
    value?: TopicForm
    updateList?: (value: TopicForm[], topicId: number) => void
}> = props => {
    const initValue = props.value ?? {
        id: Date.now(),
        name: "",
        subtopics: []
    }
    const [value, setValue] = useState(initValue)
    const [edit, setEdit] = useState(false)

    useEffect(()=>{
        if(props.value)
            setValue(props.value)
    }, [props.value])

    const disabled = props.operationType == OperationType.Add? false: !edit

    useEffect(()=>{
        if(props.contentType == ContentTypeItem.Topic && 
            props.operationType == OperationType.Edit &&
            value.subtopics){
            props.updateList(value.subtopics, value.id)
        }

    }, [value.subtopics])

    const updateSubtopics = (data: TopicForm[]) => {
        setValue({
            ...value,
            subtopics: data
        })
    }

    return (
        <>
        <div className={`flex mt-1 ${props.operationType == OperationType.Add? 'mb-4': ''}`}>
            <input 
            type="text"
            disabled={disabled}
            onChange={e => setValue({
                ...initValue,
                name: e.target.value
            })}
            placeholder={props.contentType == ContentTypeItem.Topic? "Biology": "Citology"}
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${disabled && 'bg-gray-50 text-gray-500'}`}
            value={value.name}
            />
            {props.operationType==OperationType.Edit ? 
                (edit ? 
                    <>
                        <button 
                        className="bg-blue-600 text-white w-14 rounded-md ml-2 focus:outline-none"
                        onClick={(e) => {
                            e.preventDefault()
                            setEdit(false)
                            props.onOk(value)
                        }}
                        disabled={value.name.length == 0}
                        >
                            <CheckIcon />
                        </button>
                        <button 
                        className="bg-red-600 text-white w-14 rounded-md ml-2 focus:outline-none"
                        onClick={(e) => {
                            e.preventDefault()
                            props.onRemove()
                        }}
                        >
                            <TrashIcon />
                        </button>
                    </>
                    :
                    <button 
                    className="bg-yellow-600 text-white w-12 rounded-md ml-2 focus:outline-none"
                    onClick={(e) => {
                        e.preventDefault()
                        setEdit(true)
                    }}
                    >
                        <PencilIcon />
                    </button>
                )
                : 
                <button 
                className="bg-green-600 text-white w-12 rounded-md ml-2 focus:outline-none"
                onClick={(e) => {
                    e.preventDefault()
                    props.onAdd(value)
                    setValue(initValue)
                }}
                disabled={value.name.length == 0}
                >
                    <PlusIcon />
                </button>}
        </div>
        <div className="ml-6 mt-4">
        {
            props.operationType==OperationType.Edit && 
            props.contentType == ContentTypeItem.Topic && 
            <SubTopicsForm 
            contentType={ContentTypeItem.SubTopic} 
            initialData={props.value.subtopics}
            updateCb={updateSubtopics}
            />
        }
        </div>
        </>
    )
}

type TopicForm = {
    id: number,
    name: string,
    subtopics?: TopicForm[]
}

const SubTopicsForm: React.FC<{
    contentType: ContentTypeItem,
    initialData: TopicForm[]
    updateCb: (data: TopicForm[]) => void 
}> = props => {

    const [subTopics, setSubTopics] = useState<TopicForm[]>(props.initialData)

    useEffect(()=> {
        if(!_.isEqual(props.initialData, subTopics)){
            props.updateCb(subTopics)
        }
    }, [subTopics])

    useEffect(()=> {
        if(!_.isEqual(props.initialData, subTopics)){
            setSubTopics(props.initialData)
        }
    }, [props.initialData])

    const AddFormItem = (value: TopicForm) => {
        if(!subTopics.some(x => x.name.toLocaleLowerCase() == value.name.toLocaleLowerCase())){
            const subTopicsUpdated = subTopics.concat(value).sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1: -1)
            setSubTopics(subTopicsUpdated)
        }
    }

    const UpdateFormItem = (value: TopicForm, index: number) => {
        const subTopicsUpdated = subTopics.concat()
        subTopicsUpdated[index] = value
        setSubTopics(subTopicsUpdated.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1: -1))
    }

    const RemoveFormItem = (index: number) => {
        const subTopicsUpdated = subTopics.concat().sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1: -1)
        subTopicsUpdated.splice(index, 1)
        setSubTopics(subTopicsUpdated)
    }

    const UpdateList = (value: TopicForm[], topicId: number) => {
        const subTopicsNew = subTopics.concat()
        const topic = subTopicsNew.find(x => x.id == topicId)
        topic.subtopics = value
        setSubTopics(subTopicsNew)
    }

    return <>
        <span className="block text-sm font-medium text-gray-700">{props.contentType == ContentTypeItem.Topic? 'Topics': 'SubTopics'}</span>
        <FormItemEdit contentType={props.contentType} operationType={OperationType.Add} onAdd={AddFormItem}/>
        {subTopics.map((x, i) => 
            <FormItemEdit 
            key={x.name.toLocaleLowerCase()}
            contentType={props.contentType} 
            operationType={OperationType.Edit} 
            onRemove={()=> RemoveFormItem(i)}
            onOk={(value) => UpdateFormItem(value, i)}
            updateList={UpdateList}
            value={x}
            />
        )}
    </>
}





const Admin: NextPage = () => {

    const [notebook, setNotebook] = useState<NotebookWithTopicsAndSubTopics>(null)
    const [draftData, setDraftData] = useState<TopicForm[]>([])

    useEffect(() => {
        (async () => {
            const notebookFromApi: NotebookWithTopicsAndSubTopics = await fetch('/api/notebook/enem').then(x => x.ok && x.json())
            setNotebook(notebookFromApi)
            setDraftData(notebookFromApi.topics)
        })()
    }, [])

    useEffect(() => {
        const topics = draftData.map(x => {
            return {
                ...x,
                subtopics: x.subtopics.map(y => {
                    delete y.subtopics
                    return {
                        ...y
                    } as SubTopic
                })
            } as Topic & { subtopics: SubTopic[]; }
        })
        setNotebook({
            ...notebook,
            topics
        })
    }, [draftData])

    const menu: MenuWithQuestions = notebook?.topics.map(x => {
        return {
            ...x,
            subtopics: x.subtopics.map(y => {
                return {
                    ...y,
                    questions: []
                }
            })
        }

    })

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
                            <form action="#" method="POST">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-4">
                                                <label
                                                htmlFor="last_name"
                                                className="block text-sm font-medium text-gray-700">Name</label>
                                                <input 
                                                type="text" 
                                                name="last_name" 
                                                id="last_name" 
                                                autoComplete="family-name" 
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label
                                                htmlFor="first_name"
                                                className="block text-sm font-medium text-gray-700">Tag</label>
                                                <input 
                                                type="text"
                                                name="first_name"
                                                id="first_name"
                                                autoComplete="given-name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>

   

                                            <div className="col-span-6 sm:col-span-3">
                                                <SubTopicsForm contentType={ContentTypeItem.Topic} initialData={draftData} updateCb={setDraftData} />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Menu Preview</label>
                                                {menu && <MenuCore menu={menu} />}
                                            </div>

   
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin