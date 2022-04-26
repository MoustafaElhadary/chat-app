import { createSlice } from '@reduxjs/toolkit'
import { Contact } from '../../types'

interface ContactsStateType {
  contacts: Contact[]
  selectedContacts: Contact | null
  selectedContactsId: Contact['id']
}

const initialState: ContactsStateType = {
    contacts: [],
  selectedContacts: null,
  selectedContactsId: '',
}

export const ContactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContacts(state, { payload }: { payload: Contact[] }) {
      state.contacts = payload
    },
    setSelectedContacts(state, { payload }: { payload: string }) {
      const Contacts = state.contacts.find((c) => c.id === payload)
      if (Contacts) {
        state.selectedContactsId = payload
        state.selectedContacts = Contacts
      }
    },
    createContact(state, { payload }: { payload: Contact }) {
      state.contacts.push(payload)
    },
  },
})

export const { setContacts, setSelectedContacts,createContact } =
  ContactSlice.actions

export default ContactSlice.reducer
