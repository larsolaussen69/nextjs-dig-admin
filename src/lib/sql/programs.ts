'use server'

import { sql, db } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function getAllPrograms() {
    noStore();
    try {
        const data = await sql`
        SELECT 
            p.category, 
            p.id AS program_id, 
            p.name AS program_name, 
            e.id AS exercise_id, 
            e.name AS exercise_name, 
            e.description
            FROM programs p
            LEFT JOIN program_exercises pe ON p.id = pe.program_id
            LEFT JOIN exercises e ON pe.exercise_id = e.id
        ORDER BY p.category, p.name, e.name;
        `;
        // Group by category, then by program
        const groupedData: Record<string, any> = {};

        data.rows.forEach(row => {
            if (!groupedData[row.category]) {
                groupedData[row.category] = {}; // Category level
            }
            if (!groupedData[row.category][row.program_id]) {
                groupedData[row.category][row.program_id] = {
                    id: row.program_id,
                    name: row.program_name,
                    exercises: [],
                };
            }
            if (row.exercise_id) {
                groupedData[row.category][row.program_id].exercises.push({
                    id: row.exercise_id,
                    name: row.exercise_name,
                    description: row.description,
                });
            }
        });

        return groupedData; // Returns { category: { program_id: { exercises } } }
    } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all programs.');
    }
}