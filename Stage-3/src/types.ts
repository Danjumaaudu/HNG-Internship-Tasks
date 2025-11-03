export interface EmailRequest {
  topic: string;
  tone: string;
  senderName ?: string;
  profession ?: string;
  about? : string;
}

export interface EmailResponse {
  body: string;
  subject: string;
}
