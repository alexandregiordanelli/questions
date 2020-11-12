import { Nav } from "../types";
import yaml from 'js-yaml';

export const ampUrl = (isAmp: boolean, url: string) => isAmp? `${url}.amp`: url

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

export async function getNavFromGHRepo(ghRepo: string) {
    const response = await fetch("https://raw.githubusercontent.com/" + ghRepo + "/master/nav.yaml")
    const body = await response.text()
    if(response.status != 200){
        throw new Error(body)
    }
    return yaml.safeLoad(body) as Nav
}

export async function getPathsFromGHRepo(ghRepo: string) {
    const nav = await getNavFromGHRepo(ghRepo)
    const path_internal = nav.questions
        .map(x => ({ 
            params: { 
                slug: ghRepo.split('/').concat(x.url) // [alexandre.giordanelli,questoes_de_mat,questao1]
            } 
        }))

    return path_internal
}