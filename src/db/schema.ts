import { sql } from "drizzle-orm";
import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const records = pgTable("records", {
    id: uuid("id").primaryKey().defaultRandom(),
    company_name: text("company_name").notNull(),
    package: numeric("package").notNull(),
    student_count: numeric("student_count").notNull(),
    created_at: timestamp("created_at")
        .default(sql`NOW()`)
        .notNull(),
});

export type Record = typeof records.$inferSelect;
