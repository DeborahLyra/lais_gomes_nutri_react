import { Navigate } from "react-router-dom"
import type { JSX } from "react"


export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { session } = useAuth()

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
function useAuth(): { session: any } {
  throw new Error("Function not implemented.")
}

