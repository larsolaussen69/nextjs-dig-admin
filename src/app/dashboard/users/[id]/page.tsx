import type * as React from "react";
import { getUserExercises } from "@/lib/sql/user-exercises";
import UserDetails from "@/components/dashboard/user/userdetails";

import { notFound } from "next/navigation";
import { getUser } from "@/lib/sql/users";

export default async function Page({params}: {params: Promise<{ id: string }>}) {
    const { id } = await params;

    if (!id) {
        return notFound(); // ✅ Handle missing ID
    }
    const splitCategories = await getUserExercises(id);
    const user = await getUser(id);
    return (
        <>
            <UserDetails user={user} splitCategories={splitCategories} />
        </>
    )
}