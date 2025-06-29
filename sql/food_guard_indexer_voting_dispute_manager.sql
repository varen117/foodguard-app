/*
 Navicat Premium Dump SQL

 Source Server         : foodguard
 Source Server Type    : PostgreSQL
 Source Server Version : 160009 (160009)
 Source Host           : localhost:5440
 Source Catalog        : foodguard
 Source Schema         : food_guard_indexer_voting_dispute_manager

 Target Server Type    : PostgreSQL
 Target Server Version : 160009 (160009)
 File Encoding         : 65001

 Date: 29/06/2025 23:12:35
*/


-- ----------------------------
-- Sequence structure for business_process_anomaly_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."business_process_anomaly_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."business_process_anomaly_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."business_process_anomaly_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for challenge_phase_ended_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for challenge_phase_started_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."challenge_phase_started_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_phase_started_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_phase_started_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for challenge_submitted_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."challenge_submitted_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_submitted_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_submitted_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for emergency_triggered_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."emergency_triggered_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."emergency_triggered_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."emergency_triggered_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for governance_contract_set_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."governance_contract_set_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."governance_contract_set_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."governance_contract_set_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for ownership_transferred_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."ownership_transferred_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."ownership_transferred_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."ownership_transferred_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_admin_changed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."role_admin_changed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_admin_changed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_admin_changed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_granted_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."role_granted_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_granted_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_granted_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for role_revoked_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."role_revoked_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_revoked_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_revoked_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for system_config_updated_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."system_config_updated_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."system_config_updated_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."system_config_updated_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for vote_session_start_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."vote_session_start_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."vote_session_start_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."vote_session_start_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for vote_submitted_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."vote_submitted_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."vote_submitted_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."vote_submitted_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Sequence structure for voting_completed_rindexer_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "food_guard_indexer_voting_dispute_manager"."voting_completed_rindexer_id_seq";
CREATE SEQUENCE "food_guard_indexer_voting_dispute_manager"."voting_completed_rindexer_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."voting_completed_rindexer_id_seq" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for business_process_anomaly
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."business_process_anomaly";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."business_process_anomaly" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".business_process_anomaly_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."business_process_anomaly" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_voting_dispute_manager"."business_process_anomaly" IS '@name VotingDisputeManagerBusinessProcessAnomaly';

-- ----------------------------
-- Table structure for challenge_phase_ended
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".challenge_phase_ended_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "total_challenges" varchar(78) COLLATE "pg_catalog"."default",
  "result_changed" bool,
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for challenge_phase_started
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."challenge_phase_started";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."challenge_phase_started" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".challenge_phase_started_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."challenge_phase_started" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for challenge_submitted
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."challenge_submitted";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."challenge_submitted" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".challenge_submitted_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "challenger" char(42) COLLATE "pg_catalog"."default",
  "target_validator" char(42) COLLATE "pg_catalog"."default",
  "choice" int2,
  "reason" text COLLATE "pg_catalog"."default",
  "challenge_deposit" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."challenge_submitted" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for emergency_triggered
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."emergency_triggered";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."emergency_triggered" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".emergency_triggered_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "reason" text COLLATE "pg_catalog"."default",
  "triggered_by" char(42) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."emergency_triggered" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for governance_contract_set
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."governance_contract_set";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."governance_contract_set" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".governance_contract_set_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."governance_contract_set" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_voting_dispute_manager"."governance_contract_set" IS '@name VotingDisputeManagerGovernanceContractSet';

-- ----------------------------
-- Table structure for ownership_transferred
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."ownership_transferred";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."ownership_transferred" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".ownership_transferred_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."ownership_transferred" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_voting_dispute_manager"."ownership_transferred" IS '@name VotingDisputeManagerOwnershipTransferred';

-- ----------------------------
-- Table structure for role_admin_changed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."role_admin_changed";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."role_admin_changed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".role_admin_changed_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."role_admin_changed" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_voting_dispute_manager"."role_admin_changed" IS '@name VotingDisputeManagerRoleAdminChanged';

-- ----------------------------
-- Table structure for role_granted
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."role_granted";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."role_granted" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".role_granted_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."role_granted" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_voting_dispute_manager"."role_granted" IS '@name VotingDisputeManagerRoleGranted';

-- ----------------------------
-- Table structure for role_revoked
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."role_revoked";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."role_revoked" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".role_revoked_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."role_revoked" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_voting_dispute_manager"."role_revoked" IS '@name VotingDisputeManagerRoleRevoked';

