import React from 'react'
import { connect, Socket } from 'socket.io-client'


export const SocketContext = React.createContext<Socket | undefined>(undefined)


export function SocketProvider({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
 const socket = connect('http://localhost:7070/', {
    query: { id },
 })
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
