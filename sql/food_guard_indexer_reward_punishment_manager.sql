/*
 Navicat Premium Dump SQL

 Source Server         : foodguard
 Source Server Type    : PostgreSQL
 Source Server Version : 160009 (160009)
 Source Host           : localhost:5440
 Source Catalog        : foodguard
 Source Schema         : food_guard_indexer_reward_punishment_manager

 Target Server Type    : PostgreSQL
 Target Server Version : 160009 (160009)
 File Encoding         : 65001

 Date: 29/06/2025 23:12:20
*/


-- ----------------------------
-- Sequence structure for business_process_anomaly_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."business_process_anomaly_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."business_process_anomaly_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."business_process_anomaly_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for governance_contract_set_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."governance_contract_set_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."governance_contract_set_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."governance_contract_set_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for ownership_transferred_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."ownership_transferred_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."ownership_transferred_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."ownership_transferred_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for punishment_executed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."punishment_executed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."punishment_executed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."punishment_executed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for reward_distributed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."reward_distributed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."reward_distributed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."reward_distributed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for reward_punishment_calculation_started_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_admin_changed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."role_admin_changed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_admin_changed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_admin_changed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_granted_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."role_granted_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_granted_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_granted_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_revoked_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."role_revoked_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_revoked_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_revoked_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for system_config_updated_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_reward_punishment_manager"."system_config_updated_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_reward_punishment_manager"."system_config_updated_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."system_config_updated_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for business_process_anomaly
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."business_process_anomaly";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."business_process_anomaly" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".business_process_anomaly_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."business_process_anomaly" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_reward_punishment_manager"."business_process_anomaly" IS '@name RewardPunishmentManagerBusinessProcessAnomaly';

-- ----------------------------
-- Table structure for governance_contract_set
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."governance_contract_set";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."governance_contract_set" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".governance_contract_set_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."governance_contract_set" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_reward_punishment_manager"."governance_contract_set" IS '@name RewardPunishmentManagerGovernanceContractSet';

-- ----------------------------
-- Table structure for ownership_transferred
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."ownership_transferred";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."ownership_transferred" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".ownership_transferred_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."ownership_transferred" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_reward_punishment_manager"."ownership_transferred" IS '@name RewardPunishmentManagerOwnershipTransferred';

-- ----------------------------
-- Table structure for punishment_executed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."punishment_executed";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."punishment_executed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".punishment_executed_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "target" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "reason" text COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."punishment_executed" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for reward_distributed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."reward_distributed";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."reward_distributed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".reward_distributed_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "recipient" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "reason" text COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."reward_distributed" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for reward_punishment_calculation_started
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".reward_punishment_calculation_started_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "complaint_upheld" bool,
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for role_admin_changed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."role_admin_changed";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."role_admin_changed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".role_admin_changed_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."role_admin_changed" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_reward_punishment_manager"."role_admin_changed" IS '@name RewardPunishmentManagerRoleAdminChanged';

-- ----------------------------
-- Table structure for role_granted
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."role_granted";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."role_granted" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".role_granted_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."role_granted" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_reward_punishment_manager"."role_granted" IS '@name RewardPunishmentManagerRoleGranted';

-- ----------------------------
-- Table structure for role_revoked
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."role_revoked";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."role_revoked" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".role_revoked_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."role_revoked" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_reward_punishment_manager"."role_revoked" IS '@name RewardPunishmentManagerRoleRevoked';

-- ----------------------------
-- Table structure for system_config_updated
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_reward_punishment_manager"."system_config_updated";
CREATE TABLE "food_guard_indexer_reward_punishment_manager"."system_config_updated" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_reward_punishment_manager".system_config_updated_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "config_type" text COLLATE "pg_catalog"."default",
  "description" text COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."system_config_updated" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_reward_punishment_manager"."system_config_updated" IS '@name RewardPunishmentManagerSystemConfigUpdated';

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."business_process_anomaly_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."business_process_anomaly"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."business_process_anomaly_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."governance_contract_set_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."governance_contract_set"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."governance_contract_set_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."ownership_transferred_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."ownership_transferred"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."ownership_transferred_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."punishment_executed_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."punishment_executed"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."punishment_executed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."reward_distributed_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."reward_distributed"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."reward_distributed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_admin_changed_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."role_admin_changed"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."role_admin_changed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_granted_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."role_granted"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."role_granted_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."role_revoked_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."role_revoked"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."role_revoked_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_reward_punishment_manager"."system_config_updated_rindexer_id_seq"
OWNED BY "food_guard_indexer_reward_punishment_manager"."system_config_updated"."rindexer_id";
SELECT setval('"food_guard_indexer_reward_punishment_manager"."system_config_updated_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table business_process_anomaly
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."business_process_anomaly" ADD CONSTRAINT "business_process_anomaly_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table governance_contract_set
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."governance_contract_set" ADD CONSTRAINT "governance_contract_set_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table ownership_transferred
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."ownership_transferred" ADD CONSTRAINT "ownership_transferred_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table punishment_executed
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."punishment_executed" ADD CONSTRAINT "punishment_executed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table reward_distributed
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."reward_distributed" ADD CONSTRAINT "reward_distributed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table reward_punishment_calculation_started
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."reward_punishment_calculation_started" ADD CONSTRAINT "reward_punishment_calculation_started_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_admin_changed
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."role_admin_changed" ADD CONSTRAINT "role_admin_changed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_granted
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."role_granted" ADD CONSTRAINT "role_granted_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_revoked
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."role_revoked" ADD CONSTRAINT "role_revoked_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table system_config_updated
-- ----------------------------
ALTER TABLE "food_guard_indexer_reward_punishment_manager"."system_config_updated" ADD CONSTRAINT "system_config_updated_pkey" PRIMARY KEY ("rindexer_id");
