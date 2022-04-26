export type Contact = {
    name: string;
    id:string
}

export type Conversation = {
    messages: Message[];
    recipients:string[]
}

export type FormattedConversation = {
    messages: Message[];
    recipients:Recipient[];
    selected: boolean;
}

export type Message = {
    sender: string;
    text: string;
    fromMe?: boolean;
    senderName?: string;
}

export type Recipient = {
    name: string;
    id:string
}

export type User = {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
  }
  
  
  export type LoginResponse = {
      message: string;
      token: string;
      error?: string
  }
  
  export type AppStateType = {
    user: User | null
    token: string
  }