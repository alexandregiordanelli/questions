import React, { ReactElement } from 'react';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import rehype2react from 'rehype-react';
import remark from 'remark';
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import { absolute } from './lib/absolute';

/**
 * Returns a React component which renders markdown with latex
 * @param md markdown string
 */
export const MD2React: React.FC<{md: string, url: string}> = props => remark()
    //.use(oembed)
    .use(math)
    .use(remark2rehype)
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
    // .use(stringify)
    .use(rehype2react, { createElement: React.createElement })
    // .process(md, function(err, file) {
    //     if (err) throw err
    //     console.log(String(file))
    //   })
    .processSync(props.md).result as ReactElement;