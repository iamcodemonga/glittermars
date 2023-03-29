import axios from "axios";
import jwt from "jsonwebtoken";

const URL = process.env.API_ROOT;

export default async function (req, res) {
    if (req.method == "GET") {
        if(!req.cookies.glittermars){
            return res.json(null)
        }

        try {
            const { id }  = jwt.verify(req.cookies.glittermars, process.env.JWTSECRET);
            const user = await axios.get(`${URL}/user/${id}`);
            return res.json(user.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    
}