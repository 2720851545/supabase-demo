import { Auth, Typography, Button } from '@supabase/ui'
import { supabase } from '../utils/api'
import Head from 'next/head'

const Container = (props) => {
    const { user } = Auth.useUser()
    if (user)
        return (
            <>
                <Typography.Text>Signed in: {user.email}</Typography.Text>
                <Button block onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </>
        )
    return props.children
}

export default function AuthBasic() {
    return (
        <>
            <Head>
                <title>用户信息</title>
            </Head>
            <Auth.UserContextProvider supabaseClient={supabase}>
                <Container supabaseClient={supabase}>
                    <Auth supabaseClient={supabase} providers={['github']} />
                </Container>
            </Auth.UserContextProvider>
        </>
    )
}