import { Request, Response } from "express";
import { sql } from "../../config/db";

export const pingDb = async (req: Request, res: Response) => {
    try{
        const [result] = await sql`SELECT 'Hello from database' AS message`;
        res.json({
            message: 'Successful ping back from server and db',
            result: result,
        });
    } catch (error) {
        console.error('Db connection failed', error);
        res.status(500).json({
            message: 'Ping to server and db failed.',
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        });
    }
};