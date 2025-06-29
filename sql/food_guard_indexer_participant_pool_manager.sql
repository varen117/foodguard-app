/*
 Navicat Premium Dump SQL

 Source Server         : foodguard
 Source Server Type    : PostgreSQL
 Source Server Version : 160009 (160009)
 Source Host           : localhost:5440
 Source Catalog        : foodguard
 Source Schema         : food_guard_indexer_participant_pool_manager

 Target Server Type    : PostgreSQL
 Target Server Version : 160009 (160009)
 File Encoding         : 65001

 Date: 29/06/2025 23:12:06
*/


-- ----------------------------
-- Sequence structure for business_process_anomaly_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."business_process_anomaly_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."business_process_anomaly_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."business_process_anomaly_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for challengers_selected_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."challengers_selected_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."challengers_selected_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."challengers_selected_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for governance_contract_set_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."governance_contract_set_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."governance_contract_set_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."governance_contract_set_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for ownership_transferred_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."ownership_transferred_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."ownership_transferred_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."ownership_transferred_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_admin_changed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."role_admin_changed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."role_admin_changed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."role_admin_changed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_granted_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."role_granted_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."role_granted_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."role_granted_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_revoked_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."role_revoked_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."role_revoked_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."role_revoked_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for user_registered_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."user_registered_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."user_registered_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."user_registered_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for user_role_updated_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."user_role_updated_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."user_role_updated_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."user_role_updated_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for validators_selected_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_participant_pool_manager"."validators_selected_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_participant_pool_manager"."validators_selected_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."validators_selected_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for business_process_anomaly
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."business_process_anomaly";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."business_process_anomaly" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".business_process_anomaly_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "user" char(42) COLLATE "pg_catalog"."default",
  "process_name" text COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "action" text COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."business_process_anomaly" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_participant_pool_manager"."business_process_anomaly" IS '@name ParticipantPoolManagerBusinessProcessAnomaly';

-- ----------------------------
-- Table structure for challengers_selected
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."challengers_selected";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."challengers_selected" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".challengers_selected_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "target_validator" char(42) COLLATE "pg_catalog"."default",
  "challengers" text[] COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."challengers_selected" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for governance_contract_set
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."governance_contract_set";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."governance_contract_set" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".governance_contract_set_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "governance_contract" char(42) COLLATE "pg_catalog"."default",
  "module" char(42) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."governance_contract_set" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_participant_pool_manager"."governance_contract_set" IS '@name ParticipantPoolManagerGovernanceContractSet';

-- ----------------------------
-- Table structure for ownership_transferred
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."ownership_transferred";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."ownership_transferred" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".ownership_transferred_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "previous_owner" char(42) COLLATE "pg_catalog"."default",
  "new_owner" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."ownership_transferred" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_participant_pool_manager"."ownership_transferred" IS '@name ParticipantPoolManagerOwnershipTransferred';

-- ----------------------------
-- Table structure for role_admin_changed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."role_admin_changed";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."role_admin_changed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".role_admin_changed_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "role" bytea,
  "previous_admin_role" bytea,
  "new_admin_role" bytea,
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."role_admin_changed" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_participant_pool_manager"."role_admin_changed" IS '@name ParticipantPoolManagerRoleAdminChanged';

-- ----------------------------
-- Table structure for role_granted
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."role_granted";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."role_granted" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".role_granted_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "role" bytea,
  "account" char(42) COLLATE "pg_catalog"."default",
  "sender" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."role_granted" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_participant_pool_manager"."role_granted" IS '@name ParticipantPoolManagerRoleGranted';

-- ----------------------------
-- Table structure for role_revoked
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."role_revoked";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."role_revoked" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".role_revoked_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "role" bytea,
  "account" char(42) COLLATE "pg_catalog"."default",
  "sender" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."role_revoked" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_participant_pool_manager"."role_revoked" IS '@name ParticipantPoolManagerRoleRevoked';

-- ----------------------------
-- Table structure for user_registered
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."user_registered";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."user_registered" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".user_registered_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "user" char(42) COLLATE "pg_catalog"."default",
  "role" int2,
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."user_registered" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for user_role_updated
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."user_role_updated";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."user_role_updated" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".user_role_updated_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "user" char(42) COLLATE "pg_catalog"."default",
  "old_role" int2,
  "new_role" int2,
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."user_role_updated" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for validators_selected
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_participant_pool_manager"."validators_selected";
CREATE TABLE "food_guard_indexer_participant_pool_manager"."validators_selected" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_participant_pool_manager".validators_selected_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "validators" text[] COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_participant_pool_manager"."validators_selected" OWNER TO "rindexer";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."business_process_anomaly_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."business_process_anomaly"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."business_process_anomaly_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."challengers_selected_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."challengers_selected"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."challengers_selected_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."governance_contract_set_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."governance_contract_set"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."governance_contract_set_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."ownership_transferred_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."ownership_transferred"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."ownership_transferred_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."role_admin_changed_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."role_admin_changed"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."role_admin_changed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."role_granted_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."role_granted"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."role_granted_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."role_revoked_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."role_revoked"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."role_revoked_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."user_registered_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."user_registered"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."user_registered_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."user_role_updated_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."user_role_updated"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."user_role_updated_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_participant_pool_manager"."validators_selected_rindexer_id_seq"
OWNED BY "food_guard_indexer_participant_pool_manager"."validators_selected"."rindexer_id";
SELECT setval('"food_guard_indexer_participant_pool_manager"."validators_selected_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table business_process_anomaly
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."business_process_anomaly" ADD CONSTRAINT "business_process_anomaly_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table challengers_selected
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."challengers_selected" ADD CONSTRAINT "challengers_selected_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table governance_contract_set
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."governance_contract_set" ADD CONSTRAINT "governance_contract_set_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table ownership_transferred
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."ownership_transferred" ADD CONSTRAINT "ownership_transferred_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_admin_changed
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."role_admin_changed" ADD CONSTRAINT "role_admin_changed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_granted
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."role_granted" ADD CONSTRAINT "role_granted_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_revoked
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."role_revoked" ADD CONSTRAINT "role_revoked_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table user_registered
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."user_registered" ADD CONSTRAINT "user_registered_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table user_role_updated
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."user_role_updated" ADD CONSTRAINT "user_role_updated_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table validators_selected
-- ----------------------------
ALTER TABLE "food_guard_indexer_participant_pool_manager"."validators_selected" ADD CONSTRAINT "validators_selected_pkey" PRIMARY KEY ("rindexer_id");
