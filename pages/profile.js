import { Auth, Typography, Button } from '@supabase/ui'
import { supabase } from '../utils/api'


const Container = (props) => {
    const { user } = Auth.useUser()
    console.log(user)
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
        <Auth.UserContextProvider supabaseClient={supabase}>
            <Container supabaseClient={supabase}>
                <Auth supabaseClient={supabase} providers={['google', 'facebook', 'github']} />
            </Container>
        </Auth.UserContextProvider>
    )
}