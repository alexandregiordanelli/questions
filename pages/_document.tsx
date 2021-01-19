// @ts-ignore
import bundleCss from "!raw-loader!../styles/tailwindSSR.css";
import Document from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const page = ctx.renderPage((App) => (props) => <App {...props} />);
    const initialProps: any = await Document.getInitialProps(ctx);
    return {
      ...page,
      styles: [
        ...initialProps.styles,
        process.env.NODE_ENV === 'production' ? <style
          key="custom"
          dangerouslySetInnerHTML={{
            __html: bundleCss,
          }}
        />: <></>,
      ],
    };
  }
}