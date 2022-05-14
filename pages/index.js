import Head from 'next/head'
import { supabase } from '../utils/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'


export default function Home() {
    let [posts, setPosts] = useState([])
    let [loading, setLoading] = useState(true)


    useEffect(async () => {
        let res = await supabase.from('posts').select()
        setPosts(res.data)
        setLoading(false)
    }, [])

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
                    posts?.length ?
                        (
                            posts.map((post) => (
                                <Link key={post.id} href={`/posts/${post.id}`}>
                                    <div className='border-b py-4 cursor-pointer'>
                                        <h2 className='text-xl text-black font-bold'>{post.title}</h2>
                                        <p className='pt-2 text-gray-500'>作者: {post.user_email}</p>
                                    </div>
                                </Link>
                            ))
                        )
                        :
                        <h1 className='text-2xl'>
                            加载中.....
                        </h1>
            }
        </>
    )
}