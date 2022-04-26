import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { connect, Socket } from 'socket.io-client'
import { RootState } from '../redux/store'

export const SocketContext = React.createContext<Socket | undefined>(undefined)

export const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context) throw Error('SocketProvider must be defined')
  return context
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.app.user)
  const [socket, setSocket] = useState(connect('http://localhost:7070/'))

  useEffect(() => {
    if (user) {
      const { id } = user
      setSocket(
        connect('http://localhost:7070/', {
          query: { id },
        })
      )
      console.log('connecting id:', id)
    }
    return () => {
      console.log('disconnecting')
      socket.close()
    }
  }, [user])
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}
