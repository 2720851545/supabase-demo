import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/api'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

export default function CreatePost() {
  const router = useRouter()
  const [post, setPost] = useState({
    title: '',
    content: '',
  })

  function changePost(e) {
    setPost(() =>
      Object.assign(post, {
        [e.target.name]: e.target.value,
      })
    )
  }

  async function createPost() {
    if (!post.title || !post.content) {
      return
    }

    const { id, email } = supabase.auth.user()

    const res = await supabase
      .from('posts')
      .insert({ ...post, user_id: id, user_email: email })
      .single()
    router.push(`/posts/${res.data.id}`)
  }

  return (
    <>
      <input
        name="title"
        onChange={changePost}
        className="border-b outline-none w-full text-2xl text-gray-600 py-3"
        placeholder="请输入标题"
      />
      <SimpleMDE
        className="mt-8"
        onChange={(value) =>
          Object.assign(post, {
            content: value,
          })
        }
      />
      <div className="w-full flex justify-center">
        <button
          className="bg-green-500 py-2 px-10 rounded text-gray-50 font-semibold my-auto"
          onClick={createPost}
        >
          提交
        </button>
      </div>
    </>
  )
}
