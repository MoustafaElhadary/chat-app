export type Contact = {
  name: string
  id: string
}

export type Conversation = {
  messages: Message[]
  recipients: User[]
  id: string
  read: boolean
  lastMessageDate: Date
  lastMessage: Message
}

export type OldConversation = {
  messages: Message[]
  recipients: string[]
}

export type FormattedConversation = {
  messages: Message[]
  recipients: Recipient[]
  selected: boolean
}

export type Message = {
  sender: string
  text: string
  fromMe?: boolean
  senderName?: string
}

export type Recipient = {
  name: string
  id: string
}
export type CreateUser = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export type User = {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
  id: string
}

export type LoginResponse = {
  accessToken: string
  error?: string
}

export type AppStateType = {
  user: User | null
  token: string
}
