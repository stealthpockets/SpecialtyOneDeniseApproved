

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_updated_at_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."case_studies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "subtitle" "text",
    "location" "text" NOT NULL,
    "property_type" "text" NOT NULL,
    "status" "text" DEFAULT 'completed'::"text" NOT NULL,
    "site_count" integer,
    "square_footage" integer,
    "sale_price" "text",
    "cap_rate" "text",
    "time_to_sale" "text",
    "challenge" "text" NOT NULL,
    "solution" "text" NOT NULL,
    "results" "jsonb" NOT NULL,
    "hero_image" "text" NOT NULL,
    "additional_images" "jsonb",
    "introduction" "text",
    "detailed_challenge" "text",
    "approach" "text",
    "outcome" "text",
    "testimonial" "jsonb",
    "agent" "text" NOT NULL,
    "agent_image" "text",
    "meta_description" "text",
    "tags" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "published_at" timestamp with time zone,
    "is_confidential" boolean DEFAULT false,
    CONSTRAINT "case_studies_property_type_check" CHECK (("property_type" = ANY (ARRAY['Manufactured Housing'::"text", 'RV Park'::"text", 'Self-Storage'::"text", 'Multi-Asset'::"text"]))),
    CONSTRAINT "case_studies_status_check" CHECK (("status" = ANY (ARRAY['completed'::"text", 'in-progress'::"text", 'confidential'::"text"])))
);


ALTER TABLE "public"."case_studies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."financial_rates" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "rate_name" "text" NOT NULL,
    "current_value" numeric NOT NULL,
    "previous_value" numeric,
    "change" numeric,
    "trend" "text",
    "last_updated" timestamp with time zone DEFAULT "now"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "financial_rates_trend_check" CHECK (("trend" = ANY (ARRAY['up'::"text", 'down'::"text", 'neutral'::"text"])))
);


ALTER TABLE "public"."financial_rates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."testimonials" (
    "id" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "person" "text" NOT NULL,
    "property_name" "text",
    "property_type" "text",
    "testimonial_text" "text" NOT NULL,
    "placement_type" "text" NOT NULL,
    "is_strongest" boolean DEFAULT false,
    "can_be_displayed_if_other_from_same_person" boolean DEFAULT true,
    "is_active" boolean DEFAULT true,
    "image_url" "text"
);


ALTER TABLE "public"."testimonials" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."testimonials_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."testimonials_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."testimonials_id_seq" OWNED BY "public"."testimonials"."id";



CREATE TABLE IF NOT EXISTS "public"."track_record" (
    "rank" integer,
    "classification" character varying(10),
    "property" character varying(50),
    "address" character varying(100),
    "location" character varying(50),
    "size_nrsf" integer,
    "units" integer,
    "sale_price" bigint,
    "date_sold" "date",
    "latitude" numeric(9,6),
    "longitude" numeric(9,6)
);


ALTER TABLE "public"."track_record" OWNER TO "postgres";


ALTER TABLE ONLY "public"."testimonials" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."testimonials_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."case_studies"
    ADD CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."case_studies"
    ADD CONSTRAINT "case_studies_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."financial_rates"
    ADD CONSTRAINT "financial_rates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."testimonials"
    ADD CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_case_studies_property_type" ON "public"."case_studies" USING "btree" ("property_type");



CREATE INDEX "idx_case_studies_published_at" ON "public"."case_studies" USING "btree" ("published_at" DESC);



CREATE INDEX "idx_case_studies_slug" ON "public"."case_studies" USING "btree" ("slug");



CREATE INDEX "idx_case_studies_status" ON "public"."case_studies" USING "btree" ("status");



CREATE OR REPLACE TRIGGER "update_case_studies_updated_at" BEFORE UPDATE ON "public"."case_studies" FOR EACH ROW EXECUTE FUNCTION "public"."update_updated_at_column"();



CREATE POLICY "Authenticated users can manage case studies" ON "public"."case_studies" TO "authenticated" USING (true);



CREATE POLICY "Public can read published case studies" ON "public"."case_studies" FOR SELECT USING (("published_at" IS NOT NULL));



ALTER TABLE "public"."case_studies" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_updated_at_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."case_studies" TO "anon";
GRANT ALL ON TABLE "public"."case_studies" TO "authenticated";
GRANT ALL ON TABLE "public"."case_studies" TO "service_role";



GRANT ALL ON TABLE "public"."financial_rates" TO "anon";
GRANT ALL ON TABLE "public"."financial_rates" TO "authenticated";
GRANT ALL ON TABLE "public"."financial_rates" TO "service_role";



GRANT ALL ON TABLE "public"."testimonials" TO "anon";
GRANT ALL ON TABLE "public"."testimonials" TO "authenticated";
GRANT ALL ON TABLE "public"."testimonials" TO "service_role";



GRANT ALL ON SEQUENCE "public"."testimonials_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."testimonials_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."testimonials_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."track_record" TO "anon";
GRANT ALL ON TABLE "public"."track_record" TO "authenticated";
GRANT ALL ON TABLE "public"."track_record" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
