import { Nav } from "../pages/types";
import yaml from 'js-yaml';

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
    const response = await fetch("https://raw.githubusercontent.com/" + ghRepo + "/master/nav.yml")
    const body = await response.text()
    if(response.status != 200){
        throw new Error(body)
    }
    return yaml.safeLoad(body) as Nav
}

export async function getPathsFromGHRepo(url: string) {
    const nav = await getNavFromGHRepo(url)
    const path_internal = nav.questions.map(y => url.split('/').concat(y.url)).map(x => ({ params: { slug: x } }))
    return path_internal
}