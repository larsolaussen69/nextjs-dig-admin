export type User = {
    id: number;
    name: string;
    email: string;
    usergroup: string;
    companyid: string;
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