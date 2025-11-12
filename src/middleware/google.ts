// ...existing code...
import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

export function configureGooglePassport() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
                callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
            },
            async (_accessToken: any, _refreshToken: any, profile: Profile, done: (error: any, user?: Express.User | false, info?: { message: string }) => any) => {
                try {
                    const email = profile.emails?.[0]?.value;
                    if (!email) return done(null, false, { message: "No email from Google" });

                    let user = await User.findOne({ email });

                    if (!user) {
                        const base = (profile.displayName || email.split("@")[0]).replace(/\s+/g, "").toLowerCase();
                        let username = base;
                        let i = 0;
                        while (await User.findOne({ username }) && i < 20) { i++; username = `${base}${i}`; }

                        const randomPassword = Math.random().toString(36).slice(-12);
                        const hashedPassword = await bcrypt.hash(randomPassword, 10);

                        user = await User.create({
                            username,
                            email,
                            password: hashedPassword,
                            hasPaid: false,
                        });
                    }

                    return done(null, { id: user._id.toString(), email: user.email }, undefined);
                } catch (err) {
                    return done(err as any);
                }
            }
        )
    );
}