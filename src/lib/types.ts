export interface MessageForm {
  senderName: string;
  recipientName: string;
  relationship: 'family' | 'friend' | 'colleague' | 'partner' | 'other';
}

export interface GeneratedMessage {
  id: string;
  content: string;
  form: MessageForm;
  createdAt: string;
}