import Router from 'next/router'
import NProgress from 'nprogress'
import "tailwindcss/tailwind.css"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <style jsx global>{`
            #nprogress .bar {
                background: rgb(33,136,255);
            }
            `}</style>
        </>
    )
}