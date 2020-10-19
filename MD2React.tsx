import React, { ReactElement } from 'react';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import rehype2react from 'rehype-react';
import remark from 'remark';
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import { absolute } from './lib/utils';
import styles from './styles/MD2React.module.css'
/**
 * Returns a React component which renders markdown with latex
 * @param md markdown string
 */
export const MD2React: React.FC<{md: string, url: string}> = props => 
    <div className={styles.MD2React}>{
    remark()
    //.use(oembed)
    .use(math)
    .use(remark2rehype)
    .use(katex)
    .use(inspectUrls, {
        inspectEach({ url, node }) {
            if(new RegExp("^(?!www\.|(?:http|ftp)s?://|[A-Za-z]:\\|//).*").test(url)){
                node.properties.src = absolute(props.url, url)
                console.log(props.url, url)
            }
        },  
        selectors: [
          "img[src]"
        ]
      })
    // .use(stringify)
    .use(rehype2react, { createElement: React.createElement })
    // .process(md, function(err, file) {
    //     if (err) throw err
    //     console.log(String(file))
    //   })
    .processSync(props.md).result}
    </div>