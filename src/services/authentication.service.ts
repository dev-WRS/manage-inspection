import { Profile } from "passport-google-oauth20";

import { UserLoggedIn } from "@interfaces/user.interface";
import { Role, UserModel, UserStatus, getUserByGoogleId } from "@models/user.model";

export async function successLogin(user: Profile, accessToken: string): Promise<UserLoggedIn>{
    try {
        const existUser = await getUserByGoogleId(user.id);

        if(existUser){
            existUser.sessionToken = accessToken;
            await existUser.save();
            return new UserLoggedIn(existUser);
        } else {
            const newUser = await UserModel.create({
                google_id: user.id,
                displayName: user.displayName,
                email: user.emails?.[0].value,
                provider: user.provider,
                sessionToken: accessToken,
                role: Role.USER,
                status: UserStatus.VERIFIED
            });
            return new UserLoggedIn(newUser);
        }
    } catch (error) {
        throw error;
    }
}