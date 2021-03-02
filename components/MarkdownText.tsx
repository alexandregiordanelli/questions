import React, { ReactElement } from 'react'
import math from 'remark-math'
import remark2rehype from 'remark-rehype'
import katex from 'rehype-katex'
import unified from 'unified'
import rehype2react from 'rehype-react'
import markdown from 'remark-parse'
import gfm from 'remark-gfm'
import 'katex/dist/contrib/mhchem.js'
import { useAmp } from 'next/amp'
import inspectUrls from '@jsdevtools/rehype-url-inspector'
import highlight from 'rehype-highlight'
export const MarkdownText: React.FC<{
  md: string
}> = (props) => {
  const isAmp = useAmp()
  return unified()
    .use(markdown)
    .use(math)
    .use(gfm)
    .use(remark2rehype)
    .use(highlight)
    .use(katex, {
      output: isAmp ? 'html' : 'htmlAndMathml',
    })
    .use(inspectUrls, {
      inspectEach({ url, node }) {
        // if (new RegExp('^(?!www.|(?:http|ftp)s?://|[A-Za-z]:\\|//).*').test(url)) {
        //   node.properties.src = absolute(filePath, url)
        // }
        node.properties.src = `https://assets.questionsof.com/${url}`
      },
      selectors: ['img[src]'],
    })
    .use(rehype2react, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      // components: {
      //   img: Img,
      // },
    })
    .processSync(props.md).result as ReactElement
}
