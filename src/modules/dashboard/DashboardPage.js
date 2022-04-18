import Layout from '../../components/Layout'
import useAuthentication from '../authentication/services/AuthenticationState'

export default function DashboardPage() {

    const { user } = useAuthentication()

    return (
        <Layout>
            <h1>Welcome, {user.username}</h1>
        </Layout>
    )
}