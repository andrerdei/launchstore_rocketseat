CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "old_price" double precision NOT NULL,
  "price" double precision NOT NULL,
  "quantity" integer NOT NULL,
  "status" integer NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "path" text NOT NULL,
  "product_id" integer NOT NULL
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
