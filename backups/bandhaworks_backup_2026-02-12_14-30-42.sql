-- Bandha Works Database Backup
-- Date: 2026-02-12_14-30-42

PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE passes (
id TEXT PRIMARY KEY,
pass_type TEXT NOT NULL CHECK(pass_type IN ('monthly', 'ten_pack', 'yearly')),
expiration_date TEXT NOT NULL,
uses_remaining INTEGER DEFAULT NULL,
created_at TEXT NOT NULL DEFAULT (datetime('now')),
is_active INTEGER NOT NULL DEFAULT 1
);
INSERT INTO passes VALUES('pass-monthly-1','monthly','2025-12-13 17:22:04',NULL,'2025-11-13 17:22:04',1);
INSERT INTO passes VALUES('pass-tenpack-100','ten_pack','2026-01-26 17:08:09',8,'2025-11-27 17:08:09',1);
INSERT INTO passes VALUES('pass-yearly-1','yearly','''2026-12-31 23:59:59',NULL,'2026-02-08 11:05:04',1);

CREATE TABLE "users" (
id           TEXT PRIMARY KEY,
"first_name"     TEXT,
password     TEXT,
email        TEXT UNIQUE,
alias        TEXT,
create_date  TEXT,
modify_date  TEXT,
birthday     TEXT,
pass_type    TEXT,
role         TEXT NOT NULL DEFAULT 'practitioner'
, last_asana TEXT, avatar_url TEXT, avatar_updated_at INTEGER, injuries TEXT, internal_notes TEXT, `family_name` text, phone_number TEXT, gender TEXT, is_enabled INTEGER NOT NULL DEFAULT 1);
INSERT INTO users VALUES('108','Istvan ','frankel108','bandha.works@gmail.com','istvanji',NULL,NULL,'1975-03-12','pass-tenpack-100','admin','bhakasana',NULL,NULL,NULL,NULL,'Szalai','+36309004142','man',1);
INSERT INTO users VALUES('101','Réka','princess@108','rekaosi@gmail.com','rekanora',NULL,NULL,'1977-08-09','monthly','practitioner','marícsászana c','/images/avatars/user-101.jpeg',1768258800,NULL,NULL,'Ösi','+36301819149','woman',1);
INSERT INTO users VALUES('102','Ákos','blackyogi@108','akos.m.fekete@gmail.com','Ákos',NULL,NULL,'1995-12-22','monthly','practitioner','dvi pádá sírsászana','/images/avatars/user-102.jpeg',NULL,NULL,NULL,'Fekete',' +36705200134','man',1);
INSERT INTO users VALUES('103','Bernadett','cyber@artrbl108','bettidian@gmail.com','Betti',NULL,NULL,'1993-06-19','monthly','practitioner','pásászana','/images/avatars/user-103.jpeg',NULL,NULL,NULL,'Dian','+36304765663','woman',1);
INSERT INTO users VALUES('104','Adrien','pianist@yogi108','adrien.reizer@gmail.com','adri',NULL,NULL,'1979-11-06 ','monthly','practitioner','szétú bandhászana','/images/avatars/user-104.jpeg',NULL,NULL,NULL,'Reizer','+36205720588','woman',1);
INSERT INTO users VALUES('105','Melinda Ingrid','targaryen@yogini108','fekete.melinda.ingrid@gmail.com','Melinda',NULL,NULL,'1996-06-23','monthly','practitioner','úrdvhamukha páscsimattánászana ','/images/avatars/user-105.jpeg',NULL,NULL,NULL,'Fekete','+36307291311','woman',1);
INSERT INTO users VALUES('106','Andor','rebel@andor108','jagerandor@hotmail.com','Andorji',NULL,NULL,'1996-12-25','monthly','practitioner','marícsászana d','/images/avatars/user-106.jpeg',NULL,NULL,NULL,'Jáger','+36309681835','man',1);

CREATE TABLE attendances ( id TEXT PRIMARY KEY, user_id TEXT NOT NULL, pass_id TEXT NOT NULL, class_id TEXT, attendance_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, internal_notes TEXT,  FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (pass_id) REFERENCES passes(id) );
INSERT INTO attendances VALUES('91680061bf6bdd32859d528239dc93de','108','pass-tenpack-100',NULL,'2025-12-18 17:32:35',NULL);
INSERT INTO attendances VALUES('05f47464265cf3fcc5782987f1c427fd','108','pass-tenpack-100',NULL,'2025-12-18 17:36:50',NULL);

CREATE TABLE membership_plans (
id TEXT PRIMARY KEY,
name TEXT NOT NULL,
tier TEXT NOT NULL,              -- basic | silver | gold
description TEXT,
billing_period TEXT NOT NULL,    -- 'month' (később lehet 'year')
is_active INTEGER NOT NULL DEFAULT 1,
created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO membership_plans VALUES('patron-basic','Pártolói tagság – Alap','basic',NULL,'month',1,'2026-01-14 13:29:48');
INSERT INTO membership_plans VALUES('patron-silver','Pártolói tagság – Ezüst','silver',NULL,'month',1,'2026-01-14 13:29:48');
INSERT INTO membership_plans VALUES('patron-gold','Pártolói tagság – Arany','gold',NULL,'month',1,'2026-01-14 13:29:48');

CREATE TABLE user_memberships (
id TEXT PRIMARY KEY,
user_id INTEGER NOT NULL,
plan_id TEXT NOT NULL,
started_at TEXT NOT NULL,
expires_at TEXT NOT NULL,
status TEXT NOT NULL DEFAULT 'active',
-- active | paused | cancelled | expired
created_at TEXT DEFAULT CURRENT_TIMESTAMP,
internal_notes TEXT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (plan_id) REFERENCES membership_plans(id)
);

CREATE TABLE "user_passes" (
id TEXT PRIMARY KEY,
user_id TEXT NOT NULL UNIQUE,
pass_id TEXT NOT NULL,
assigned_at TEXT NOT NULL DEFAULT (datetime('now')),
expires_at TEXT,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (pass_id) REFERENCES passes(id) ON DELETE CASCADE
);
INSERT INTO user_passes VALUES('ewefwefwe21233123e12','101','pass-monthly-1','2026-01-23','2026-02-22');
INSERT INTO user_passes VALUES('02b8cea547ee5d438edd7c9a369b3c82','102','pass-monthly-1','2026-02-08','2026-03-07');
INSERT INTO user_passes VALUES('e7da2c4ef6591939526254142aa6d914','103','pass-monthly-1','2026-02-08','2026-02-28');
INSERT INTO user_passes VALUES('909ccf90ce00e3d5a548dd5dce9f1a36','104','pass-yearly-1','2026-02-08','2027-02-07');
INSERT INTO user_passes VALUES('bc8df57de88b2dc7ad5c7f9124d85b44','105','pass-monthly-1','2026-02-08','2026-03-07');
INSERT INTO user_passes VALUES('1aa00fc03db492caae8e69bfef2b8921','108','pass-tenpack-100','2025-12-18',NULL);
INSERT INTO user_passes VALUES(NULL,'106','pass-monthly-1','2026-02-12','2026-03-11');

COMMIT;
