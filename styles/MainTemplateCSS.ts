import css from 'styled-jsx/css';

export const MainTemplateCSS = css`
h1 {
    color: rgb(33, 136, 255);
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 16px;
    font-weight: 400;
    padding-left: 12px;
}
.main {
    flex-direction: column;
    min-height: 100vh;
    display: flex;
}
.head {
    top: 0px;
    z-index: 1;
    position: sticky;
    height: 62px;
    background-color: rgb(27,31,35);
    align-items: center;
    display: flex;
    padding-left: 24px; 
}
.container {
    display: flex;
}

#menu-check {
    display: none;
}

label {
    z-index: 1;
    right: 16px;
    top: 16px;
    position: fixed;
    padding: 6px 16px;
    display: none;
    cursor: pointer;
    line-height: 20px;
    border-radius: 6px;
    font-size: 14px;
    color: rgb(200,225,255);
    border: 1px solid rgb(68,77,86);
}

label:hover {
    color: rgb(255, 255, 255);
    background-color: rgb(3, 102, 214);
    border-color: rgba(27, 31, 35, 0.15);
    box-shadow: rgba(27, 31, 35, 0.1) 0px 1px 0px, rgba(255, 255, 255, 0.03) 0px 2px 0px inset;
}


@media screen and (max-width: 1012px){
   
    label {
        display: block;
    }

    :global(#menu-check:checked ~ ul) {
        right: 0;
    }
}

`
