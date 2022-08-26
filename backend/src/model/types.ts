export interface Chat {
	chatName: string;
	chatAvatar: string;
	messages: Message[];
	members: Omit<User, 'password'>[];
	owner: User;
	id: string;
}

export interface User {
	username: string;
	password: string; // encrypted somehow
	avatar: string;
	id: string;
}

export interface Message {
	messageContent: MessageContent;
	seenBy: Pick<User, 'username' | 'avatar' | 'id'>[];
	sentBy: Pick<User, 'username' | 'avatar' | 'id'>;
	sentAt: string;
}

type ContentType = 'text' | 'image' | 'video';

interface MessageContent {
	dataType: ContentType;
	/**
	 * Always a string, either the actual text or the src for the media
	 */
	content: string;
}
