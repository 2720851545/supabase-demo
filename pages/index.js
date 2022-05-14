import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
    let [loading, setLoading] = useState(true)

    return (
        <>
            <Head>
                <title>文章列表</title>
            </Head>

            {
                loading ?
                    <h1 className='text-2xl'>
                        加载中.....
                    </h1>
                    :
                    <div>

                    </div>
            }
        </>
    )
}