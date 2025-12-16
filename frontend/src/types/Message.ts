export type TAdminMessageData = {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;
  receiverId: string;
};

export type TAdminMessageRow = {
  id: string;
  content: string;
  createdAt: Date;
};
