import { supabase } from '../../utils/api'
import { useRouter } from 'next/router'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

export default function EditPost() {
  const router = useRouter()
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    // isReady 后才可以获取到rouoter.query.id
    if (!router.isReady) return
    const res = await supabase
      .from('posts')
      .select()
      .filter('id', 'eq', router.query.id)
      .single()
    setPost(res.data)
    setLoading(false)
  }, [router.isReady])

  if (loading) return <div className="">加载中......</div>
  function changePost(e) {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  async function updatePost() {
    await supabase
      .from('posts')
      .update({ ...post })
      .match({ id: router.query.id })
    router.push('/my-posts')
  }

  return (
    <>
      <input
        name="title"
        value={post.title}
        onChange={changePost}
        className="border-b outline-none w-full text-2xl text-gray-600 py-3"
        placeholder="请输入标题"
      />
      <SimpleMDE
        value={post.content}
        className="mt-8"
        onChange={(value) =>
          Object.assign(post, {
            content: value,
          })
        }
      />
      <div className="w-full flex justify-center">
        <button
          className="bg-blue-500 py-2 px-10 rounded text-gray-50 font-semibold my-auto"
          onClick={updatePost}
        >
          更新
        </button>
      </div>
    </>
  )
}
