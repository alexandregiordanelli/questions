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
