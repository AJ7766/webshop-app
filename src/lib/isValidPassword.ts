//checks if the input[password] is the same as the hashedpassword from .env
export async function isValidPassword(password: string, hashedPassword: string){
    return (await hashPassword(password)) === hashedPassword
}
//basicly a function to encrypt our password
async function hashPassword(password: string){
    //makes our inpit[password] into a long arraytext
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
    //then we return it into a string "base64" cryption, and returns it
    return Buffer.from(arrayBuffer).toString("base64")
}