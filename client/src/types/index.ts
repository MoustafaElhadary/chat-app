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