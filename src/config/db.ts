import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE URL NOT FOUND. UPDATE ENV VARS');
}

export const sql = neon(process.env.DATABASE_URL as string);

