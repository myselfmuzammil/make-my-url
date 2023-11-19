import { User } from "../models";
import { ErrorHandler } from "../utils";
import { LoginSchema, SignupSchema } from "../schema";

export async function loginService({ email, password }: LoginSchema) {
    const user = await User
    .findOne({ email }).select("+password");

    if(
        !(user &&
        await user.isPasswordCorrect(password))
    ) throw new ErrorHandler(
        {
            message: "Invalid email or password",
            statusCode: 401,
        }
    );

    return user;
}

export async function signupService(body: SignupSchema) {
    try {
        const user = await User.create(body);
        return user;
    } catch (error) {
        throw new ErrorHandler(
            {
                message: "Email is already registered",
                statusCode: 409,
            }
        );
    }
}