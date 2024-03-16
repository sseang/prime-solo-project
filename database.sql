-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

--anime table

CREATE TABLE "anime" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(120) NOT NULL,
  "poster"  VARCHAR(120) NOT NULL,
  "description" TEXT NOT NULL,
  "director" TEXT NOT NULL,
  "year_published" INT
);

--genres table
CREATE TABLE "genres" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80) NOT NULL
);

-- JUNCTION TABLE
-- anime can have multiple genres and each genre can be applied to multiple anime
-- This is many-to-many!
CREATE TABLE "anime_genres" (
  "id" SERIAL PRIMARY KEY,
  "anime_id" INT REFERENCES "anime" NOT NULL,
  "genre_id" INT REFERENCES "genres" NOT NULL,
  "liked" BOOLEAN DEFAULT FALSE,
  "previously_watched" BOOLEAN DEFAULT FALSE
);

--watchlist table
CREATE TABLE "watchlist" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" NOT NULL,
    "watch_id" INT REFERENCES "watchlist" NOT NULL,
    "watched_id" INT REFERENCES "anime_genres" NOT NULL,
    "like" INT REFERENCES "anime_genres" NOT NULL
);

--test data


INSERT INTO "genres" ("name")
VALUES 
('Action'),
('Adventure'),
('Comedy'),
('Drama'),
('Fantasy'),        
('Science Fiction'),  
('Horror'),      
('Thriller'); 