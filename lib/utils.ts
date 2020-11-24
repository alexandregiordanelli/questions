import { GitHub, Nav, Path } from "../types";
import yaml from 'js-yaml';

export const ampUrl = (isAmp: boolean, url: string) => !isAmp? `/${url}?amp=1`: `/${url}`

export async function getFileContentFromGHRepo(ghRepo: GitHub, filePathFromRoot: string){
    const response = await fetch(`https://raw.githubusercontent.com/${ghRepo.username}/${ghRepo.repo}/master/${filePathFromRoot}`);
    const body =  await response.text();

    if(response.status != 200)
        throw new Error(body + " " + `https://raw.githubusercontent.com/${ghRepo.username}/${ghRepo.repo}/master/${filePathFromRoot}`)

    return body
}

export const absolute = (base, relative) => {
    let stack = base.split("/");
    let parts = relative.split("/");
    stack.pop();

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == ".")
            continue;
        if (parts[i] == "..")
            stack.pop();

        else
            stack.push(parts[i]);
    }
    return stack.join("/");
};

export const yml2Nav = (text: string) => yaml.safeLoad(text) as Nav

export const yml2NotebookList = (text: string) => yaml.safeLoad(text) as string[]

export const getNavFromNotebook = async (ghRepo: GitHub, notebook: string) => {
    try {
        const nav = yml2Nav(await getFileContentFromGHRepo(ghRepo, `${notebook}/nav.yaml`))
        
        nav.menu = nav.menu.map(x => ({
            ...x,
            title: x.title,
            topics: x.topics.map(y => {
                const url = nav.questions.find(z => z.topic == y.topic)?.url
                if(url){
                    return {
                        ...y,
                        url: `${notebook}/${url}`
                    }
                }
            }).filter(y => !!y)
        }))

        nav.questions = nav.questions.map(x => ({
            ...x,
            file: `${notebook}/${x.file}`,
            absolutUrl: `https://raw.githubusercontent.com/${ghRepo.username}/${ghRepo.repo}/master/${notebook}/${x.file}`
        }))

        return nav
    }
    catch (e) {
        throw new Error("Notebook Nav.yaml not found. "+ e)
    }
}

export const getNavFromGHRepo = async (ghRepo: GitHub) => yml2NotebookList(await getFileContentFromGHRepo(ghRepo, `nav.yaml`))

export async function getPathsFromNotebook(ghRepo: GitHub, notebook: string) {

    const nav = await getNavFromNotebook(ghRepo, notebook)

    const pathList: Path[] = nav.questions
        .map(x => ({ 
            params: { 
                slug: [notebook].concat(x.url) // [enem,questao1]
            } 
        }))

    pathList.unshift({
        params: {
            slug: [notebook]
        }
    })

    return pathList
}

export async function getPathsFromGHRepo(ghRepo: GitHub) {

    const notebookList = await getNavFromGHRepo(ghRepo)

    let navListFromGhRepo: Path[] = []

    for(let notebook of notebookList){
        navListFromGhRepo = navListFromGhRepo.concat(await getPathsFromNotebook(ghRepo, notebook))
    }

    return navListFromGhRepo
}