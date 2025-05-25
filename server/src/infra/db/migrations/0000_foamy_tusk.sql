CREATE TABLE "links" (
	"id" uuid PRIMARY KEY NOT NULL,
	"short_url_slug" varchar(255) NOT NULL,
	"original_url" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_url_slug_unique" UNIQUE("short_url_slug")
);