-- ----------------------------
-- Table structure for system_config_updated
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."system_config_updated";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."system_config_updated" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".system_config_updated_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."system_config_updated" OWNER TO "rindexer";
COMMENT ON TABLE "food_guard_indexer_voting_dispute_manager"."system_config_updated" IS '@name VotingDisputeManagerSystemConfigUpdated';

-- ----------------------------
-- Table structure for vote_session_start
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."vote_session_start";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."vote_session_start" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".vote_session_start_rindexer_id_seq'::regclass),
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
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."vote_session_start" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for vote_submitted
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."vote_submitted";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."vote_submitted" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".vote_submitted_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "voter" char(42) COLLATE "pg_catalog"."default",
  "choice" int2,
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."vote_submitted" OWNER TO "rindexer";

-- ----------------------------
-- Table structure for voting_completed
-- ----------------------------
DROP TABLE IF EXISTS "food_guard_indexer_voting_dispute_manager"."voting_completed";
CREATE TABLE "food_guard_indexer_voting_dispute_manager"."voting_completed" (
  "rindexer_id" int4 NOT NULL DEFAULT nextval('"food_guard_indexer_voting_dispute_manager".voting_completed_rindexer_id_seq'::regclass),
  "contract_address" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "case_id" varchar(78) COLLATE "pg_catalog"."default",
  "complaint_upheld" bool,
  "support_votes" varchar(78) COLLATE "pg_catalog"."default",
  "reject_votes" varchar(78) COLLATE "pg_catalog"."default",
  "timestamp" varchar(78) COLLATE "pg_catalog"."default",
  "tx_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "block_number" numeric NOT NULL,
  "block_hash" char(66) COLLATE "pg_catalog"."default" NOT NULL,
  "network" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "tx_index" numeric NOT NULL,
  "log_index" varchar(78) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."voting_completed" OWNER TO "rindexer";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."business_process_anomaly_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."business_process_anomaly"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."business_process_anomaly_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."challenge_phase_ended_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_phase_started_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."challenge_phase_started"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."challenge_phase_started_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."challenge_submitted_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."challenge_submitted"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."challenge_submitted_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."emergency_triggered_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."emergency_triggered"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."emergency_triggered_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."governance_contract_set_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."governance_contract_set"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."governance_contract_set_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."ownership_transferred_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."ownership_transferred"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."ownership_transferred_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_admin_changed_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."role_admin_changed"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."role_admin_changed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_granted_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."role_granted"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."role_granted_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."role_revoked_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."role_revoked"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."role_revoked_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."system_config_updated_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."system_config_updated"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."system_config_updated_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."vote_session_start_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."vote_session_start"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."vote_session_start_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."vote_submitted_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."vote_submitted"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."vote_submitted_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "food_guard_indexer_voting_dispute_manager"."voting_completed_rindexer_id_seq"
OWNED BY "food_guard_indexer_voting_dispute_manager"."voting_completed"."rindexer_id";
SELECT setval('"food_guard_indexer_voting_dispute_manager"."voting_completed_rindexer_id_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table business_process_anomaly
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."business_process_anomaly" ADD CONSTRAINT "business_process_anomaly_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table challenge_phase_ended
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."challenge_phase_ended" ADD CONSTRAINT "challenge_phase_ended_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table challenge_phase_started
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."challenge_phase_started" ADD CONSTRAINT "challenge_phase_started_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table challenge_submitted
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."challenge_submitted" ADD CONSTRAINT "challenge_submitted_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table emergency_triggered
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."emergency_triggered" ADD CONSTRAINT "emergency_triggered_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table governance_contract_set
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."governance_contract_set" ADD CONSTRAINT "governance_contract_set_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table ownership_transferred
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."ownership_transferred" ADD CONSTRAINT "ownership_transferred_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_admin_changed
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."role_admin_changed" ADD CONSTRAINT "role_admin_changed_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_granted
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."role_granted" ADD CONSTRAINT "role_granted_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table role_revoked
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."role_revoked" ADD CONSTRAINT "role_revoked_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table system_config_updated
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."system_config_updated" ADD CONSTRAINT "system_config_updated_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table vote_session_start
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."vote_session_start" ADD CONSTRAINT "vote_session_start_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table vote_submitted
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."vote_submitted" ADD CONSTRAINT "vote_submitted_pkey" PRIMARY KEY ("rindexer_id");

-- ----------------------------
-- Primary Key structure for table voting_completed
-- ----------------------------
ALTER TABLE "food_guard_indexer_voting_dispute_manager"."voting_completed" ADD CONSTRAINT "voting_completed_pkey" PRIMARY KEY ("rindexer_id");
