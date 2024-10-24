CREATE TABLE IF NOT EXISTS "records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_name" text NOT NULL,
	"package" numeric NOT NULL,
	"student_count" numeric NOT NULL,
	"created_at" timestamp DEFAULT NOW() NOT NULL
);
