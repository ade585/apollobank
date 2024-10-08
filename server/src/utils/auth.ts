import { User } from "../entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User): string => {
	return sign({ userId: user.id }, process.env.REACT_APP_ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
};

export const createRefreshToken = (user: User): string => {
	return sign(
		{ userId: user.id, tokenVersion: user.tokenVersion },
		process.env.REACT_APP_REFRESH_TOKEN_SECRET!,
		{ expiresIn: "7d" }
	);
};
