-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL, 
	"access_level" INT DEFAULT 0
);

--user junction 

CREATE TABLE "user_profile" (
	"id" SERIAL PRIMARY KEY,
	"profile_id" INT REFERENCES "user",
    "favorite_genres" VARCHAR (200) NOT NULL,
    "avatar" TEXT NOT NULL);
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
  "genre_id" INT REFERENCES "genres" NOT NULL
);

--watchlist table
CREATE TABLE "watchlist" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "animeList_id" INT REFERENCES "anime" NOT NULL,
    "isWatched" BOOLEAN DEFAULT FALSE,
    "isLiked" BOOLEAN DEFAULT FALSE
);

-- JUNCTION TABLE
CREATE TABLE "anime_liked" (
    "id" SERIAL PRIMARY KEY,
    "watchlist_id" INT REFERENCES "watchlist" NOT NULL,
    "watchlist_anime_genres_id" INT REFERENCES "watchlist" NOT NULL,
    "isWatched_id" INT REFERENCES "watchlist" NOT NULL ,
    "isLiked_id" INT REFERENCES "watchlist" NOT NULL 
);


--test data

INSERT INTO "user" ("username", "password")
VALUES ('Naruto', 'tuna'),
('Sky Captain', 'shark' ),
('PhoMaster Nguyen', 'fishy'),
('Bill', 'sushi');



INSERT INTO "genres" ("name")
VALUES 
('Action'),
('Adventure'),
('Comedy'),
('Drama'),
('Fantasy'),
('Horror'),
('Psychological'),
('Romance'),        
('Science Fiction'),     
('Thriller')
; 

INSERT INTO "anime" ("title", "poster", "description", "director", "year_published")
VALUES 
('Cowboy Bebop', 'images/cowboyBepop.png', 'Enter a world in the distant future, where Bounty Hunters roam the solar system. Spike and Jet, bounty hunting partners, set out on journeys in an ever struggling effort to win bounty rewards to survive. While traveling, they meet up with other very interesting people. Could Faye, the beautiful and ridiculously poor gambler, Edward, the computer genius, and Ein, the engineered dog be a good addition to the group?', 'Shinichirou Watanabe', '1998'),

('Trigun', 'images/trigun.jpg', 'Vash the Stampede is a wanted man with a habit of turning entire towns into rubble. The price on his head is a fortune, and his path of destruction reaches across the arid wastelands of a desert planet. Unfortunately, most encounters with the spiky-haired gunslinger dont end well for the bounty hunters who catch up with him; someone almost always gets hurt - and it is never Vash. Oddly enough, for such an infamous fugitive, there is no proof that he is ever taken a life. In fact, he is a pacifist with a doughnut obsession who is more doofus than desperado. There is a whole lot more to him than his reputation lets on - Vash the Stampede definitely is not your typical outlaw', 'Satoshi Nishimura', '1998'),

('Witch Hunter', 'images/witchHunter.png', 'Robin Sena is a powerful craft user drafted into the STNJ - a group of specialized hunters that fight deadly beings known as Witches. Though her fire power is great, she’s got a lot to learn about her powers and working with her cool and aloof partner, Amon. But the truth about the Witches and herself will leave Robin on an entirely new path that she never expected!', 'Shuukou Murase', '2002'),

