ALTER TABLE "estoque" RENAME TO "estoques";--> statement-breakpoint
ALTER TABLE "estoques" DROP CONSTRAINT "estoque_codigo_unique";--> statement-breakpoint
ALTER TABLE "estoques" DROP CONSTRAINT "fk_estoque_user";
--> statement-breakpoint
ALTER TABLE "produtos" DROP CONSTRAINT "fk_produtos_estoque";
--> statement-breakpoint
ALTER TABLE "estoques" ADD CONSTRAINT "fk_estoque_user" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "produtos" ADD CONSTRAINT "fk_produtos_estoque" FOREIGN KEY ("estoque_id") REFERENCES "public"."estoques"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "estoques" ADD CONSTRAINT "estoques_codigo_unique" UNIQUE("codigo");