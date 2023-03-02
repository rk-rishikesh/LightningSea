export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  username: string;
  votes: number;
  signature: string;
  pubkey: string;
  verified: boolean;
}

export const SocketEvents = {
  postUpdated: 'post-updated',
  invoicePaid: 'invoice-paid',
};
