import { useRouter } from "next/router"
import ReactMarkdown from 'react-markdown'
import { supabase } from '../../utils/api'

export default function Post({ post }) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>加载中</div>
    }
    return (
        <>
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <div className="my-4 text-gray-600">作者:{post.user_email}</div>
            <ReactMarkdown className='prose' children={post.content} />
        </>
    )

}


export async function getStaticPaths() {
    const res = await supabase
        .from('posts')
        .select('id')

    const paths = res.data.map(post => ({ params: { id: JSON.stringify(post.id) } }))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const { data } = await supabase
        .from('posts')
        .select()
        .filter('id', 'eq', params.id)
        .single()
    return {
        props: {
            post: data
        }
    }
}