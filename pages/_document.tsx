/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-ignore
import bundleCss from '!raw-loader!../styles/tailwindSSR.css'
import Document from 'next/document'

//export default Document

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const page = ctx.renderPage((App) => (props) => <App {...props} />)
    const initialProps: any = await Document.getInitialProps(ctx)

    const styles = initialProps.styles

    if (process.env.NODE_ENV == 'production') {
      styles.unshift(
        <style
          key="custom"
          dangerouslySetInnerHTML={{
            __html: bundleCss,
          }}
        />
      )
    }

    return {
      ...page,
      styles,
    }
  }
}
