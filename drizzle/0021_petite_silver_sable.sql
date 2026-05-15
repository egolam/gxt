ALTER TABLE "locations" ADD COLUMN "url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_url_unique" UNIQUE("url");