('Beet the Vandel Buster', 'images/vandelBuster.png', 'It is the dark century and the people are suffering under the rule of the devil, Vandel, who is able to manipulate monsters. The Vandel Busters are a group of people who hunt these devils, and among them, the Zenon Squad is known to be the strongest busters on the continent. A young boy, Beet, dreams of joining the Zenon Squad. However, one day, as a result of Beet fault, the Zenon squad was defeated by the devil, Beltose. The five dying busters sacrificed their life power into their five weapons, Saiga. After giving their weapons to Beet, they passed away. Years have passed since then and the young Vandel Buster, Beet, begins his adventure to carry out the Zenon Squads will to put an end to the dark century.', '
Tatsuya Nagamine', '2004'),

('Initial D FOURTH STAGE', 'images/initialD.jpg', 'Takumi Fujiwara and brothers Keisuke and Ryousuke Takahashi have formed \"Project D,\" a racing team aimed at bringing their driving skills to their full potential outside their prefecture. Using the internet, Project D issues challenges to other racing teams and posts results of their races. Managed by Ryousuke, the team has Takumi engaging in downhill battles with his AE86, while Keisuke challenges opponents uphill. Among their rivals are the Seven-Star Leaf (SSR) and Todo-juku.', 'Tsuneo Tominaga', '2004'),

('Monster', 'images/monster.jpg', 'Dr. Kenzo Tenma is a renowned Japanese brain surgeon working at a leading hospital in Germany. One night, Dr. Tenma risks his reputation and career to save the life of a critically wounded young boy over that of the town mayor who had been planning to support the hospital financially. A string of mysterious murders begin to occur soon after the operation, and Dr. Tenma emerges as the primary suspect despite no incriminating evidence. A doctor is taught to believe that all life is equal; however, when another series of murders occur in the surgeons vicinity, Dr. Tenma beliefs are shaken as his actions that night are shown to have much broader consequences than he could have imagined. Leaving behind his life as a surgeon he embarks on a journey across the country to unravel the mystery of the boy he saved.', 'Masayuki Kojima', '2004'),

('Desert Punk', 'images/desertPunk.jpg', 'The Great Kanto Desert is a miserable place. It’s also the home of hero-for-hire Desert Punk, the closest thing to a good guy the wasteland’s got. He’s known as the best man for any job, but his reputation is undone by his raging hormones when curvy Junko uses her double-D charms to double-cross him. With debt hanging over his head, Desert Punk sets out to salvage his name.', 'Takayuki Inagaki', '2004'),

('Texhnolyze', 'images/texhnolyze.jpg', 'In a man-made underground society, descendants of a banished generation vie for control of the crumbling city of Lux. Ichise, an orphan turned prize fighter, loses a leg and an arm to satisfy an enraged fight promoter. On the brink of death he is taken in by a young woman doctor and used as a guinea pig for the next evolution of Texhnolyze. With his new limbs, Ichise is taken under the wing of Oonishi, a powerful leader of Organ, an organization with some hold on Lux. As Ichise is drawn deeper into a war for territorial control of the city, he learns of his possible future from the young girl prophet Ran, who guides him from the shadows in his darkest times. With the explosion of the warfare, Ichise must uncover the truth about Lux and fight for his survival as he realizes his destiny.', '
Hiroshi Hamasaki', '2003'),

('Trinity Blood', 'images/trinityBlood.png', 'The background is in the distant future after the destruction brought about by Armageddon. The war between the vampires and the humans continue to persist. In order to protect the humans from the vampires, the Vatican has to rely on other allies to counter the situation. The protagonist,  Abel Nightroad, is a traveling priest from the Vatican and a crusnik, a vampire that drinks the blood of vampires. He is a member of the , a special operations group led by Cardinal Catherina Sforza. He encounters a young girl called Esther, who decides to go with him to Rome and train at the Vatican. Soon after he meets her, the order of Rozencreuz, led by Abels twin, Cain, tries to continue the war so they can rule the world. It is up to Abel and the AX to try and stop them.', 'Tomohiro Hirata', '2005'),

('Zipang', 'images/zipang.jpg', 'Mirai, an improved Kongou-class Aegis guided missile destroyer, is one of the newest and most advanced ships in the entire Japanese Self Defense Force (SDF). Her crew, also one of the newest, is lead by Capt. Umezu Saburo and Executive Officer Kadomatsu Yosuke. While running scheduled training exercises one day, Mirai encounters a fierce storm that throws their navigation systems into temporary disarray. After a few minutes of recovery, the crew is shocked to discover that they have been transported back in time to June 4, 1942&mdash;The Battle of Midway, during World War II. Letting history take its course for this battle, they manage to avoid the conflict firsthand and make a vow to remain annonymous, changing history as little as possible. However, when the crew comes across the dying Lt. Commander Kusaka Takumi, XO. Kadomatsus instincts to save lives takes over, changing the course of history more than he could have imagined.', 'Kazuhiro Furuhashi', '2004'),

('Neon Genesis Evangelion', 'images/neonGenesis.jpg', 'In the year 2015, the Angels, huge, tremendously powerful, alien war machines, appear in Tokyo for the second time. The only hope for Mankinds survival lies in the Evangelion, a humanoid fighting machine developed by NERV, a special United Nations agency. Capable of withstanding anything the Angels can dish out, the Evangelions one drawback lies in the limited number of people able to pilot them. Only a handful of teenagers, all born fourteen years ago, nine months after the Angels first appeared, are able to interface with the Evangelion. One such teenager is Shinji Ikari, whose father heads the NERV team that developed and maintains the Evangelion. Thrust into a maelstrom of battle and events that he does not understand, Shinji is forced to plumb the depths of his own inner resources for the courage and strength to not only fight, but to survive, or risk losing everything.', 'Hideaki Anno', '1995'),

('Berserk', 'images/beserk.jpg', 'Set during a time that very much resembles Europe during the Middle Ages, Berserk is a story of revenge set in the castle town of Midland. Recently, the town has seen the rise of a wicked king, who uses demonic minions to control and victimise his subjects.However, when a lone soldier enters the town calling himself the Black Swordsman and armed to the teeth, many sense that the kings days of unchecked oppression are over. Soon, the Black Swordsman is plying his trade by hunting down the kings evil servants, giving no quarter, and preparing to exact his vengeance on the king.', 'Naohito Takahashi', '1997'),

('Ghost in the Shell', 'images/ghost.png', '2029: A female cybernetic government agent, Major Motoko Kusanagi, and the Internal Bureau of Investigations are hot on the trail of “The Puppet Master,” a mysterious and threatening computer virus capable of infiltrating human hosts. Together with her fellow agents from Section 9, Kusanagi embarks on a high-tech race against time to capture the omnipresent entity.', 'Mamoru Oshii', '1995'),

('Samurai X: Trust and Betrayal', 'images/samurai.png', 'In the days before the Japanese Revolution, Hiko Seiijuro, a wandering master swordsman and hermit, encounters a bandit raid on a slave wagon. Hiko kills the raiding bandits in hopes of saving as many lives as possible, but only manages to spare one life from the massacre. Hiko leaves the child, advising him to go to the nearby village and have them take care of him. A few days later, as Hiko comes back to check upon the child he saved, he is shocked to see the child had created graves, both for the slaves he befriended and the bandits who killed them. Seeing potential in the young one, Hiko takes the child under his wing, names him Kenshin, meaning \"heart of sword,\" and teaches him about the art of swordsmanship under the Hiten Mitsuruugi Ryu. Struggling in a constant challenge with his ideal beliefs reflecting against the harshness of reality, Tsuiokuhen tells the melancholic and dark story of Himura Kenshin as one of the most feared assassins of the Japanese Revolution: the Hitokiri Battousai.', '
Kazuhiro Furuhashi', '1995'),

('Rurouni Kenshin', 'images/rurouni.png', 'Himura Kenshin is a vagabond with a dark past and sunny disposition. Not a ronin but a rurouni, he was never a samurai, but an assassin of utmost skill in the Meiji restoration, who in the turning point of the war simply walked away. His travels lead him to Tokyo in the 11th year of the Meiji era, where he befriends a female Kendo master, a former thief, a brawler and a doctor all with their own secrets. Together they fight off the enemies surfacing from the dark past that Kenshin cannot escape.', 'Kazuhiro Furuhashi', '1996'),

('Akira', 'imags/akira.jpg', 'Its the year 2019, thirty-one years have passed since the start of World War III. A top-secret child with amazing powers of the mind breaks free from custody and accidentally gets a motorcycle gang involved in the project. This incident triggers psychic powers within one of the gang members, Tetsuo, and he is taken by the army to be experimented on. His mind has been altered and is now on the path of war, seeking revenge on the society that once called him weak.', 'Katsuhiro Ootomo', '1988'),

('Angel Sanctuary', 'images/angel.jpg', 'Mudou Setsuna, a high school student, loves his sister in a way that he should not. He also struggles from supernatural powers. Angels and demons flocks to him as the day of his awakening draws near &mdash;he is the angel Alexiel, the highest angel which fought against God, reborn.', '
Kiyoko Sayama', '2000'),

('Appleseed', 'images/appleseed.jpg', 'Growing out of the chaos of a global war, the city of Utopia is populated by humans and bioroids (artificial humans). On the surface, everything is harmonious, but tensions lurk. Into this seemingly perfect society comes a survivor of the wars, Deunan Knute, who carries a legacy that will turn out to be of critical importance to the future of humanity.', 'Shinji Aramaki', '2004'),

('Avenger', 'images/avenger.jpg', 'Mars has been colonized and is a world where children have been replaced by robot servents known as "dolls". Layla is a skilled fighter with a tragic past who travels about the world. Her companions are Nei, a strange and unique doll with some unknown ties to Layla, and Speedy, who is a doll breeder. The founders of Mars see the trio as a threat to their world, and each time they attack Layla and Nei a bit more of their mysterious past and future is revealed.', 'Kouichi Mashimo', '2003'),

('Basilisk', 'images/basilisk.jpg', 'The heirs to the Kouga and Iga ninja clans, Gennosuke and Oboro, hoped the unsteady truce between their tribes would last—but fate denies the lovers, thrusting their people into war after centuries of peace. The terms are set on two scrolls. One bears a list of Kouga warriors. The other holds a list of those who fight for Iga. The names found on these scrolls can only be crossed out in blood.', 'Fuminori Kizaki', '2005');

-- Starter animes and genres data
INSERT INTO "anime_genres" ("anime_id", "genre_id")
VALUES 
(1,1), (1,2), (1,4), (1,9), --Cowboy Bepop
(2,1), (2,2), (2,4), (2,3), (2,9), --Trigun
(3,1), (3,4), (3,6), (3,7), --Witch Hunter
(4,2), (4,5), (4,8), --Beet the Vandel Buster
(5,1), (5,3), (5,4), --Initial D
(6,4), (6,6), (6,7), (6,10), --Monster
(7,1), (7,2), (7,3), (7,9), --Desert Punk
(8,1), (8,4), (8,7), (8,9), --Texhnolyze
(9,1), (9,4), (9,6), (9,9), (9,10), --Trinity Blood
(10,1), (10,9), --Zipang
(11,1), (11,2), (11,4), (11,7), (11,9), --Neon Genesis
(12,1), (12,2), (12,4), (12,6), (12,10), --Berserk
(13,1), (13,7), (13,9),(13,10), --Ghost in the Shell
(14,1), (14,2), (14,4), (14,8), --Samurai X
(15,1), (15,2), (15,3), (15,4), (15,8), --Rurouni Kenshin
(16,1), (16,2), (16,6), (16,7), (16,9), --Akira
(17,1), (17,4), (17,8), --Angel Sanctuary
(18,1), (18,4), (18,9), --Appleseed
(19,1), (19,5), (19,9), --Avenger 
(20,1), (20,2), (20,4), (20,8); --Basilisk

-- Starter watchlist data
INSERT INTO "watchlist" ("user_id", "animeList_id")
VALUES 

(5,20), (5,19), (5,18), (5,17), (5,16), --Bill
(4,15), (4,14), (4,13), (4,12), (4,11), --PhoMaster
(3,10), (3,9), (3,8), (3,7), (3,6), --Sky Captain
(2,5), (2,4), (2,3), (2,2), (2,1), --Naruto
(1,20), (1,1), (1,8), (1,14), (1,5), (1,9); --Darth Vadar