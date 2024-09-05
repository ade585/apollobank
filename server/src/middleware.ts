import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";
import { verify } from "jsonwebtoken";

/**
 * Authentication middleware
 * Ensures that a user is authenticated using JSON Web Tokens
 * @param param0
 * @param next
 */
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	const authorization: string | undefined = context.req.headers["authorization"];

	console.log(process.env.REACT_APP_ACCESS_TOKEN_SECRET!);

	if (!authorization) {
		throw new Error("Not authenticated");
	}

	try {
		const token: string = authorization.split(" ")[1];
		const payload: string | object = verify(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET!);
		context.payload = payload as any;
	} catch (err) {
		console.log(err);
		throw new Error("Not authenticated");
	}

	return next();
};
