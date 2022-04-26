import { createSlice } from '@reduxjs/toolkit'
import { Conversation } from '../../types'

interface ConversationStateType {
  conversations: Conversation[]
  selectedConversation: Conversation | null
  selectedConversationId: Conversation['id']
}

const initialState: ConversationStateType = {
  conversations: [],
  selectedConversation: null,
  selectedConversationId: '',
}

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversations(state, { payload }: { payload: Conversation[] }) {
      state.conversations = payload
    },
    setSelectedConversation(state, { payload }: { payload: string }) {
      const conversation = state.conversations.find((c) => c.id === payload)
      if (conversation) {
        state.selectedConversationId = payload
        state.selectedConversation = conversation
      }
    },
    createConversation(state, { payload }: { payload: Conversation }) {
      state.conversations.push(payload)
    },
  },
})

export const { setConversations, setSelectedConversation, createConversation } =
  conversationSlice.actions

export default conversationSlice.reducer
