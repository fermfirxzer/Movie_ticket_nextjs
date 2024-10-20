import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectMongoDB } from "../../../../../lib/mongodb";
import {User} from "../../../../../lib/model/user";
import bcrypt from "bcryptjs";

const authOptions = { 
    providers: [
        CredentialsProvider({
            name: 'credentials',

            credentials: {},
            async authorize(credentials, req) {

            const { username , password } = credentials;

            try {
                await connectMongoDB();
                const user = await User.findOne({ username:username });

                if(!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password , user.password);

                if (!passwordMatch) {
                    return null;
                }
                return user;

            } catch (error) {
                console.log("Error :" , error);
            }

            }
        })
    ] ,
    session : {
        strategy : "jwt",
    } ,
    secret : process.env.NEXTAUTH_SECRET,
    pages : {
        signIn : "/login"
    } ,
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.username = user.username;
                token.email = user.email;
                token.isAdmin = user.isAdmin;
                
            }
            return token
        },
        async session({ session, token }) {

            if (token) {
                session.user.username = token.username;
                session.user.email = token.email; // Email is added to session here
                session.user.isAdmin = token.isAdmin;
                
            }
            return session;
        }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET , handler as POST}