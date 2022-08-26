import { User } from '../model/types';
import { decorateResponse } from '../decorateResponse';

export class UserService {
	public async createUser(request: Request, state: DurableObjectState): Promise<Response> {
		try {
			const userObj = (await request.json()) as User;
			let users: User[] = [];
			const storedUsers = (await state.storage.get('users')) as User[];
			if (storedUsers) {
				users = storedUsers;
			}

			if (users.filter((user) => user.id == userObj.id).length == 0) {
				users.push(userObj);
				console.log({ users });

				await state.storage.put('users', users);
				return decorateResponse('Successfully, registered user,', 200);
			} else {
				return decorateResponse('User with given username already exists.', 400);
			}
		} catch (e) {
			return decorateResponse(`An error occurred :( - ${e}`, 404);
		}
	}

	public async loginUser(request: Request, state: DurableObjectState): Promise<Response> {
		try {
			const userObj = (await request.json()) as Pick<User, 'username' | 'password'>;
			const users: User[] = (await state.storage.get('users')) as User[];
			if (!users) {
				return decorateResponse('No users currently exist', 400);
			}

			console.log('The existing chats in storage ', await state.storage.get('chats'));
			console.log('Existing store ', Array.from((await state.storage.list()).values()));

			const storedVersion = users.filter((user) => user.username == userObj.username);
			if (storedVersion.length == 0) {
				return decorateResponse('Invalid username', 400);
			} else {
				if (storedVersion[0].password !== userObj.password) {
					return decorateResponse('Incorrect password', 400);
				}
				return decorateResponse(
					JSON.stringify({
						statusText: 'Login Successful!',
						user: storedVersion[0],
					}),
					200
				);
			}
		} catch (e) {
			return decorateResponse(`An error occurred :( - ${e}`, 404);
		}
	}

	public async logoutUser(_: Request, state: DurableObjectState): Promise<Response> {
		try {
			const users: User[] = (await state.storage.get('users')) as User[];
			if (!users) {
				return decorateResponse('No users currently exist', 400);
			}
			// TODO: End their socket connection(s) here (?)
			return decorateResponse('Successfully logged out user!', 200);
		} catch (e) {
			return decorateResponse(`An error occurred :( - ${e}`, 404);
		}
	}

	public async getUsers(_: Request, state: DurableObjectState): Promise<Response> {
		try {
			const users: User[] = (await state.storage.get('users')) as User[];
			if (!users) {
				return decorateResponse('No users currently exist', 400);
			}
			return decorateResponse(
				JSON.stringify({
					statusText: 'Successfully retrieved all users!',
					users: users.map((user) => ({
						username: user.username,
						avatar: user.avatar,
						id: user.id,
					})),
				}),
				200
			);
		} catch (e) {
			return decorateResponse(`An error occurred :( - ${e}`, 404);
		}
	}
}
