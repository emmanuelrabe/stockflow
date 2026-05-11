import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface User {
    id: string
    login: string
    name: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (userData: User, token: string) => void
    logout: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const savedToken = localStorage.getItem('token')

            if (savedToken) {
                // TODO: Faire un appel API "GET /me" pour valider le token
                const fakeUser: User = { id: 'djkflsdfsfdf', login: 'userlogin', name: 'Jhon Doe' }
                setUser(fakeUser)
            }

            setIsLoading(false)
        }

        checkAuth()
    }, [])

    const login = (userData: User, token: string) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return <AuthContext value={{ user, isLoading, login, logout }}>{children}</AuthContext>
}
