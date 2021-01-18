

import Document, { Html, Head, Main, NextScript } from "next/document" 
import { readFileSync } from "fs"
import { join } from "path"

class InlineStylesHead extends Head {
    getCssLinks({ allFiles }) {
        return allFiles
          .filter((file) => file.endsWith('.css'))
          .map((file) => (
            <style
              key={file}
              nonce={this.props.nonce}
              dangerouslySetInnerHTML={{
                __html: readFileSync(join('.next', file), 'utf-8'),
              }}
            />
          ));
      }
}

export default class CustomDocument extends Document {
  render() {
    return (
        <Html>
            <InlineStylesHead />
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    )
  }
}