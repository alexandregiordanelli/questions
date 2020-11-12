import { Nav } from "../types";
import yaml from 'js-yaml';

export const ampUrl = (isAmp: boolean, url: string) => isAmp? `${url}.amp`: url

export async function getFileContentFromGHRepo(ghRepo: string, file: string){
    const response = await fetch("https://raw.githubusercontent.com/" + ghRepo + "/master/" + file);
    const body =  await response.text();
    if(response.status != 200){
        throw new Error(body)
    }
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

export const getNavFromGHRepo = async (ghRepo: string) => yml2Nav(await getFileContentFromGHRepo(ghRepo, "nav.yaml"))

export async function getPathsFromGHRepo(ghRepo: string) {
    const nav = await getNavFromGHRepo(ghRepo)
    const repoName = ghRepo.split('/').slice(1) //without username; [enem]; not [alexandregiordanelli, enem]
    const path_internal = nav.questions
        .map(x => ({ 
            params: { 
                slug: repoName.concat(x.url) // [enem,questao1]
            } 
        }))

    path_internal.unshift({
        params: {
            slug: repoName
        }
    })

    return path_internal
}