// pages/_app.js
import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/api'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  // 只会在第一次渲染时执行
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    )
    checkUser()
    // 清除effect 取消监听,这里只会在卸载组件的时候调用
    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const handleRouteChange = (url) => {
    window.gtag('config', 'G-88451X95G5', {
      page_path: url,
    })
  }

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  async function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }
  return (
    <div>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/">
          <span className="mr-6 cursor-pointer">文章列表</span>
        </Link>
        {user && (
          <>
            <Link href="/create-post">
              <span className="mr-6 cursor-pointer">创建文章</span>
            </Link>
            <Link href="/my-posts">
              <span className="mr-6 cursor-pointer">我的文章</span>
            </Link>
          </>
        )}
        <Link href="/profile">
          <span className="mr-6 cursor-pointer">用户信息</span>
        </Link>
      </nav>
      <div className="py-8 px-16">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
