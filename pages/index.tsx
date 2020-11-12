import React from 'react'
import { GetStaticProps } from 'next'
import Link from 'next/link'

type IndexPageProps = {

}
export default function IndexPage() {

    return <h1><Link href="/enem"><a>Enem</a></Link></h1>

}


export const getStaticProps: GetStaticProps = async () => {

    return {
        props: { 

        },
        revalidate: 1,
    }
}

export const config = { amp: 'hybrid' }