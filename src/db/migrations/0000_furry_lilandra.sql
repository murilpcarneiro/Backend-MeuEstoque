CREATE TABLE "estoque" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"codigo" varchar(50) DEFAULT floor(random()*9000 + 1000)::int NOT NULL,
	"user_id" uuid NOT NULL,
	CONSTRAINT "estoque_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
CREATE TABLE "produtos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" varchar(255),
	"barcode" varchar(50),
	"price" integer NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"min_stock" integer DEFAULT 0 NOT NULL,
	"estoque_id" uuid NOT NULL,
	CONSTRAINT "produtos_barcode_unique" UNIQUE("barcode")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "estoque" ADD CONSTRAINT "fk_estoque_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produtos" ADD CONSTRAINT "fk_produtos_estoque" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoque"("id") ON DELETE no action ON UPDATE no action;