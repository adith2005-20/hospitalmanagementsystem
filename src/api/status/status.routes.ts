import { Request, Response } from "express";
import { db } from "../../config/db";

export const pingDb = async (req: Request, res: Response) => {
    try{
        const [result] = await db`SELECT 'Hello from server' AS solution`;
        res.json({
            message: 'Successful ping back from server',
            result: result,
        });
    } catch (error) {
        console.error('Db connection failed', error);
        res.status(500).json({
            message: 'Ping to server failed.',
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
};