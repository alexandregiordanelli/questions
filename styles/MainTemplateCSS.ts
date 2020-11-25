import css from 'styled-jsx/css';

export const MainTemplateCSS = css`
h1 {
    color: rgb(33, 136, 255);
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 16px;
    font-weight: 400;
    padding-left: 24px;
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
    height: 66px;
    background-color: rgb(27, 31, 35);
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    display: flex;
}
.container {
    display: flex;
}


#menu-check {
    display: none;
}

@media (max-width: 767px) {
    .grid > div {
        padding: 0 24px;
    }
}

@media screen and (max-width: 1012px){
    #menu-check {
        display: block;
        position: fixed;
        z-index: 1;
        top: 0;
        right: 0;
    }

    :global(#menu-check:checked ~ ul) {
        right: 0;
    }
}


@media screen and (min-width: 768px){
    .grid{
        display: grid;
        grid-template-columns: minmax(0px, 960px) 220px;
        margin: 0 auto;
        column-gap: 48px;
        padding: 48px;
        grid-template-areas: "content table-of-contents";
    }
}
.grid div {
    grid-area: content / content / content / content;
}

div > h2 {
    padding-bottom: .3em;
    border-bottom: 1px solid #eaecef;
    margin: 0;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
}
`
