"use server";

import { db } from "@/db";

import { records } from "@/db/schema";

export const getPlacements = async () => {
    return db.select().from(records).execute();
};

export const createPlacement = async (data: {
    company_name: string;
    package: string;
    student_count: string;
}) => {
    return db.insert(records).values(data).returning();
};
