import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

//we are checking what the response gives us, if the responsive is false then we sent status: 401, and headers is where we set the authentication scheme or method of use to verify the user
export async function middleware(req: NextRequest){
    if(await isAuthenticated(req) === false){
        return new NextResponse("Unauthorized", { 
        status: 401,
        headers: { "WWW-Authenticate": "Basic"}
        })
    }
}

async function isAuthenticated(req: NextRequest){
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization") 

    if (authHeader == null) return false
    //Buffer.from() is used to create a buffer from the base64-encoded credentials extracted from the Authorization header. This allows the decoded data to be manipulated and converted as needed. Then, .toString() is used to convert the buffer data into a string representation, which is further split to separate the username and password components.
    //we get the authentication details from headers, in this case its "Basic username,password", we split it so it becomes 2 objects in the array "basic", "user,pass" then select the [index[1]] then decrypts the request and converts it to a string. In HTTP Basic Authentication, the username and password are separated by a colon. This operation separates the username and password into an array of two elements.
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":")
    //checks if the username and input[password] is the same as the HASHED_ADMIN_PASSWORD
    return username === process.env.ADMIN_USERNAME && await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD as string)
}

export const config = {
    matcher: "/admin/:path*"
}