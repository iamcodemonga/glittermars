import axios from "axios";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const URL = process.env.API_ROOT;

export default async function (req, res) {
    if(req.method == "POST") {

        let status
        let { fullname, email, password } = req.body;
        let nameRegex = /^([a-zA-Z ]+)$/;
        let emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;
        fullname = fullname.toLowerCase();
        email = email.toLowerCase().replace(/ /g, "_");

        if (!fullname || !email || !password) {
            status = { error: true, message: "Please fill in all fields!"}
            return res.json(status)
        }

        if (!nameRegex.test(fullname)){
            status = { error: true, message: "Name format is improper!"}
            return res.json(status)
        }

        if (!emailRegex.test(email)){
            status = { error: true, message: "Invalid email format!!"}
            return res.json(status)
        }

        //check database for user
        try {
            const { data } = await axios.post(`${URL}/auth/register`, req.body);
            if (data.error){
                return res.json(data)
            } else {
                //create token with jwt
                const token = jwt.sign({ id: data.user._id }, String(process.env.JWTSECRET), { expiresIn: process.env.JWTEXP});
                // serialize cookie
                console.log(token)
                const serializedCookie = serialize("glittermars", token, {
                    maxAge: 60*60*24*7,
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV !== "development",
                    path: "/"
                });
                //setCookie
                res.setHeader("set-Cookie", serializedCookie)
                return res.json(data)
            }
        } catch (error) {
            console.log(error)
        }

    } else {
        return res.status(404).json({ message: "failed GET request"})
    }
}