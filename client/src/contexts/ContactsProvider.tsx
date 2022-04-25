import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { Contact } from '../types'

interface ContactsContextInterface {
  contacts: Contact[]
  createContact: (id: string, name: string) => void
}

const ContactsContext = React.createContext<
  ContactsContextInterface | undefined
>(undefined)

export function useContacts() {
  const context = useContext(ContactsContext)

  if (context === undefined) {
    throw new Error('useContacts must be within ContextProvider')
  }
  return context
}

export function ContactsProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', [])

  function createContact(id: string, name: string) {
    setContacts((prevContacts) => {
      return [...prevContacts, { id, name }]
    })
  }

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  )
}
