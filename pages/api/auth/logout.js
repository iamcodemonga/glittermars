import { serialize } from 'cookie'

export default async function (req, res) {
    const serializedCookie = serialize("glittermars", null, {
        maxAge: -1,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        path: "/"
    });
    //setCookie
    res.setHeader("set-Cookie", serializedCookie)
    return res.json({ statusCode: 200 })
}