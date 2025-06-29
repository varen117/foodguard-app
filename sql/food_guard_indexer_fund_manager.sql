/*
 Navicat Premium Dump SQL

 Source Server         : foodguard
 Source Server Type    : PostgreSQL
 Source Server Version : 160009 (160009)
 Source Host           : localhost:5440
 Source Catalog        : foodguard
 Source Schema         : food_guard_indexer_fund_manager

 Target Server Type    : PostgreSQL
 Target Server Version : 160009 (160009)
 File Encoding         : 65001

 Date: 29/06/2025 23:11:50
*/


-- ----------------------------
-- Sequence structure for business_process_anomaly_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."business_process_anomaly_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."business_process_anomaly_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."business_process_anomaly_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for delegation_updated_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."delegation_updated_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."delegation_updated_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."delegation_updated_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for deposit_frozen_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."deposit_frozen_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."deposit_frozen_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."deposit_frozen_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for deposit_made_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."deposit_made_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."deposit_made_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."deposit_made_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for deposit_unfrozen_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."deposit_unfrozen_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."deposit_unfrozen_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."deposit_unfrozen_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for fine_deduction_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."fine_deduction_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."fine_deduction_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."fine_deduction_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for funds_transferred_from_pool_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."funds_transferred_from_pool_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."funds_transferred_from_pool_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."funds_transferred_from_pool_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for funds_transferred_to_pool_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."funds_transferred_to_pool_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."funds_transferred_to_pool_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."funds_transferred_to_pool_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for governance_contract_set_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."governance_contract_set_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."governance_contract_set_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."governance_contract_set_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for paused_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."paused_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."paused_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."paused_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for reward_distribution_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."reward_distribution_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."reward_distribution_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."reward_distribution_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_admin_changed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."role_admin_changed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."role_admin_changed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."role_admin_changed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_granted_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."role_granted_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."role_granted_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."role_granted_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_revoked_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."role_revoked_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."role_revoked_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."role_revoked_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for unpaused_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_fund_manager"."unpaused_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_fund_manager"."unpaused_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_fund_manager"."unpaused_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for business_process_anomaly
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."business_process_anomaly";
CREATE TABLE "food_guard_indexer_fund_manager"."business_process_anomaly" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".business_process_anomaly_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_fund_manager"."business_process_anomaly" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_fund_manager"."business_process_anomaly" IS '@name FundManagerBusinessProcessAnomaly';

-- ----------------------------
-- Table structure for delegation_updated
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."delegation_updated";
CREATE TABLE "food_guard_indexer_fund_manager"."delegation_updated" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".delegation_updated_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "function_selector" bytea,
  "delegated_contract" char(42) COLLATE "pg_catalog"."default",
  "authorized" bool,
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_fund_manager"."delegation_updated" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for deposit_frozen
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."deposit_frozen";
CREATE TABLE "food_guard_indexer_fund_manager"."deposit_frozen" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".deposit_frozen_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "user" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
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
ALTER TABLE "food_guard_indexer_fund_manager"."deposit_frozen" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for deposit_made
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."deposit_made";
CREATE TABLE "food_guard_indexer_fund_manager"."deposit_made" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".deposit_made_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "user" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "total_deposit" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_fund_manager"."deposit_made" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for deposit_unfrozen
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."deposit_unfrozen";
CREATE TABLE "food_guard_indexer_fund_manager"."deposit_unfrozen" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".deposit_unfrozen_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "user" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_fund_manager"."deposit_unfrozen" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for fine_deduction
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."fine_deduction";
CREATE TABLE "food_guard_indexer_fund_manager"."fine_deduction" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".fine_deduction_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "user" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "total_deposit" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_fund_manager"."fine_deduction" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for funds_transferred_from_pool
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."funds_transferred_from_pool";
CREATE TABLE "food_guard_indexer_fund_manager"."funds_transferred_from_pool" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".funds_transferred_from_pool_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "recipient" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "purpose" text COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_fund_manager"."funds_transferred_from_pool" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for funds_transferred_to_pool
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."funds_transferred_to_pool";
CREATE TABLE "food_guard_indexer_fund_manager"."funds_transferred_to_pool" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".funds_transferred_to_pool_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "sender" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "purpose" text COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_fund_manager"."funds_transferred_to_pool" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for governance_contract_set
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."governance_contract_set";
CREATE TABLE "food_guard_indexer_fund_manager"."governance_contract_set" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".governance_contract_set_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_fund_manager"."governance_contract_set" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_fund_manager"."governance_contract_set" IS '@name FundManagerGovernanceContractSet';

