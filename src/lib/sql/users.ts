'use server'

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '../definitions';

export async function getAllUsers() {
    noStore();
    try {
      const data = await sql<User>`
          SELECT
            *
          FROM public.users
          ORDER BY name ASC
        `;
  
      const users = data.rows;
      return users;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all users.');
    }
  }

  export async function getUser(userId: string) {
    noStore();
    try {
      const data = await sql<User>`
          SELECT
            *
          FROM public.users
          where id = ${userId}
        `;
  
      const user = data.rows[0];
      return user;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch user.');
    }
  }

  export async function getUserByEmail(email: string) {
    noStore();
    try {
      const data = await sql<User>`
          SELECT
            *
          FROM public.users
          where email = ${email}
        `;
  
      const user = data.rows[0];
      return user;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch user.');
    }
  }