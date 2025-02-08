import type * as React from "react";
import Programslist from "@/components/dashboard/program/programslist";
import { getAllPrograms } from "@/lib/sql/programs";

export default async function ProgramsPage() {
  const categoriesData = await getAllPrograms();
  return (
    <>
        <Programslist categoriesData={categoriesData} />
    </>
  );
}