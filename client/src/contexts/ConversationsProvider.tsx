import React, { useCallback, useContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { arrayEquality } from '../lib/helpers'
import { OldConversation, FormattedConversation, Message } from '../types'
import { useContacts } from './ContactsProvider'
import { SocketContext } from './SocketProvider'
import { v4 as uuidV4 } from 'uuid'

interface ConversationsContextInterface {
  conversations: FormattedConversation[]
  selectedConversation: FormattedConversation
  sendMessage: (recipients: string[], text: string) => void
  selectConversationIndex: React.Dispatch<React.SetStateAction<number>>
  createConversation: (recipients: string[]) => void
}

const ConversationsContext = React.createContext<
  ConversationsContextInterface | undefined
>(undefined)

export function useConversations() {
  const context = useContext(ConversationsContext)

  if (context === undefined) {
    throw new Error('useConversations must be within ConversationsProvider')
  }
  return context
}

export function ConversationsProvider({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const [conversations, setConversations] = useLocalStorage<OldConversation[]>(
    'conversations',
    []
  )
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()


  function createConversation(recipients: string[]) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [], id: uuidV4() }]
    })
  }

  const addMessageToConversation = useCallback(
    ({
      recipients,
      text,
      sender,
    }: {
      recipients: string[]
      text: string
      sender: string
    }) => {
      console.log({ recipients, text, sender })
      setConversations((prevConversations) => {
        let madeChange = false
        const newMessage: Message = { sender, text }
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          }

          return conversation
        })

        if (madeChange) {
          return newConversations
        } else {
          return [...prevConversations, { recipients, messages: [newMessage], id: uuidV4()  }]
        }
      })
    },
    [setConversations]
  )

  const socket = useContext(SocketContext)

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addMessageToConversation)

    return () => {
      socket.off('receive-message')
    }
  }, [socket, addMessageToConversation])

  function sendMessage(recipients: string[], text: string) {
    console.log({ socket, recipients, text })
    socket!.emit('moustafa', { recipients, text })
    socket!.emit('send-message', { recipients, text })

    addMessageToConversation({ recipients, text, sender: id })
  }

  const formattedConversations: FormattedConversation[] = conversations.map(
    (conversation, index) => {
      const recipients = conversation.recipients.map((recipient) => {
        const contact = contacts.find((contact) => {
          return contact.id === recipient
        })
        const name = (contact && contact.name) || recipient
        return { id: recipient, name }
      })

      const messages = conversation.messages.map((message) => {
        const contact = contacts.find((contact) => {
          return contact.id === message.sender
        })
        const name = (contact && contact.name) || message.sender
        const fromMe = id === message.sender
        return { ...message, senderName: name, fromMe }
      })

      const selected = index === selectedConversationIndex
      return { ...conversation, messages, recipients, selected }
    }
  )

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
  }

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}
