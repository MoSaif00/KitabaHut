import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = async (req: { url: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: any; }): void; new(): any; }; }; }) => {
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