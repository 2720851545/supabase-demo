import { supabase } from '../utils/api'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function MyPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(async () => {
    supabase
      .from('posts')
      .on('*', (payload) => {
        fetchPosts()
      })
      .subscribe()
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setLoading(true)
    const user = await supabase.auth.user()
    const res = await supabase
      .from('posts')
      .select('*')
      .filter('user_id', 'eq', user.id)
    setPosts(res.data)
    setLoading(false)
  }

  async function delPost(id) {
    await supabase.from('posts').delete('id', 'eq', id).match({ id })
    fetchPosts()
  }

  if (loading) return <div className="text-2xl">加载中......</div>
  return (
    <>
      <Head>
        <title>我的文章列表</title>
      </Head>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="font-semibold text-2xl">{post.title}</div>
          <div className="my-3">
            <div className="inline">
              作者: <span className="text-gray-500">{post.user_email}</span>
            </div>
            <div className="ml-4 inline">
              创建时间:
              <span className="text-gray-500">
                {new Date(post.inserted_at).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="mb-3 border-b">
            <a
              className="cursor-pointer text-blue-500 mr-4"
              onClick={() => router.push(`/edit-post/${post.id}`)}
            >
              编辑文章
            </a>
            <a
              className="cursor-pointer text-blue-500 mr-4"
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              查看文章
            </a>
            <a
              className="cursor-pointer text-red-500 mr-4"
              onClick={() => delPost(post.id)}
            >
              删除文章
            </a>
          </div>
        </div>
      ))}
    </>
  )
}
