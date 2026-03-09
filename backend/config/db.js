import { neon } from '@neondatabase/serverless';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// create a SQL connection using our env variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

// this SQL function we export is used as a tagged template literal, which allows us to write SQL queries safely

// postgresql://neondb_owner:npg_ckAi6XST8udP@ep-quiet-snow-ak0doq3j-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
