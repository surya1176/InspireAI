CREATE TABLE IF NOT EXISTS "aiOutput" (
	"id" serial PRIMARY KEY NOT NULL,
	"formData" varchar NOT NULL,
	"aiResponse" text,
	"templateSlug" varchar NOT NULL,
	"createdBy" varchar,
	"createdAt" varchar,
	"imageData" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userSubscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar,
	"userName" varchar,
	"active" boolean,
	"paymentId" varchar,
	"startDate" varchar
);
