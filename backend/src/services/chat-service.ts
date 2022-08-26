import { decorateResponse } from '../decorateResponse';
import { Chat } from '../model/types';

export class ChatService {
	public async handleRequest(request: Request, state: DurableObjectState) {
		try {
			if (request.method === 'POST') {
				const chatToCreate = (await request.json()) as Chat;
				const existingChats = ((await state.storage.get('chats')) || []) as Chat[];
				existingChats.push(chatToCreate);
				await state.storage.put('chats', existingChats);
				console.log('Created ', existingChats);
				return decorateResponse(
					JSON.stringify({ statusText: 'Successful!', chats: existingChats }),
					200
				);
			}
		} catch (e) {
			return decorateResponse('An error occurred :( ' + e, 404);
		}
	}
}
