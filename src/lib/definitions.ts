export type User = {
    id: number;
    name: string;
    email: string;
    usergroup: string;
    companyid: string;
    password: string;
};

// Define TypeScript types
export type Exercise = {
    id: string;
    name: string;
    description: string;
};

export type Program = {
    id: string;
    name: string;
    exercises: Exercise[];
};

// Ensure categoriesData is structured properly
export type CategoriesData = Record<string, Record<string, Program>>;

export type UserExercise = {
    user_exercise_id: string;
    program_name: string;
    program_category: string;
    exercise_name: string;
    exercise_description: string;
    exercise_id: string | null;
};

export type SplitCategory = {
    split_category: string;
    exercises: UserExercise[];
};