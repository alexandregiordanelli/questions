import css from 'styled-jsx/css';

export const MainTemplateCSS = css`

h1 {
    color: rgb(33, 136, 255);
    margin-left: 8px;
    /* font-size: 21px; */
/*     
    
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-weight: 400;
    padding-left: 12px;*/
} 

.head {
    top: 0px;
    z-index: 1;
    position: sticky;
    height: 62px;
    background-color: #1b1f23;
    align-items: center;
    justify-content: space-between;
    display: flex;
    padding: 0 24px;
}
.left {
    align-items: center;
    display: flex;
}
.right {
    color: rgb(200, 225, 255);
}
.head a {
    display: flex;
    align-items: center;
}
@media (max-width: 767px) {
    .textual{
        display: none;
    }
}
@media screen and (max-width: 1012px){
    .head {
        padding-left: 76px;
    }
}
`
