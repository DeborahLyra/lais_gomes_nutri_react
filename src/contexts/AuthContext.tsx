import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import type { Session } from "@supabase/supabase-js"


interface AuthContextProps {
  session: Session | null
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function contextsuseAuth() {
  return useContext(AuthContext)
}
