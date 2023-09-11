import { GraphQLClient, gql } from "graphql-request";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const key = process.env.API_KEY;
const bearer = process.env.GRAPH_BEARER;

export const hygraph = new GraphQLClient(key, {headers: { Authorization: bearer }});

export default async function (req, res) {
    if(req.method == "POST") {
        // res.json({ message: 'nice'});
        // return;
        let status
        let { email, password } = req.body;
        let emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;
        email = email.toLowerCase().replace(/ /g, "_");

        if (!email || !password) {
            status = { error: true, message: "Please fill in all fields!"}
            return res.json(status)
        }

        if (!emailRegex.test(email)){
            status = { error: true, message: "Invalid email format!!"}
            return res.json(status)
        }

        const FindUser = async(email, password) => {
            const QUERY = gql`
                {
                    customers(where: {email: "${email}", password: "${password}"}) {
                        id
                        fullname
                        email
                    }
                }`;
            const result = await hygraph.request(QUERY)
            return result.customers;
        }

        const existingUser = await FindUser(email, password);

        //check database for user
        try {
            // Bcrypt will compare password
            console.log(existingUser)
            if (existingUser.length < 1){
                status = { error: true, message: "this user does not exist!"}
                res.json(status)
                return;
            } else {
                //create token with jwt
                const token = jwt.sign({ id: existingUser.id }, process.env.JWTSECRET, { expiresIn: process.env.JWTEXP});
                // serialize cookie
                console.log(token)
                // const serializedCookie = serialize("glittermars", token, {
                //     maxAge: 60*60*24*7,
                //     httpOnly: true,
                //     sameSite: "strict",
                //     secure: process.env.NODE_ENV !== "development",
                //     path: "/"
                // });
                // //setCookie
                // res.setHeader("set-Cookie", serializedCookie)
                status = { error: false, message: "you are welcome!"}
                res.json(status)
                return;
            }
        } catch (error) {
            console.log(error)
        }

    } else {
        return res.status(404).json({ message: "failed GET request"})
    }
}