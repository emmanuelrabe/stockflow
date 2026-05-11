import { Outlet, Navigate } from 'react-router'

import { useAuth } from '@hooks/useAuth'

const ProtectedRoute: React.FC = () => {
    const { user, isLoading } = useAuth()

    if (isLoading) return <div>Chargement...</div>

    if (!user) return <Navigate to="/login" />

    return <Outlet />
}

export default ProtectedRoute
