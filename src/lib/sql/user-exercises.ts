'use server'

import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { SplitCategory } from '../definitions';

export async function getUserExercisesByEmail(email: string) {
    noStore();
    try {
      const data = await sql<SplitCategory>`
          SELECT 
                ue.split_category,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'user_exercise_id', ue.id,
                        'program_name', COALESCE(p.name, ''),
                        'program_category', COALESCE(p.category, ''),
                        'exercise_name', COALESCE(ue.custom_name, e.name),
                        'exercise_description', COALESCE(ue.custom_description, e.description),
                        'exercise_id', e.id,
                        'user_id', ue.user_id,
                        'link', e.link
                    )
                ) AS exercises
            FROM user_exercises ue
            LEFT JOIN users u on u.id = ue.user_id
            LEFT JOIN exercises e ON ue.exercise_id = e.id
            LEFT JOIN program_exercises pe ON e.id = pe.exercise_id
            LEFT JOIN programs p ON pe.program_id = p.id
            WHERE u.email = ${email}
            GROUP BY ue.split_category;
        `;
  
      const usersExercises = data.rows;
      return usersExercises;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch user exercises.');
    }
}


export async function getUserExercises(userId: string) {
    noStore();
    try {
      const data = await sql<SplitCategory>`
          SELECT 
                ue.split_category,
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'user_exercise_id', ue.id,
                        'program_name', COALESCE(p.name, ''),
                        'program_category', COALESCE(p.category, ''),
                        'exercise_name', COALESCE(ue.custom_name, e.name),
                        'exercise_description', COALESCE(ue.custom_description, e.description),
                        'exercise_id', e.id
                    )
                ) AS exercises
            FROM user_exercises ue
            LEFT JOIN exercises e ON ue.exercise_id = e.id
            LEFT JOIN program_exercises pe ON e.id = pe.exercise_id
            LEFT JOIN programs p ON pe.program_id = p.id
            WHERE ue.user_id = ${userId}
            GROUP BY ue.split_category;
        `;
  
      const usersExercises = data.rows;
      return usersExercises;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch user exercises.');
    }
  }