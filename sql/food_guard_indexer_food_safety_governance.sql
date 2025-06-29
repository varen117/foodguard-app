/*
 Navicat Premium Dump SQL

 Source Server         : foodguard
 Source Server Type    : PostgreSQL
 Source Server Version : 160009 (160009)
 Source Host           : localhost:5440
 Source Catalog        : foodguard
 Source Schema         : food_guard_indexer_food_safety_governance

 Target Server Type    : PostgreSQL
 Target Server Version : 160009 (160009)
 File Encoding         : 65001

 Date: 29/06/2025 23:11:39
*/


-- ----------------------------
-- Sequence structure for auto_execution_batch_processed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for auto_execution_failed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."auto_execution_failed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_failed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_failed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for auto_execution_success_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."auto_execution_success_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_success_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_success_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for case_cancelled_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."case_cancelled_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."case_cancelled_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."case_cancelled_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for case_completed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."case_completed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."case_completed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."case_completed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for case_status_updated_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."case_status_updated_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."case_status_updated_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."case_status_updated_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for complaint_created_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."complaint_created_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."complaint_created_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."complaint_created_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for coordinator_set_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."coordinator_set_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."coordinator_set_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."coordinator_set_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for ownership_transfer_requested_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."ownership_transfer_requested_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."ownership_transfer_requested_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."ownership_transfer_requested_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for ownership_transferred_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."ownership_transferred_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."ownership_transferred_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."ownership_transferred_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for paused_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."paused_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."paused_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."paused_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for system_config_updated_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."system_config_updated_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."system_config_updated_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."system_config_updated_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for unpaused_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."unpaused_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."unpaused_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."unpaused_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for vote_start_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_food_safety_governance"."vote_start_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_food_safety_governance"."vote_start_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."vote_start_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for auto_execution_batch_processed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed";
CREATE TABLE "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".auto_execution_batch_processed_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "total_cases" varchar(78) COLLATE "pg_catalog"."default",
  "successful_cases" varchar(78) COLLATE "pg_catalog"."default",
  "failed_cases" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for auto_execution_failed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."auto_execution_failed";
CREATE TABLE "food_guard_indexer_food_safety_governance"."auto_execution_failed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".auto_execution_failed_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "action_type" varchar(78) COLLATE "pg_catalog"."default",
  "action_name" text COLLATE "pg_catalog"."default",
  "error_reason" text COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."auto_execution_failed" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for auto_execution_success
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."auto_execution_success";
CREATE TABLE "food_guard_indexer_food_safety_governance"."auto_execution_success" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".auto_execution_success_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "action_type" varchar(78) COLLATE "pg_catalog"."default",
  "action_name" text COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."auto_execution_success" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for case_cancelled
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."case_cancelled";
CREATE TABLE "food_guard_indexer_food_safety_governance"."case_cancelled" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".case_cancelled_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "reason" text COLLATE "pg_catalog"."default",
  "cancelled_by" char(42) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."case_cancelled" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for case_completed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."case_completed";
CREATE TABLE "food_guard_indexer_food_safety_governance"."case_completed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".case_completed_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "complaint_upheld" bool,
  "total_reward_amount" varchar(78) COLLATE "pg_catalog"."default",
  "total_punishment_amount" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."case_completed" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for case_status_updated
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."case_status_updated";
CREATE TABLE "food_guard_indexer_food_safety_governance"."case_status_updated" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".case_status_updated_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "old_status" int2,
  "new_status" int2,
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."case_status_updated" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for complaint_created
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."complaint_created";
CREATE TABLE "food_guard_indexer_food_safety_governance"."complaint_created" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".complaint_created_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "complainant" char(42) COLLATE "pg_catalog"."default",
  "enterprise" char(42) COLLATE "pg_catalog"."default",
  "complaint_title" text COLLATE "pg_catalog"."default",
  "risk_level" int2,
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."complaint_created" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for coordinator_set
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."coordinator_set";
CREATE TABLE "food_guard_indexer_food_safety_governance"."coordinator_set" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".coordinator_set_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "vrf_coordinator" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."coordinator_set" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for ownership_transfer_requested
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."ownership_transfer_requested";
CREATE TABLE "food_guard_indexer_food_safety_governance"."ownership_transfer_requested" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".ownership_transfer_requested_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "from" char(42) COLLATE "pg_catalog"."default",
  "to" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."ownership_transfer_requested" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for ownership_transferred
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."ownership_transferred";
CREATE TABLE "food_guard_indexer_food_safety_governance"."ownership_transferred" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".ownership_transferred_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "from" char(42) COLLATE "pg_catalog"."default",
  "to" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."ownership_transferred" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_food_safety_governance"."ownership_transferred" IS '@name FoodSafetyGovernanceOwnershipTransferred';

