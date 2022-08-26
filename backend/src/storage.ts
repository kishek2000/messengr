import { ChatService } from './services/chat-service';
import { decorateResponse } from './decorateResponse';
import { Chat, Message, User } from './model/types';
import { UserService } from './services/user-service';

export class StorageDO {
	state: DurableObjectState;
	sessions: Map<string, [WebSocket, WebSocket]> = new Map<string, [WebSocket, WebSocket]>();

	userService: UserService = new UserService();
	chatService: ChatService = new ChatService();

	constructor(state: DurableObjectState) {
		this.state = state;
	}

	async fetch(request: Request) {
		const url = new URL(request.url);
		switch (url.pathname) {
			case '/websocket':
				return this.handleWebSocket(request);
			case '/register':
				return this.userService.createUser(request, this.state);
			case '/login':
				return this.userService.loginUser(request, this.state);
			case '/users':
				return this.userService.getUsers(request, this.state);
			case '/chat':
				return this.chatService.handleRequest(request, this.state);
			case '/clean':
				await this.state.storage.deleteAll();
				return decorateResponse('Cleaned', 200);
			case '/':
				return decorateResponse('🚀🚀 Messengr API: Alive and well!!', 200);
			default:
				return decorateResponse('Endpoint not found...', 404);
		}
	}

	private async handleWebSocket(request: Request) {
		const upgradeHeader = request.headers.get('Upgrade');
		if (!upgradeHeader || upgradeHeader !== 'websocket') {
			return decorateResponse('Expected Upgrade: websocket', 426);
		}

		const id = new URL(request.url).searchParams.get('id');
		if (!id) {
			return decorateResponse('Fail: Expected some session id', 426);
		}

		if (this.sessions.get(id)) {
			return decorateResponse('Websocket already exists', 426);
		} else {
			const webSocketPair = new WebSocketPair();
			const [client, server] = Object.values(webSocketPair);

			this.sessions.set(id, [client, server]);

			server.accept();
			server.addEventListener('message', (e) => this.socketListener(e, server));

			return new Response(null, {
				status: 101,
				webSocket: client,
			});
		}
	}

	private async socketListener(event: MessageEvent, server: WebSocket) {
		console.log('Received a message from client');

		const message = JSON.parse(event.data as string) as SocketMessage;

		if (message.type === 'updateChats') {
			this.sendData(server, message);
		} else if (message.type === 'addMessage') {
			const data = message.data as { message: Message; chat: Chat };
			const existingChats = ((await this.state.storage.get('chats')) || []) as Chat[];

			if (existingChats.length === 0) {
				server.send(
					JSON.stringify({
						type: 'error',
						data: 'No chats exist yet',
					})
				);
			}
			const chat = existingChats.filter((storedChat) => storedChat.id === data.chat.id)[0];
			chat.messages.push(data.message);
			console.log('Updated chat structure ', chat);

			const newChats = existingChats.filter((storedChat) => storedChat.id !== data.chat.id);
			const chatsToStore = [...newChats, chat];
			await this.state.storage.put('chats', chatsToStore);
			console.log('New chats array ', chatsToStore);

			const chatsWithUser = chatsToStore.filter((storedChat) => {
				return (
					storedChat.members.filter((member) => {
						return member.id === data.message.sentBy.id;
					}).length > 0
				);
			});
			this.broadcastUpdate(chatsWithUser);
		}
	}

	private broadcastUpdate(chatsWithUser: Chat[]) {
		const serverSockets = Array.from(this.sessions.values());
		for (let i = 0; i < serverSockets.length; i++) {
			if (serverSockets[i][1]) {
				try {
					serverSockets[i][1].send(
						JSON.stringify({
							type: 'updateChats',
							data: {
								chats: chatsWithUser,
							},
						})
					);
				} catch (e) {
					// do nothing
				}
			}
		}
	}

	private async sendData(server: WebSocket, message: SocketMessage) {
		const data = message.data.user as User;
		let chats: Chat[] = [];
		const storedChats = (await this.state.storage.get('chats')) as Chat[];
		if (storedChats) {
			chats = storedChats;
		}

		const chatsWithUser = chats.filter((chat) => {
			return (
				chat.members.filter((member) => {
					return member.id === data.id;
				}).length > 0
			);
		});

		this.broadcastUpdate(chatsWithUser);
	}
}

interface SocketMessage {
	type: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
}
