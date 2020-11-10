import React, { useState } from 'react';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import unified from 'unified'
import rehype2react from 'rehype-react';
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import { absolute } from '../lib/utils';
import "katex/dist/contrib/mhchem.js"
import styles from './MD2React.module.css'
import markdown from 'remark-parse'
import gfm from 'remark-gfm'
import rehype2qmd from 'rehype-qmd'
import visit from 'unist-util-visit'


const Input: React.FC<{
    type: string, 
    id: string,
    value?: string,
    name?: string,
    initialState?: boolean
}> = (props) => {
    if(props.type == "checkbox"){
        const [checked, setChecked] = useState(props.initialState)
        return <input type={props.type} id={props.id} checked={checked} onChange={e => setChecked(e.target.checked)}/>
    } else {
        return <input type={props.type} id={props.id} name={props.name} value={props.value}/>
    }
}

/**
 * Returns a React component which renders markdown with latex
 * @param md markdown string
 */
export const MD2React: React.FC<{
    md: string, 
    url: string
}> = props => {
    let rightAnswer = 'a'
    const [initialState, setInitialState] = useState(false)
    return (
        <>
            <div className={styles.MD2React}>{
            unified()
            .use(markdown)
            .use(math)
            .use(gfm)
            .use(remark2rehype)
            .use(rehype2qmd)
            .use(katex)
            .use(inspectUrls, {
                inspectEach({ url, node }) {
                    if(new RegExp("^(?!www\.|(?:http|ftp)s?://|[A-Za-z]:\\|//).*").test(url)){
                        node.properties.src = absolute(props.url, url)
                    }
                },  
                selectors: [
                    "img[src]"
                ]
            })
            .use(() => (node: any) => {
                visit(node, (x: any) => x.tagName === 'div' && x.properties.class == 'r', (a: any) => {
                    rightAnswer = a.children.find((x:any) => x.tagName == "p").children.find((x: any) => x.type == "text").value
                })
                return node
            })
            .use(rehype2react, { 
                createElement: React.createElement, 
                components: {
                    input: (props: any) => <Input {...props} initialState={initialState}/>
                } 
            })
            .processSync(props.md).result}
            </div>
            <style global jsx>{`
            @font-face{font-family:KaTeX_AMS;src:url(fonts/KaTeX_AMS-Regular.woff2) format("woff2"),url(fonts/KaTeX_AMS-Regular.woff) format("woff"),url(fonts/KaTeX_AMS-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Caligraphic;src:url(fonts/KaTeX_Caligraphic-Bold.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Bold.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Bold.ttf) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:KaTeX_Caligraphic;src:url(fonts/KaTeX_Caligraphic-Regular.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Regular.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Fraktur;src:url(fonts/KaTeX_Fraktur-Bold.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Bold.woff) format("woff"),url(fonts/KaTeX_Fraktur-Bold.ttf) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:KaTeX_Fraktur;src:url(fonts/KaTeX_Fraktur-Regular.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Regular.woff) format("woff"),url(fonts/KaTeX_Fraktur-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Main;src:url(fonts/KaTeX_Main-Bold.woff2) format("woff2"),url(fonts/KaTeX_Main-Bold.woff) format("woff"),url(fonts/KaTeX_Main-Bold.ttf) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:KaTeX_Main;src:url(fonts/KaTeX_Main-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Main-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Main-BoldItalic.ttf) format("truetype");font-weight:700;font-style:italic}@font-face{font-family:KaTeX_Main;src:url(fonts/KaTeX_Main-Italic.woff2) format("woff2"),url(fonts/KaTeX_Main-Italic.woff) format("woff"),url(fonts/KaTeX_Main-Italic.ttf) format("truetype");font-weight:400;font-style:italic}@font-face{font-family:KaTeX_Main;src:url(fonts/KaTeX_Main-Regular.woff2) format("woff2"),url(fonts/KaTeX_Main-Regular.woff) format("woff"),url(fonts/KaTeX_Main-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Math;src:url(fonts/KaTeX_Math-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Math-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Math-BoldItalic.ttf) format("truetype");font-weight:700;font-style:italic}@font-face{font-family:KaTeX_Math;src:url(fonts/KaTeX_Math-Italic.woff2) format("woff2"),url(fonts/KaTeX_Math-Italic.woff) format("woff"),url(fonts/KaTeX_Math-Italic.ttf) format("truetype");font-weight:400;font-style:italic}@font-face{font-family:"KaTeX_SansSerif";src:url(fonts/KaTeX_SansSerif-Bold.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Bold.woff) format("woff"),url(fonts/KaTeX_SansSerif-Bold.ttf) format("truetype");font-weight:700;font-style:normal}@font-face{font-family:"KaTeX_SansSerif";src:url(fonts/KaTeX_SansSerif-Italic.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Italic.woff) format("woff"),url(fonts/KaTeX_SansSerif-Italic.ttf) format("truetype");font-weight:400;font-style:italic}@font-face{font-family:"KaTeX_SansSerif";src:url(fonts/KaTeX_SansSerif-Regular.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Regular.woff) format("woff"),url(fonts/KaTeX_SansSerif-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Script;src:url(fonts/KaTeX_Script-Regular.woff2) format("woff2"),url(fonts/KaTeX_Script-Regular.woff) format("woff"),url(fonts/KaTeX_Script-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Size1;src:url(fonts/KaTeX_Size1-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size1-Regular.woff) format("woff"),url(fonts/KaTeX_Size1-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Size2;src:url(fonts/KaTeX_Size2-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size2-Regular.woff) format("woff"),url(fonts/KaTeX_Size2-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Size3;src:url(fonts/KaTeX_Size3-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size3-Regular.woff) format("woff"),url(fonts/KaTeX_Size3-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Size4;src:url(fonts/KaTeX_Size4-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size4-Regular.woff) format("woff"),url(fonts/KaTeX_Size4-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:KaTeX_Typewriter;src:url(fonts/KaTeX_Typewriter-Regular.woff2) format("woff2"),url(fonts/KaTeX_Typewriter-Regular.woff) format("woff"),url(fonts/KaTeX_Typewriter-Regular.ttf) format("truetype");font-weight:400;font-style:normal}.katex{font:normal 1.21em KaTeX_Main,Times New Roman,serif;line-height:1.2;text-indent:0;text-rendering:auto;border-color:currentColor}.katex *{-ms-high-contrast-adjust:none!important}.katex .katex-version:after{content:"0.12.0"}.katex .katex-mathml{position:absolute;clip:rect(1px,1px,1px,1px);padding:0;border:0;height:1px;width:1px;overflow:hidden}.katex .katex-html>.newline{display:block}.katex .base{position:relative;white-space:nowrap;width:min-content}.katex .base,.katex .strut{display:inline-block}.katex .textbf{font-weight:700}.katex .textit{font-style:italic}.katex .textrm{font-family:KaTeX_Main}.katex .textsf{font-family:KaTeX_SansSerif}.katex .texttt{font-family:KaTeX_Typewriter}.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}.katex .mathit{font-family:KaTeX_Main;font-style:italic}.katex .mathrm{font-style:normal}.katex .mathbf{font-family:KaTeX_Main;font-weight:700}.katex .boldsymbol{font-family:KaTeX_Math;font-weight:700;font-style:italic}.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}.katex .mathcal{font-family:KaTeX_Caligraphic}.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}.katex .mathtt{font-family:KaTeX_Typewriter}.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}.katex .mathitsf,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}.katex .mainrm{font-family:KaTeX_Main;font-style:normal}.katex .vlist-t{display:inline-table;table-layout:fixed;border-collapse:collapse}.katex .vlist-r{display:table-row}.katex .vlist{display:table-cell;vertical-align:bottom;position:relative}.katex .vlist>span{display:block;height:0;position:relative}.katex .vlist>span>span{display:inline-block}.katex .vlist>span>.pstrut{overflow:hidden;width:0}.katex .vlist-t2{margin-right:-2px}.katex .vlist-s{display:table-cell;vertical-align:bottom;font-size:1px;width:2px;min-width:2px}.katex .vbox{-ms-flex-direction:column;flex-direction:column;align-items:baseline}.katex .hbox,.katex .vbox{display:-ms-inline-flexbox;display:inline-flex}.katex .hbox{-ms-flex-direction:row;flex-direction:row;width:100%}.katex .thinbox{display:inline-flex;flex-direction:row;width:0;max-width:0}.katex .msupsub{text-align:left}.katex .mfrac>span>span{text-align:center}.katex .mfrac .frac-line{display:inline-block;width:100%;border-bottom-style:solid}.katex .hdashline,.katex .hline,.katex .mfrac .frac-line,.katex .overline .overline-line,.katex .rule,.katex .underline .underline-line{min-height:1px}.katex .mspace{display:inline-block}.katex .clap,.katex .llap,.katex .rlap{width:0;position:relative}.katex .clap>.inner,.katex .llap>.inner,.katex .rlap>.inner{position:absolute}.katex .clap>.fix,.katex .llap>.fix,.katex .rlap>.fix{display:inline-block}.katex .llap>.inner{right:0}.katex .clap>.inner,.katex .rlap>.inner{left:0}.katex .clap>.inner>span{margin-left:-50%;margin-right:50%}.katex .rule{display:inline-block;border:0 solid;position:relative}.katex .hline,.katex .overline .overline-line,.katex .underline .underline-line{display:inline-block;width:100%;border-bottom-style:solid}.katex .hdashline{display:inline-block;width:100%;border-bottom-style:dashed}.katex .sqrt>.root{margin-left:.27777778em;margin-right:-.55555556em}.katex .fontsize-ensurer.reset-size1.size1,.katex .sizing.reset-size1.size1{font-size:1em}.katex .fontsize-ensurer.reset-size1.size2,.katex .sizing.reset-size1.size2{font-size:1.2em}.katex .fontsize-ensurer.reset-size1.size3,.katex .sizing.reset-size1.size3{font-size:1.4em}.katex .fontsize-ensurer.reset-size1.size4,.katex .sizing.reset-size1.size4{font-size:1.6em}.katex .fontsize-ensurer.reset-size1.size5,.katex .sizing.reset-size1.size5{font-size:1.8em}.katex .fontsize-ensurer.reset-size1.size6,.katex .sizing.reset-size1.size6{font-size:2em}.katex .fontsize-ensurer.reset-size1.size7,.katex .sizing.reset-size1.size7{font-size:2.4em}.katex .fontsize-ensurer.reset-size1.size8,.katex .sizing.reset-size1.size8{font-size:2.88em}.katex .fontsize-ensurer.reset-size1.size9,.katex .sizing.reset-size1.size9{font-size:3.456em}.katex .fontsize-ensurer.reset-size1.size10,.katex .sizing.reset-size1.size10{font-size:4.148em}.katex .fontsize-ensurer.reset-size1.size11,.katex .sizing.reset-size1.size11{font-size:4.976em}.katex .fontsize-ensurer.reset-size2.size1,.katex .sizing.reset-size2.size1{font-size:.83333333em}.katex .fontsize-ensurer.reset-size2.size2,.katex .sizing.reset-size2.size2{font-size:1em}.katex .fontsize-ensurer.reset-size2.size3,.katex .sizing.reset-size2.size3{font-size:1.16666667em}.katex .fontsize-ensurer.reset-size2.size4,.katex .sizing.reset-size2.size4{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size2.size5,.katex .sizing.reset-size2.size5{font-size:1.5em}.katex .fontsize-ensurer.reset-size2.size6,.katex .sizing.reset-size2.size6{font-size:1.66666667em}.katex .fontsize-ensurer.reset-size2.size7,.katex .sizing.reset-size2.size7{font-size:2em}.katex .fontsize-ensurer.reset-size2.size8,.katex .sizing.reset-size2.size8{font-size:2.4em}.katex .fontsize-ensurer.reset-size2.size9,.katex .sizing.reset-size2.size9{font-size:2.88em}.katex .fontsize-ensurer.reset-size2.size10,.katex .sizing.reset-size2.size10{font-size:3.45666667em}.katex .fontsize-ensurer.reset-size2.size11,.katex .sizing.reset-size2.size11{font-size:4.14666667em}.katex .fontsize-ensurer.reset-size3.size1,.katex .sizing.reset-size3.size1{font-size:.71428571em}.katex .fontsize-ensurer.reset-size3.size2,.katex .sizing.reset-size3.size2{font-size:.85714286em}.katex .fontsize-ensurer.reset-size3.size3,.katex .sizing.reset-size3.size3{font-size:1em}.katex .fontsize-ensurer.reset-size3.size4,.katex .sizing.reset-size3.size4{font-size:1.14285714em}.katex .fontsize-ensurer.reset-size3.size5,.katex .sizing.reset-size3.size5{font-size:1.28571429em}.katex .fontsize-ensurer.reset-size3.size6,.katex .sizing.reset-size3.size6{font-size:1.42857143em}.katex .fontsize-ensurer.reset-size3.size7,.katex .sizing.reset-size3.size7{font-size:1.71428571em}.katex .fontsize-ensurer.reset-size3.size8,.katex .sizing.reset-size3.size8{font-size:2.05714286em}.katex .fontsize-ensurer.reset-size3.size9,.katex .sizing.reset-size3.size9{font-size:2.46857143em}.katex .fontsize-ensurer.reset-size3.size10,.katex .sizing.reset-size3.size10{font-size:2.96285714em}.katex .fontsize-ensurer.reset-size3.size11,.katex .sizing.reset-size3.size11{font-size:3.55428571em}.katex .fontsize-ensurer.reset-size4.size1,.katex .sizing.reset-size4.size1{font-size:.625em}.katex .fontsize-ensurer.reset-size4.size2,.katex .sizing.reset-size4.size2{font-size:.75em}.katex .fontsize-ensurer.reset-size4.size3,.katex .sizing.reset-size4.size3{font-size:.875em}.katex .fontsize-ensurer.reset-size4.size4,.katex .sizing.reset-size4.size4{font-size:1em}.katex .fontsize-ensurer.reset-size4.size5,.katex .sizing.reset-size4.size5{font-size:1.125em}.katex .fontsize-ensurer.reset-size4.size6,.katex .sizing.reset-size4.size6{font-size:1.25em}.katex .fontsize-ensurer.reset-size4.size7,.katex .sizing.reset-size4.size7{font-size:1.5em}.katex .fontsize-ensurer.reset-size4.size8,.katex .sizing.reset-size4.size8{font-size:1.8em}.katex .fontsize-ensurer.reset-size4.size9,.katex .sizing.reset-size4.size9{font-size:2.16em}.katex .fontsize-ensurer.reset-size4.size10,.katex .sizing.reset-size4.size10{font-size:2.5925em}.katex .fontsize-ensurer.reset-size4.size11,.katex .sizing.reset-size4.size11{font-size:3.11em}.katex .fontsize-ensurer.reset-size5.size1,.katex .sizing.reset-size5.size1{font-size:.55555556em}.katex .fontsize-ensurer.reset-size5.size2,.katex .sizing.reset-size5.size2{font-size:.66666667em}.katex .fontsize-ensurer.reset-size5.size3,.katex .sizing.reset-size5.size3{font-size:.77777778em}.katex .fontsize-ensurer.reset-size5.size4,.katex .sizing.reset-size5.size4{font-size:.88888889em}.katex .fontsize-ensurer.reset-size5.size5,.katex .sizing.reset-size5.size5{font-size:1em}.katex .fontsize-ensurer.reset-size5.size6,.katex .sizing.reset-size5.size6{font-size:1.11111111em}.katex .fontsize-ensurer.reset-size5.size7,.katex .sizing.reset-size5.size7{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size5.size8,.katex .sizing.reset-size5.size8{font-size:1.6em}.katex .fontsize-ensurer.reset-size5.size9,.katex .sizing.reset-size5.size9{font-size:1.92em}.katex .fontsize-ensurer.reset-size5.size10,.katex .sizing.reset-size5.size10{font-size:2.30444444em}.katex .fontsize-ensurer.reset-size5.size11,.katex .sizing.reset-size5.size11{font-size:2.76444444em}.katex .fontsize-ensurer.reset-size6.size1,.katex .sizing.reset-size6.size1{font-size:.5em}.katex .fontsize-ensurer.reset-size6.size2,.katex .sizing.reset-size6.size2{font-size:.6em}.katex .fontsize-ensurer.reset-size6.size3,.katex .sizing.reset-size6.size3{font-size:.7em}.katex .fontsize-ensurer.reset-size6.size4,.katex .sizing.reset-size6.size4{font-size:.8em}.katex .fontsize-ensurer.reset-size6.size5,.katex .sizing.reset-size6.size5{font-size:.9em}.katex .fontsize-ensurer.reset-size6.size6,.katex .sizing.reset-size6.size6{font-size:1em}.katex .fontsize-ensurer.reset-size6.size7,.katex .sizing.reset-size6.size7{font-size:1.2em}.katex .fontsize-ensurer.reset-size6.size8,.katex .sizing.reset-size6.size8{font-size:1.44em}.katex .fontsize-ensurer.reset-size6.size9,.katex .sizing.reset-size6.size9{font-size:1.728em}.katex .fontsize-ensurer.reset-size6.size10,.katex .sizing.reset-size6.size10{font-size:2.074em}.katex .fontsize-ensurer.reset-size6.size11,.katex .sizing.reset-size6.size11{font-size:2.488em}.katex .fontsize-ensurer.reset-size7.size1,.katex .sizing.reset-size7.size1{font-size:.41666667em}.katex .fontsize-ensurer.reset-size7.size2,.katex .sizing.reset-size7.size2{font-size:.5em}.katex .fontsize-ensurer.reset-size7.size3,.katex .sizing.reset-size7.size3{font-size:.58333333em}.katex .fontsize-ensurer.reset-size7.size4,.katex .sizing.reset-size7.size4{font-size:.66666667em}.katex .fontsize-ensurer.reset-size7.size5,.katex .sizing.reset-size7.size5{font-size:.75em}.katex .fontsize-ensurer.reset-size7.size6,.katex .sizing.reset-size7.size6{font-size:.83333333em}.katex .fontsize-ensurer.reset-size7.size7,.katex .sizing.reset-size7.size7{font-size:1em}.katex .fontsize-ensurer.reset-size7.size8,.katex .sizing.reset-size7.size8{font-size:1.2em}.katex .fontsize-ensurer.reset-size7.size9,.katex .sizing.reset-size7.size9{font-size:1.44em}.katex .fontsize-ensurer.reset-size7.size10,.katex .sizing.reset-size7.size10{font-size:1.72833333em}.katex .fontsize-ensurer.reset-size7.size11,.katex .sizing.reset-size7.size11{font-size:2.07333333em}.katex .fontsize-ensurer.reset-size8.size1,.katex .sizing.reset-size8.size1{font-size:.34722222em}.katex .fontsize-ensurer.reset-size8.size2,.katex .sizing.reset-size8.size2{font-size:.41666667em}.katex .fontsize-ensurer.reset-size8.size3,.katex .sizing.reset-size8.size3{font-size:.48611111em}.katex .fontsize-ensurer.reset-size8.size4,.katex .sizing.reset-size8.size4{font-size:.55555556em}.katex .fontsize-ensurer.reset-size8.size5,.katex .sizing.reset-size8.size5{font-size:.625em}.katex .fontsize-ensurer.reset-size8.size6,.katex .sizing.reset-size8.size6{font-size:.69444444em}.katex .fontsize-ensurer.reset-size8.size7,.katex .sizing.reset-size8.size7{font-size:.83333333em}.katex .fontsize-ensurer.reset-size8.size8,.katex .sizing.reset-size8.size8{font-size:1em}.katex .fontsize-ensurer.reset-size8.size9,.katex .sizing.reset-size8.size9{font-size:1.2em}.katex .fontsize-ensurer.reset-size8.size10,.katex .sizing.reset-size8.size10{font-size:1.44027778em}.katex .fontsize-ensurer.reset-size8.size11,.katex .sizing.reset-size8.size11{font-size:1.72777778em}.katex .fontsize-ensurer.reset-size9.size1,.katex .sizing.reset-size9.size1{font-size:.28935185em}.katex .fontsize-ensurer.reset-size9.size2,.katex .sizing.reset-size9.size2{font-size:.34722222em}.katex .fontsize-ensurer.reset-size9.size3,.katex .sizing.reset-size9.size3{font-size:.40509259em}.katex .fontsize-ensurer.reset-size9.size4,.katex .sizing.reset-size9.size4{font-size:.46296296em}.katex .fontsize-ensurer.reset-size9.size5,.katex .sizing.reset-size9.size5{font-size:.52083333em}.katex .fontsize-ensurer.reset-size9.size6,.katex .sizing.reset-size9.size6{font-size:.5787037em}.katex .fontsize-ensurer.reset-size9.size7,.katex .sizing.reset-size9.size7{font-size:.69444444em}.katex .fontsize-ensurer.reset-size9.size8,.katex .sizing.reset-size9.size8{font-size:.83333333em}.katex .fontsize-ensurer.reset-size9.size9,.katex .sizing.reset-size9.size9{font-size:1em}.katex .fontsize-ensurer.reset-size9.size10,.katex .sizing.reset-size9.size10{font-size:1.20023148em}.katex .fontsize-ensurer.reset-size9.size11,.katex .sizing.reset-size9.size11{font-size:1.43981481em}.katex .fontsize-ensurer.reset-size10.size1,.katex .sizing.reset-size10.size1{font-size:.24108004em}.katex .fontsize-ensurer.reset-size10.size2,.katex .sizing.reset-size10.size2{font-size:.28929605em}.katex .fontsize-ensurer.reset-size10.size3,.katex .sizing.reset-size10.size3{font-size:.33751205em}.katex .fontsize-ensurer.reset-size10.size4,.katex .sizing.reset-size10.size4{font-size:.38572806em}.katex .fontsize-ensurer.reset-size10.size5,.katex .sizing.reset-size10.size5{font-size:.43394407em}.katex .fontsize-ensurer.reset-size10.size6,.katex .sizing.reset-size10.size6{font-size:.48216008em}.katex .fontsize-ensurer.reset-size10.size7,.katex .sizing.reset-size10.size7{font-size:.57859209em}.katex .fontsize-ensurer.reset-size10.size8,.katex .sizing.reset-size10.size8{font-size:.69431051em}.katex .fontsize-ensurer.reset-size10.size9,.katex .sizing.reset-size10.size9{font-size:.83317261em}.katex .fontsize-ensurer.reset-size10.size10,.katex .sizing.reset-size10.size10{font-size:1em}.katex .fontsize-ensurer.reset-size10.size11,.katex .sizing.reset-size10.size11{font-size:1.19961427em}.katex .fontsize-ensurer.reset-size11.size1,.katex .sizing.reset-size11.size1{font-size:.20096463em}.katex .fontsize-ensurer.reset-size11.size2,.katex .sizing.reset-size11.size2{font-size:.24115756em}.katex .fontsize-ensurer.reset-size11.size3,.katex .sizing.reset-size11.size3{font-size:.28135048em}.katex .fontsize-ensurer.reset-size11.size4,.katex .sizing.reset-size11.size4{font-size:.32154341em}.katex .fontsize-ensurer.reset-size11.size5,.katex .sizing.reset-size11.size5{font-size:.36173633em}.katex .fontsize-ensurer.reset-size11.size6,.katex .sizing.reset-size11.size6{font-size:.40192926em}.katex .fontsize-ensurer.reset-size11.size7,.katex .sizing.reset-size11.size7{font-size:.48231511em}.katex .fontsize-ensurer.reset-size11.size8,.katex .sizing.reset-size11.size8{font-size:.57877814em}.katex .fontsize-ensurer.reset-size11.size9,.katex .sizing.reset-size11.size9{font-size:.69453376em}.katex .fontsize-ensurer.reset-size11.size10,.katex .sizing.reset-size11.size10{font-size:.83360129em}.katex .fontsize-ensurer.reset-size11.size11,.katex .sizing.reset-size11.size11{font-size:1em}.katex .delimsizing.size1{font-family:KaTeX_Size1}.katex .delimsizing.size2{font-family:KaTeX_Size2}.katex .delimsizing.size3{font-family:KaTeX_Size3}.katex .delimsizing.size4{font-family:KaTeX_Size4}.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}.katex .nulldelimiter{display:inline-block;width:.12em}.katex .delimcenter,.katex .op-symbol{position:relative}.katex .op-symbol.small-op{font-family:KaTeX_Size1}.katex .op-symbol.large-op{font-family:KaTeX_Size2}.katex .op-limits>.vlist-t{text-align:center}.katex .accent>.vlist-t{text-align:center}.katex .accent .accent-body{position:relative}.katex .accent .accent-body:not(.accent-full){width:0}.katex .overlay{display:block}.katex .mtable .vertical-separator{display:inline-block;min-width:1px}.katex .mtable .arraycolsep{display:inline-block}.katex .mtable .col-align-c>.vlist-t{text-align:center}.katex .mtable .col-align-l>.vlist-t{text-align:left}.katex .mtable .col-align-r>.vlist-t{text-align:right}.katex .svg-align{text-align:left}.katex svg{display:block;position:absolute;width:100%;height:inherit;fill:currentColor;stroke:currentColor;fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1}.katex svg path{stroke:none}.katex img{border-style:none;min-width:0;min-height:0;max-width:none;max-height:none}.katex .stretchy{width:100%;display:block;position:relative;overflow:hidden}.katex .stretchy:after,.katex .stretchy:before{content:""}.katex .hide-tail{width:100%;position:relative;overflow:hidden}.katex .halfarrow-left{position:absolute;left:0;width:50.2%;overflow:hidden}.katex .halfarrow-right{position:absolute;right:0;width:50.2%;overflow:hidden}.katex .brace-left{position:absolute;left:0;width:25.1%;overflow:hidden}.katex .brace-center{position:absolute;left:25%;width:50%;overflow:hidden}.katex .brace-right{position:absolute;right:0;width:25.1%;overflow:hidden}.katex .x-arrow-pad{padding:0 .5em}.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}.katex .boxpad{padding:0 .3em}.katex .fbox,.katex .fcolorbox{box-sizing:border-box;border:.04em solid}.katex .cancel-pad{padding:0 .2em}.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}.katex .sout{border-bottom-style:solid;border-bottom-width:.08em}.katex-display{display:block;margin:1em 0;text-align:center}.katex-display>.katex{display:block;text-align:center;white-space:nowrap}.katex-display>.katex>.katex-html{display:block;position:relative}.katex-display>.katex>.katex-html>.tag{position:absolute;right:0}.katex-display.leqno>.katex>.katex-html>.tag{left:0;right:auto}.katex-display.fleqn>.katex{text-align:left;padding-left:2em}
            `}</style>
            <style global jsx>{`
            input[type=radio]{
                width: 50px;
                outline: none;
            }
            input[type=checkbox]{
                outline: none;
            }
            #right-answer {
                display: none;
            }
            #right-answer + label {
                flex: inherit;
                margin: 20px 0;
                margin-right: 8px;
                order: 100;
                text-align: right;
                position: relative;
                display: inline-block;
                padding: 6px 16px;
                font-family: inherit;
                font-weight: 600;
                line-height: 20px;
                white-space: nowrap;
                vertical-align: middle;
                cursor: pointer;
                user-select: none;
                border-radius: 6px;
                appearance: none;
                text-decoration: none;
                text-align: center;
                font-size: 14px;
                color: rgb(255, 255, 255);
                background-color: rgb(46, 164, 79);
                border: 1px solid rgb(34, 134, 58);
                box-shadow: rgba(20, 70, 32, 0.1) 0px 1px 0px, rgba(255, 255, 255, 0.03) 0px 2px 0px;
            }
            #right-answer + label:hover {
                background-color: rgb(44, 151, 75);
                border-color: rgba(27, 31, 35, 0.15);
            }
            #right-answer:checked + label {
                color: rgb(255 255 255 / 80%);
                background-color: #94d3a2;
                border-color: rgba(27,31,35,0.1);
            }
            #right-answer:checked ~ input[type="radio"]:checked+label {
                background-color: rgb(255, 227, 230);
                border-color: rgba(158, 28, 35, 0.2);
            }
            #right-answer:checked ~ #${rightAnswer} + label {
                background-color: rgb(220, 255, 228);
                border-color: rgba(23, 111, 44, 0.2);
            }
            input[type="radio"]:checked+label {
                background-color: rgb(219, 237, 255);
                border-color: rgba(4, 66, 137, 0.2);
            }
            label {
                flex: 0 calc(100% - 50px);
                padding: 16px;
                border-radius: 6px;
                border: solid 1px #fff;
            }
            #solution {
                margin-left: 16px;
                order: 103;
                display: none;
            }
            #solution + label {
                flex: inherit;
                text-align: right;
                order: 102;
                position: relative;
                display: inline-block;
                padding: 6px 16px;
                font-family: inherit;
                font-weight: 600;
                line-height: 20px;
                white-space: nowrap;
                vertical-align: middle;
                cursor: pointer;
                user-select: none;
                border-radius: 6px;
                appearance: none;
                text-decoration: none;
                text-align: center;
                font-size: 14px;
                color: rgb(36, 41, 46);
                background-color: rgb(250, 251, 252);
                border: 1px solid rgba(27, 31, 35, 0.12);
                box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 2px 0px;
            }
            #solution:checked + label {
                color: rgb(149, 157, 165);
                background-color: rgb(250, 251, 252);
                border-color: rgb(234, 236, 239);
            }
            .q {
                flex-basis: 100%;
            }
            .r, .s {display:none;}
            #solution:checked ~ .s {
                display: block;
                order: 104;
                flex-basis: 100%;
            }

            .qmd {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
            }

            .qmd label > p {
                margin: 0;
            }

            @media (max-width: 767px) {
                .qmd {
                    padding: 15px;
                }
            }

            .qmd :global(.octicon) {
                display: inline-block;
                fill: currentColor;
                vertical-align: text-bottom;
            }

            .qmd :global(.anchor) {
                float: left;
                line-height: 1;
                margin-left: -20px;
                padding-right: 4px;
            }

            .qmd :global(.anchor:focus) {
                outline: none;
            }

            .qmd h1 :global(.octicon-link),
            .qmd h2 :global(.octicon-link),
            .qmd h3 :global(.octicon-link),
            .qmd h4 :global(.octicon-link),
            .qmd h5 :global(.octicon-link),
            .qmd h6 :global(.octicon-link) {
                color: #1b1f23;
                vertical-align: middle;
                visibility: hidden;
            }

            .qmd h1:hover :global(.anchor),
            .qmd h2:hover :global(.anchor),
            .qmd h3:hover :global(.anchor),
            .qmd h4:hover :global(.anchor),
            .qmd h5:hover :global(.anchor),
            .qmd h6:hover :global(.anchor) {
                text-decoration: none;
            }

            .qmd h1:hover :global(.anchor) :global(.octicon-link),
            .qmd h2:hover :global(.anchor) :global(.octicon-link),
            .qmd h3:hover :global(.anchor) :global(.octicon-link),
            .qmd h4:hover :global(.anchor) :global(.octicon-link),
            .qmd h5:hover :global(.anchor) :global(.octicon-link),
            .qmd h6:hover :global(.anchor) :global(.octicon-link) {
                visibility: visible;
            }

            .qmd h1:hover :global(.anchor) :global(.octicon-link:before),
            .qmd h2:hover :global(.anchor) :global(.octicon-link:before),
            .qmd h3:hover :global(.anchor) :global(.octicon-link:before),
            .qmd h4:hover :global(.anchor) :global(.octicon-link:before),
            .qmd h5:hover :global(.anchor) :global(.octicon-link:before),
            .qmd h6:hover :global(.anchor) :global(.octicon-link:before) {
                width: 16px;
                height: 16px;
                content: ' ';
                display: inline-block;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'%3E%3Cpath fill-rule='evenodd' d='M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z'%3E%3C/path%3E%3C/svg%3E");
            }

            .qmd {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
                line-height: 1.5;
                color: #24292e;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
                font-size: 16px;
                line-height: 1.5;
                word-wrap: break-word;
            }

            .qmd details {
                display: block;
            }

            .qmd summary {
                display: list-item;
            }

            .qmd a {
                background-color: initial;
            }

            .qmd a:active,
            .qmd a:hover {
                outline-width: 0;
            }

            .qmd strong {
                font-weight: inherit;
                font-weight: bolder;
            }

            .qmd h1 {
                font-size: 2em;
                margin: .67em 0;
            }

            .qmd img {
                border-style: none;
            }

            .qmd code,
            .qmd kbd,
            .qmd pre {
                font-family: monospace, monospace;
                font-size: 1em;
            }

            .qmd hr {
                box-sizing: initial;
                height: 0;
                overflow: visible;
            }

            .qmd input {
                font: inherit;
                margin: 0;
            }

            .qmd input {
                overflow: visible;
            }

            .qmd [type=checkbox] {
                box-sizing: border-box;
                padding: 0;
            }

            .qmd * {
                box-sizing: border-box;
            }

            .qmd input {
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
            }

            .qmd a {
                color: #0366d6;
                text-decoration: none;
            }

            .qmd a:hover {
                text-decoration: underline;
            }

            .qmd strong {
                font-weight: 600;
            }

            .qmd hr {
                height: 0;
                margin: 15px 0;
                overflow: hidden;
                background: transparent;
                border: 0;
                border-bottom: 1px solid #dfe2e5;
            }

            .qmd hr:after,
            .qmd hr:before {
                display: table;
                content: "";
            }

            .qmd hr:after {
                clear: both;
            }

            .qmd table {
                border-spacing: 0;
                border-collapse: collapse;
            }

            .qmd td,
            .qmd th {
                padding: 0;
            }

            .qmd details summary {
                cursor: pointer;
            }

            .qmd kbd {
                display: inline-block;
                padding: 3px 5px;
                font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
                line-height: 10px;
                color: #444d56;
                vertical-align: middle;
                background-color: #fafbfc;
                border: 1px solid #d1d5da;
                border-radius: 3px;
                box-shadow: inset 0 -1px 0 #d1d5da;
            }

            .qmd h1,
            .qmd h2,
            .qmd h3,
            .qmd h4,
            .qmd h5,
            .qmd h6 {
                margin-top: 0;
                margin-bottom: 0;
            }

            .qmd h1 {
                font-size: 32px;
            }

            .qmd h1,
            .qmd h2 {
                font-weight: 600;
            }

            .qmd h2 {
                font-size: 24px;
            }

            .qmd h3 {
                font-size: 20px;
            }

            .qmd h3,
            .qmd h4 {
                font-weight: 600;
            }

            .qmd h4 {
                font-size: 16px;
            }

            .qmd h5 {
                font-size: 14px;
            }

            .qmd h5,
            .qmd h6 {
                font-weight: 600;
            }

            .qmd h6 {
                font-size: 12px;
            }

            .qmd p {
                margin-top: 0;
                margin-bottom: 10px;
            }

            .qmd blockquote {
                margin: 0;
            }

            .qmd ol,
            .qmd ul {
                padding-left: 0;
                margin-top: 0;
                margin-bottom: 0;
            }

            .qmd ol ol,
            .qmd ul ol {
                list-style-type: lower-roman;
            }

            .qmd ol ol ol,
            .qmd ol ul ol,
            .qmd ul ol ol,
            .qmd ul ul ol {
                list-style-type: lower-alpha;
            }

            .qmd dd {
                margin-left: 0;
            }

            .qmd code,
            .qmd pre {
                font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
                font-size: 12px;
            }

            .qmd pre {
                margin-top: 0;
                margin-bottom: 0;
            }

            .qmd input::-webkit-inner-spin-button,
            .qmd input::-webkit-outer-spin-button {
                margin: 0;
                -webkit-appearance: none;
                appearance: none;
            }

            .qmd :checked+:global(.radio-label) {
                position: relative;
                z-index: 1;
                border-color: #0366d6;
            }

            .qmd :global(.border) {
                border: 1px solid #e1e4e8!important;
            }

            .qmd :global(.border-0) {
                border: 0!important;
            }

            .qmd :global(.border-bottom) {
                border-bottom: 1px solid #e1e4e8!important;
            }

            .qmd :global(.rounded-1) {
                border-radius: 3px!important;
            }

            .qmd :global(.bg-white) {
                background-color: #fff!important;
            }

            .qmd :global(.bg-gray-light) {
                background-color: #fafbfc!important;
            }

            .qmd :global(.text-gray-light) {
                color: #6a737d!important;
            }

            .qmd :global(.mb-0) {
                margin-bottom: 0!important;
            }

            .qmd :global(.my-2) {
                margin-top: 8px!important;
                margin-bottom: 8px!important;
            }

            .qmd :global(.pl-0) {
                padding-left: 0!important;
            }

            .qmd :global(.py-0) {
                padding-top: 0!important;
                padding-bottom: 0!important;
            }

            .qmd :global(.pl-1) {
                padding-left: 4px!important;
            }

            .qmd :global(.pl-2) {
                padding-left: 8px!important;
            }

            .qmd :global(.py-2) {
                padding-top: 8px!important;
                padding-bottom: 8px!important;
            }

            .qmd :global(.pl-3),
            .qmd :global(.px-3) {
                padding-left: 16px!important;
            }

            .qmd :global(.px-3) {
                padding-right: 16px!important;
            }

            .qmd :global(.pl-4) {
                padding-left: 24px!important;
            }

            .qmd :global(.pl-5) {
                padding-left: 32px!important;
            }

            .qmd :global(.pl-6) {
                padding-left: 40px!important;
            }

            .qmd :global(.f6) {
                font-size: 12px!important;
            }

            .qmd :global(.lh-condensed) {
                line-height: 1.25!important;
            }

            .qmd :global(.text-bold) {
                font-weight: 600!important;
            }

            .qmd :global(.pl-c) {
                color: #6a737d;
            }

            .qmd :global(.pl-c1),
            .qmd :global(.pl-s .pl-v) {
                color: #005cc5;
            }

            .qmd :global(.pl-e),
            .qmd :global(.pl-en) {
                color: #6f42c1;
            }

            .qmd :global(.pl-s) :global(.pl-s1),
            .qmd :global(.pl-smi) {
                color: #24292e;
            }

            .qmd :global(.pl-ent) {
                color: #22863a;
            }

            .qmd :global(.pl-k) {
                color: #d73a49;
            }

            .qmd :global(.pl-pds),
            .qmd :global(.pl-s),
            .qmd :global(.pl-s) :global(.pl-pse) :global(.pl-s1),
            .qmd :global(.pl-sr),
            .qmd :global(.pl-sr) :global(.pl-cce),
            .qmd :global(.pl-sr) :global(.pl-sra),
            .qmd :global(.pl-sr) :global(.pl-sre) {
                color: #032f62;
            }

            .qmd :global(.pl-smw),
            .qmd :global(.pl-v) {
                color: #e36209;
            }

            .qmd :global(.pl-bu) {
                color: #b31d28;
            }

            .qmd :global(.pl-ii) {
                color: #fafbfc;
                background-color: #b31d28;
            }

            .qmd :global(.pl-c2) {
                color: #fafbfc;
                background-color: #d73a49;
            }

            .qmd :global(.pl-c2:before) {
                content: "^M";
            }

            .qmd :global(.pl-sr) :global(.pl-cce) {
                font-weight: 700;
                color: #22863a;
            }

            .qmd :global(.pl-ml) {
                color: #735c0f;
            }

            .qmd :global(.pl-mh),
            .qmd :global(.pl-mh) :global(.pl-en),
            .qmd :global(.pl-ms) {
                font-weight: 700;
                color: #005cc5;
            }

            .qmd :global(.pl-mi) {
                font-style: italic;
                color: #24292e;
            }

            .qmd :global(.pl-mb) {
                font-weight: 700;
                color: #24292e;
            }

            .qmd :global(.pl-md) {
                color: #b31d28;
                background-color: #ffeef0;
            }

            .qmd :global(.pl-mi1) {
                color: #22863a;
                background-color: #f0fff4;
            }

            .qmd :global(.pl-mc) {
                color: #e36209;
                background-color: #ffebda;
            }

            .qmd :global(.pl-mi2) {
                color: #f6f8fa;
                background-color: #005cc5;
            }

            .qmd :global(.pl-mdr) {
                font-weight: 700;
                color: #6f42c1;
            }

            .qmd :global(.pl-ba) {
                color: #586069;
            }

            .qmd :global(.pl-sg) {
                color: #959da5;
            }

            .qmd :global(.pl-corl) {
                text-decoration: underline;
                color: #032f62;
            }

            .qmd :global(.mb-0) {
                margin-bottom: 0!important;
            }

            .qmd :global(.my-2) {
                margin-bottom: 8px!important;
            }

            .qmd :global(.my-2) {
                margin-top: 8px!important;
            }

            .qmd :global(.pl-0) {
                padding-left: 0!important;
            }

            .qmd :global(.py-0) {
                padding-top: 0!important;
                padding-bottom: 0!important;
            }

            .qmd :global(.pl-1) {
                padding-left: 4px!important;
            }

            .qmd :global(.pl-2) {
                padding-left: 8px!important;
            }

            .qmd :global(.py-2) {
                padding-top: 8px!important;
                padding-bottom: 8px!important;
            }

            .qmd :global(.pl-3) {
                padding-left: 16px!important;
            }

            .qmd :global(.pl-4) {
                padding-left: 24px!important;
            }

            .qmd :global(.pl-5) {
                padding-left: 32px!important;
            }

            .qmd :global(.pl-6) {
                padding-left: 40px!important;
            }

            .qmd :global(.pl-7) {
                padding-left: 48px!important;
            }

            .qmd :global(.pl-8) {
                padding-left: 64px!important;
            }

            .qmd :global(.pl-9) {
                padding-left: 80px!important;
            }

            .qmd :global(.pl-10) {
                padding-left: 96px!important;
            }

            .qmd :global(.pl-11) {
                padding-left: 112px!important;
            }

            .qmd :global(.pl-12) {
                padding-left: 128px!important;
            }

            .qmd hr {
                border-bottom-color: #eee;
            }

            .qmd kbd {
                display: inline-block;
                padding: 3px 5px;
                font: 11px SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
                line-height: 10px;
                color: #444d56;
                vertical-align: middle;
                background-color: #fafbfc;
                border: 1px solid #d1d5da;
                border-radius: 3px;
                box-shadow: inset 0 -1px 0 #d1d5da;
            }

            .markdown-body:after,
            .markdown-body:before {
                display: table;
                content: "";
            }

            .markdown-body:after {
                clear: both;
            }

            .markdown-body>:first-child {
                margin-top: 0!important;
            }

            .markdown-body>:last-child {
                margin-bottom: 0!important;
            }

            .qmd a:not([href]) {
                color: inherit;
                text-decoration: none;
            }

            .qmd blockquote,
            .qmd details,
            .qmd dl,
            .qmd ol,
            .qmd p,
            .qmd pre,
            .qmd table,
            .qmd ul {
                margin-top: 0;
                margin-bottom: 16px;
            }

            .qmd hr {
                height: .25em;
                padding: 0;
                margin: 24px 0;
                background-color: #e1e4e8;
                border: 0;
            }

            .qmd blockquote {
                padding: 0 1em;
                color: #6a737d;
                border-left: .25em solid #dfe2e5;
            }

            .qmd blockquote>:first-child {
                margin-top: 0;
            }

            .qmd blockquote>:last-child {
                margin-bottom: 0;
            }

            .qmd h1,
            .qmd h2,
            .qmd h3,
            .qmd h4,
            .qmd h5,
            .qmd h6 {
                margin-top: 24px;
                margin-bottom: 16px;
                font-weight: 600;
                line-height: 1.25;
            }

            .qmd h1 {
                font-size: 2em;
            }

            .qmd h1,
            .qmd h2 {
                padding-bottom: .3em;
                border-bottom: 1px solid #eaecef;
            }

            .qmd h2 {
                font-size: 1.5em;
            }

            .qmd h3 {
                font-size: 1.25em;
            }

            .qmd h4 {
                font-size: 1em;
            }

            .qmd h5 {
                font-size: .875em;
            }

            .qmd h6 {
                font-size: .85em;
                color: #6a737d;
            }

            .qmd ol,
            .qmd ul {
                padding-left: 2em;
            }

            .qmd ol ol,
            .qmd ol ul,
            .qmd ul ol,
            .qmd ul ul {
                margin-top: 0;
                margin-bottom: 0;
            }

            .qmd li {
                word-wrap: break-all;
            }

            .qmd li>p {
                margin-top: 16px;
            }

            .qmd li+li {
                margin-top: .25em;
            }

            .qmd dl {
                padding: 0;
            }

            .qmd dl dt {
                padding: 0;
                margin-top: 16px;
                font-size: 1em;
                font-style: italic;
                font-weight: 600;
            }

            .qmd dl dd {
                padding: 0 16px;
                margin-bottom: 16px;
            }

            .qmd table {
                display: block;
                width: 100%;
                overflow: auto;
            }

            .qmd table th {
                font-weight: 600;
            }

            .qmd table td,
            .qmd table th {
                padding: 6px 13px;
                border: 1px solid #dfe2e5;
            }

            .qmd table tr {
                background-color: #fff;
                border-top: 1px solid #c6cbd1;
            }

            .qmd table tr:nth-child(2n) {
                background-color: #f6f8fa;
            }

            .qmd img {
                max-width: 100%;
                box-sizing: initial;
                background-color: #fff;
            }

            .qmd img[align=right] {
                padding-left: 20px;
            }

            .qmd img[align=left] {
                padding-right: 20px;
            }

            .qmd code {
                padding: .2em .4em;
                margin: 0;
                font-size: 85%;
                background-color: rgba(27, 31, 35, .05);
                border-radius: 3px;
            }

            .qmd pre {
                word-wrap: normal;
            }

            .qmd pre>code {
                padding: 0;
                margin: 0;
                font-size: 100%;
                word-break: normal;
                white-space: pre;
                background: transparent;
                border: 0;
            }

            .qmd :global(.highlight) {
                margin-bottom: 16px;
            }

            .qmd :global(.highlight) pre {
                margin-bottom: 0;
                word-break: normal;
            }

            .qmd :global(.highlight) pre,
            .qmd pre {
                padding: 16px;
                overflow: auto;
                font-size: 85%;
                line-height: 1.45;
                background-color: #f6f8fa;
                border-radius: 3px;
            }

            .qmd pre code {
                display: inline;
                max-width: auto;
                padding: 0;
                margin: 0;
                overflow: visible;
                line-height: inherit;
                word-wrap: normal;
                background-color: initial;
                border: 0;
            }

            .qmd :global(.commit-tease-sha) {
                display: inline-block;
                font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
                font-size: 90%;
                color: #444d56;
            }

            .qmd :global(.full-commit) :global(.btn-outline:not(:disabled):hover) {
                color: #005cc5;
                border-color: #005cc5;
            }

            .qmd :global(.blob-wrapper) {
                overflow-x: auto;
                overflow-y: hidden;
            }

            .qmd :global(.blob-wrapper-embedded) {
                max-height: 240px;
                overflow-y: auto;
            }

            .qmd :global(.blob-num) {
                width: 1%;
                min-width: 50px;
                padding-right: 10px;
                padding-left: 10px;
                font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
                font-size: 12px;
                line-height: 20px;
                color: rgba(27, 31, 35, .3);
                text-align: right;
                white-space: nowrap;
                vertical-align: top;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .qmd :global(.blob-num:hover) {
                color: rgba(27, 31, 35, .6);
            }

            .qmd :global(.blob-num:before) {
                content: attr(data-line-number);
            }

            .qmd :global(.blob-code) {
                position: relative;
                padding-right: 10px;
                padding-left: 10px;
                line-height: 20px;
                vertical-align: top;
            }

            .qmd :global(.blob-code-inner) {
                overflow: visible;
                font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
                font-size: 12px;
                color: #24292e;
                word-wrap: normal;
                white-space: pre;
            }

            .qmd :global(.pl-token.active),
            .qmd :global(.pl-token:hover) {
                cursor: pointer;
                background: #ffea7f;
            }

            .qmd :global(.tab-size[data-tab-size="1"]) {
                -moz-tab-size: 1;
                tab-size: 1;
            }

            .qmd :global(.tab-size[data-tab-size="2"]) {
                -moz-tab-size: 2;
                tab-size: 2;
            }

            .qmd :global(.tab-size[data-tab-size="3"]) {
                -moz-tab-size: 3;
                tab-size: 3;
            }

            .qmd :global(.tab-size[data-tab-size="4"]) {
                -moz-tab-size: 4;
                tab-size: 4;
            }

            .qmd :global(.tab-size[data-tab-size="5"]) {
                -moz-tab-size: 5;
                tab-size: 5;
            }

            .qmd :global(.tab-size[data-tab-size="6"]) {
                -moz-tab-size: 6;
                tab-size: 6;
            }

            .qmd :global(.tab-size[data-tab-size="7"]) {
                -moz-tab-size: 7;
                tab-size: 7;
            }

            .qmd :global(.tab-size[data-tab-size="8"]) {
                -moz-tab-size: 8;
                tab-size: 8;
            }

            .qmd :global(.tab-size[data-tab-size="9"]) {
                -moz-tab-size: 9;
                tab-size: 9;
            }

            .qmd :global(.tab-size[data-tab-size="10"]) {
                -moz-tab-size: 10;
                tab-size: 10;
            }

            .qmd :global(.tab-size[data-tab-size="11"]) {
                -moz-tab-size: 11;
                tab-size: 11;
            }

            .qmd :global(.tab-size[data-tab-size="12"]) {
                -moz-tab-size: 12;
                tab-size: 12;
            }

            .qmd :global(.task-list-item) {
                list-style-type: none;
            }

            .qmd :global(.task-list-item)+:global(.task-list-item) {
                margin-top: 3px;
            }

            .qmd :global(.task-list-item) input {
                margin: 0 .2em .25em -1.6em;
                vertical-align: middle;
            }
            `}</style>
        </>
    )
}