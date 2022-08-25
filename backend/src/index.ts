import { decorateResponse } from "./storage";

export interface Env {
	STORAGE: DurableObjectNamespace;
}

export default {
	async fetch(request: Request, env: Env) {
		if (request.method === "OPTIONS") {
			return decorateResponse("", 200);
		}
		try {
			return await handleRequest(request, env);
		} catch (e) {
			return decorateResponse(`${e}`, 500);
		}
	},
};

const handleRequest = async (request: Request, env: Env) => {
	const doId = env.STORAGE.idFromName("messengr");
	const obj = env.STORAGE.get(doId);

	return await obj.fetch(request);
};

export { StorageDO } from "./storage";
