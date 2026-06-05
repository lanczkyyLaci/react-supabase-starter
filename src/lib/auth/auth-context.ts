import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

type AuthContextType = {
    user: User | null
    session: Session | null
    role: string | null
    loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    role: null,
    loading: true,
})
