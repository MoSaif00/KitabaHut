import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = async (req, res) => {
    try
    {
        console.log("Incoming Request:", req.url);
        return await handleAuth()(req, res);
    } catch (error)
    {
        console.error("Error in Kinde Auth Callback:", error);
        res.status(500).json({ error: error.message });
    }
};