-- ----------------------------
-- Table structure for paused
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."paused";
CREATE TABLE "food_guard_indexer_food_safety_governance"."paused" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".paused_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "account" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."paused" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_food_safety_governance"."paused" IS '@name FoodSafetyGovernancePaused';

-- ----------------------------
-- Table structure for system_config_updated
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."system_config_updated";
CREATE TABLE "food_guard_indexer_food_safety_governance"."system_config_updated" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".system_config_updated_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_food_safety_governance"."system_config_updated" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_food_safety_governance"."system_config_updated" IS '@name FoodSafetyGovernanceSystemConfigUpdated';

-- ----------------------------
-- Table structure for unpaused
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."unpaused";
CREATE TABLE "food_guard_indexer_food_safety_governance"."unpaused" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".unpaused_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "account" char(42) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."unpaused" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_food_safety_governance"."unpaused" IS '@name FoodSafetyGovernanceUnpaused';

-- ----------------------------
-- Table structure for vote_start
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_food_safety_governance"."vote_start";
CREATE TABLE "food_guard_indexer_food_safety_governance"."vote_start" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_food_safety_governance".vote_start_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "validators" text[] COLLATE "pg_catalog"."default",
  "start_time" varchar(78) COLLATE "pg_catalog"."default",
  "end_time" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_food_safety_governance"."vote_start" OWNER TO "rindexer";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."auto_execution_batch_processed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_failed_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."auto_execution_failed"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."auto_execution_failed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."auto_execution_success_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."auto_execution_success"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."auto_execution_success_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."case_cancelled_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."case_cancelled"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."case_cancelled_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."case_completed_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."case_completed"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."case_completed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."case_status_updated_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."case_status_updated"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."case_status_updated_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."complaint_created_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."complaint_created"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."complaint_created_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."coordinator_set_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."coordinator_set"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."coordinator_set_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."ownership_transfer_requested_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."ownership_transfer_requested"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."ownership_transfer_requested_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."ownership_transferred_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."ownership_transferred"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."ownership_transferred_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."paused_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."paused"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."paused_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."system_config_updated_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."system_config_updated"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."system_config_updated_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."unpaused_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."unpaused"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."unpaused_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_food_safety_governance"."vote_start_rindexer_id_seq"
OWNED BY "food_guard_indexer_food_safety_governance"."vote_start"."rindexer_id";
SELECT setval('"food_guard_indexer_food_safety_governance"."vote_start_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table auto_execution_batch_processed
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."auto_execution_batch_processed" ADD CONSTRAINT "auto_execution_batch_processed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table auto_execution_failed
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."auto_execution_failed" ADD CONSTRAINT "auto_execution_failed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table auto_execution_success
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."auto_execution_success" ADD CONSTRAINT "auto_execution_success_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table case_cancelled
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."case_cancelled" ADD CONSTRAINT "case_cancelled_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table case_completed
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."case_completed" ADD CONSTRAINT "case_completed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table case_status_updated
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."case_status_updated" ADD CONSTRAINT "case_status_updated_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table complaint_created
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."complaint_created" ADD CONSTRAINT "complaint_created_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table coordinator_set
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."coordinator_set" ADD CONSTRAINT "coordinator_set_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table ownership_transfer_requested
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."ownership_transfer_requested" ADD CONSTRAINT "ownership_transfer_requested_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table ownership_transferred
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."ownership_transferred" ADD CONSTRAINT "ownership_transferred_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table paused
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."paused" ADD CONSTRAINT "paused_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table system_config_updated
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."system_config_updated" ADD CONSTRAINT "system_config_updated_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table unpaused
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."unpaused" ADD CONSTRAINT "unpaused_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table vote_start
-- ----------------------------
ALTER TABLE "food_guard_indexer_food_safety_governance"."vote_start" ADD CONSTRAINT "vote_start_pkey" PRIMARY KEY ("rindexer_id");
