import Router from 'next/router'
import { Provider } from 'next-auth/client'
import NProgress from 'nprogress'
import "tailwindcss/tailwind.css"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <Component {...pageProps} />
            <style jsx global>{`
            #nprogress .bar {
                background: rgb(33,136,255);
            }
            `}</style>
        </Provider>
    )
}