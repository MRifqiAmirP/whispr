-- CreateTable
CREATE TABLE "users" (
    "uuid" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" VARCHAR(255),
    "location" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
