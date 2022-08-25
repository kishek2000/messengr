import { User } from "./model/types";

export class StorageDO {
	state: DurableObjectState;

	constructor(state: DurableObjectState) {
		this.state = state;
	}

	async fetch(request: Request) {
		const url = new URL(request.url);

		switch (url.pathname) {
			case "/register":
				return new UserService().createUser(request, this.state);
			case "/login":
				return new UserService().loginUser(request, this.state);
			case "/":
				return decorateResponse("🚀🚀 Messengr API: Alive and well!!", 200);
			default:
				return decorateResponse("Endpoint not found...", 404);
		}
	}
}

export class UserService {
	public async createUser(
		request: Request,
		state: DurableObjectState
	): Promise<Response> {
		try {
			const userObj = (await request.json()) as User;
			let users: User[] = [];
			const storedUsers = (await state.storage.get("users")) as User[];
			if (storedUsers) {
				users = storedUsers;
			}

			if (users.filter((user) => user.id == userObj.id).length == 0) {
				users.push(userObj);
				state.storage.put("users", users);
				return decorateResponse("Successfully, registered user,", 200);
			} else {
				return decorateResponse(
					"User with given username already exists.",
					400
				);
			}
		} catch (e) {
			return decorateResponse(`An error occurred :( - ${e}`, 404);
		}
	}

	public async loginUser(
		request: Request,
		state: DurableObjectState
	): Promise<Response> {
		try {
			const userObj = (await request.json()) as Pick<
				User,
				"username" | "password"
			>;
			const users: User[] = (await state.storage.get("users")) as User[];
			if (!users) {
				return decorateResponse("No users currently exist", 400);
			}

			const storedVersion = users.filter(
				(user) => user.username == userObj.username
			);
			if (storedVersion.length == 0) {
				return decorateResponse("Invalid username", 400);
			} else {
				if (storedVersion[0].password !== userObj.password) {
					return decorateResponse("Incorrect password", 400);
				}
				return decorateResponse(
					JSON.stringify({
						statusText: "Login Successful!",
						user: storedVersion[0],
					}),
					200
				);
			}
		} catch (e) {
			return decorateResponse(`An error occurred :( - ${e}`, 404);
		}
	}

	public async logoutUser(
		_: Request,
		state: DurableObjectState
	): Promise<Response> {
		try {
			const users: User[] = (await state.storage.get("users")) as User[];
			if (!users) {
				return decorateResponse("No users currently exist", 400);
			}
			// TODO: End their socket connection(s) here
			return decorateResponse("Successfully logged out user!", 200);
		} catch (e) {
			return decorateResponse(`An error occurred :( - ${e}`, 404);
		}
	}
}

export const decorateResponse = async (
	body: string,
	status: number
): Promise<Response> => {
	const headers = {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods":
			"GET, HEAD, POST, PUT, OPTIONS, DELETE, UPDATE",
		"Access-Control-Allow-Headers": "*",
		"Access-Control-Max-Age": "86400",
		"Content-type": "application/json",
	};

	return new Response(body, { headers, status });
};
