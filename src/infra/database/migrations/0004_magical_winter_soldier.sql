CREATE TABLE `calls` (
	`id` text PRIMARY KEY NOT NULL,
	`method` text NOT NULL,
	`request` text NOT NULL,
	`response` text NOT NULL,
	`token` text NOT NULL,
	`channel_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `channels` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
