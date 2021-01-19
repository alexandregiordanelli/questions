import React, { ReactElement } from 'react'
import math from 'remark-math'
import remark2rehype from 'remark-rehype'
import katex from 'rehype-katex'
import unified from 'unified'
import rehype2react from 'rehype-react'
import markdown from 'remark-parse'
import gfm from 'remark-gfm'
import 'katex/dist/contrib/mhchem.js'
import { Img } from './Img'
import { useAmp } from 'next/amp'
export const QuestionFieldComponent: React.FC<{
  md: string
}> = (props) => {
  const isAmp = useAmp()
  return (
    unified()
      .use(markdown)
      .use(math)
      .use(gfm)
      .use(remark2rehype)
      .use(katex, {
        output: isAmp ? 'html' : 'htmlAndMathml',
      })
      // .use(inspectUrls, {
      //     inspectEach({ url, node }) {
      //         if(new RegExp("^(?!www\.|(?:http|ftp)s?://|[A-Za-z]:\\|//).*").test(url)){
      //             node.properties.src = absolute(filePath, url)
      //         }
      //     },
      //     selectors: [
      //         "img[src]"
      //     ]
      // })
      .use(rehype2react, {
        createElement: React.createElement,
        Fragment: React.Fragment,
        components: {
          img: Img,
        },
      })
      .processSync(props.md).result as ReactElement
  )
}