-- ----------------------------
-- Table structure for paused
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."paused";
CREATE TABLE "food_guard_indexer_fund_manager"."paused" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".paused_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_fund_manager"."paused" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_fund_manager"."paused" IS '@name FundManagerPaused';

-- ----------------------------
-- Table structure for reward_distribution
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."reward_distribution";
CREATE TABLE "food_guard_indexer_fund_manager"."reward_distribution" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".reward_distribution_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "user" char(42) COLLATE "pg_catalog"."default",
  "amount" varchar(78) COLLATE "pg_catalog"."default",
  "total_deposit" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_fund_manager"."reward_distribution" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for role_admin_changed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."role_admin_changed";
CREATE TABLE "food_guard_indexer_fund_manager"."role_admin_changed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".role_admin_changed_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_fund_manager"."role_admin_changed" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_fund_manager"."role_admin_changed" IS '@name FundManagerRoleAdminChanged';

-- ----------------------------
-- Table structure for role_granted
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."role_granted";
CREATE TABLE "food_guard_indexer_fund_manager"."role_granted" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".role_granted_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_fund_manager"."role_granted" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_fund_manager"."role_granted" IS '@name FundManagerRoleGranted';

-- ----------------------------
-- Table structure for role_revoked
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."role_revoked";
CREATE TABLE "food_guard_indexer_fund_manager"."role_revoked" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".role_revoked_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_fund_manager"."role_revoked" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_fund_manager"."role_revoked" IS '@name FundManagerRoleRevoked';

-- ----------------------------
-- Table structure for unpaused
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_fund_manager"."unpaused";
CREATE TABLE "food_guard_indexer_fund_manager"."unpaused" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_fund_manager".unpaused_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_fund_manager"."unpaused" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_fund_manager"."unpaused" IS '@name FundManagerUnpaused';

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."business_process_anomaly_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."business_process_anomaly"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."business_process_anomaly_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."delegation_updated_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."delegation_updated"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."delegation_updated_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."deposit_frozen_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."deposit_frozen"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."deposit_frozen_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."deposit_made_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."deposit_made"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."deposit_made_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."deposit_unfrozen_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."deposit_unfrozen"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."deposit_unfrozen_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."fine_deduction_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."fine_deduction"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."fine_deduction_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."funds_transferred_from_pool_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."funds_transferred_from_pool"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."funds_transferred_from_pool_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."funds_transferred_to_pool_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."funds_transferred_to_pool"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."funds_transferred_to_pool_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."governance_contract_set_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."governance_contract_set"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."governance_contract_set_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."paused_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."paused"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."paused_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."reward_distribution_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."reward_distribution"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."reward_distribution_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."role_admin_changed_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."role_admin_changed"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."role_admin_changed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."role_granted_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."role_granted"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."role_granted_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."role_revoked_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."role_revoked"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."role_revoked_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_fund_manager"."unpaused_rindexer_id_seq"
OWNED BY "food_guard_indexer_fund_manager"."unpaused"."rindexer_id";
SELECT setval('"food_guard_indexer_fund_manager"."unpaused_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table business_process_anomaly
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."business_process_anomaly" ADD CONSTRAINT "business_process_anomaly_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table delegation_updated
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."delegation_updated" ADD CONSTRAINT "delegation_updated_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table deposit_frozen
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."deposit_frozen" ADD CONSTRAINT "deposit_frozen_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table deposit_made
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."deposit_made" ADD CONSTRAINT "deposit_made_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table deposit_unfrozen
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."deposit_unfrozen" ADD CONSTRAINT "deposit_unfrozen_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table fine_deduction
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."fine_deduction" ADD CONSTRAINT "fine_deduction_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table funds_transferred_from_pool
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."funds_transferred_from_pool" ADD CONSTRAINT "funds_transferred_from_pool_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table funds_transferred_to_pool
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."funds_transferred_to_pool" ADD CONSTRAINT "funds_transferred_to_pool_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table governance_contract_set
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."governance_contract_set" ADD CONSTRAINT "governance_contract_set_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table paused
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."paused" ADD CONSTRAINT "paused_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table reward_distribution
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."reward_distribution" ADD CONSTRAINT "reward_distribution_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_admin_changed
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."role_admin_changed" ADD CONSTRAINT "role_admin_changed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_granted
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."role_granted" ADD CONSTRAINT "role_granted_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_revoked
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."role_revoked" ADD CONSTRAINT "role_revoked_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table unpaused
-- ----------------------------
ALTER TABLE "food_guard_indexer_fund_manager"."unpaused" ADD CONSTRAINT "unpaused_pkey" PRIMARY KEY ("rindexer_id");
