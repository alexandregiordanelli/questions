/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-ignore
import bundleCss from '!raw-loader!../styles/tailwindSSR.css'
import { GA_TRACKING_ID } from 'lib/gtag'
import Document, { Html, Head, Main, NextScript } from 'next/document'

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

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
            integrity="sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg=="
            crossOrigin="anonymous"
          />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "5vdcbzocf9");
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
