CREATE TYPE "public"."fuel_type" AS ENUM('diesel', 'petrol', 'electric', 'hybrid', 'other');--> statement-breakpoint
CREATE TYPE "public"."gear_type" AS ENUM('manual', 'automatic');--> statement-breakpoint
CREATE TYPE "public"."name" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."message_status" AS ENUM('sent', 'delivered', 'read');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'confirmed', 'cancelled', 'finished');--> statement-breakpoint


CREATE TABLE "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_users" uuid NOT NULL,
	"id_categories" uuid NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"mileage" integer NOT NULL,
	"registration_date" timestamp NOT NULL,
	"registration_plate" varchar(7) NOT NULL,
	"description" varchar(500) NOT NULL,
	"number_of_seat" smallint NOT NULL,
	"number_of_sleeping_place" smallint NOT NULL,
	"length" numeric(10, 2) NOT NULL,
	"height" numeric(10, 2) NOT NULL,
	"weight" numeric(10, 2) NOT NULL,
	"fuelType" "fuel_type" NOT NULL,
	"gearType" "gear_type" NOT NULL,
	"consumption" numeric(5, 2) NOT NULL,
	"city_name" varchar(100) NOT NULL,
	"city_code" varchar(100) NOT NULL,
	"lat_coordinates" varchar(100) NOT NULL,
	"lon_coordinates" varchar(100) NOT NULL,
	"insurance_number" varchar(100) NOT NULL,
	"insurance_expiration_date" timestamp NOT NULL,
	"base_price" numeric(10, 2) NOT NULL,
	"is_available" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_role" uuid NOT NULL,
	"firstname" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"birthdate" timestamp NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"driving_license" varchar(255),
	"address_street" varchar(255) NOT NULL,
	"address_city" varchar(255) NOT NULL,
	"address_zip" varchar(5) NOT NULL,
	"address_country" varchar(255) NOT NULL,
	"temp_token_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE "pictures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"src" varchar(255) NOT NULL,
	"id_users" uuid NOT NULL,
	"is_profile_picture" boolean DEFAULT false NOT NULL,
	"id_vehicles" uuid
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "name" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" "name" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "password_reset_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" uuid DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"id_users" uuid NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	CONSTRAINT "password_reset_tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" varchar(500) NOT NULL,
	"id_sender" uuid,
	"id_receiver" uuid,
	"message_linked" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"is_edited" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp,
	"status" "message_status" DEFAULT 'sent' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "price_periods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"coefficient" numeric(6, 4) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"id_vehicles" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "equipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"icon" varchar(255) NOT NULL,
	CONSTRAINT "equipments_name_unique" UNIQUE("name"),
	CONSTRAINT "equipments_icon_unique" UNIQUE("icon")
);
--> statement-breakpoint
CREATE TABLE "vehicles_to_equipments" (
	"id_vehicles" uuid NOT NULL,
	"id_equipments" uuid NOT NULL,
	CONSTRAINT "vehicles_to_equipments_id_vehicles_id_equipments_pk" PRIMARY KEY("id_vehicles","id_equipments")
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_owner" uuid,
	"id_renter" uuid,
	"id_vehicle" uuid,
	"vehicle_plate" varchar(7) NOT NULL,
	"renter_name" varchar(255) NOT NULL,
	"owner_name" varchar(255) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"owner_address_street" varchar(255) NOT NULL,
	"owner_address_city" varchar(255) NOT NULL,
	"owner_address_zip" varchar(5) NOT NULL,
	"owner_address_country" varchar(255) NOT NULL,
	"renter_address_street" varchar(255) NOT NULL,
	"renter_address_city" varchar(255) NOT NULL,
	"renter_address_zip" varchar(5) NOT NULL,
	"renter_address_country" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"amount" numeric(7, 2) NOT NULL,
	"insurance_contract" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_id_users_users_id_fk" FOREIGN KEY ("id_users") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_id_categories_categories_id_fk" FOREIGN KEY ("id_categories") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_roles_id_fk" FOREIGN KEY ("id_role") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_id_users_users_id_fk" FOREIGN KEY ("id_users") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_id_vehicles_vehicles_id_fk" FOREIGN KEY ("id_vehicles") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_id_users_users_id_fk" FOREIGN KEY ("id_users") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_sender_users_id_fk" FOREIGN KEY ("id_sender") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_id_receiver_users_id_fk" FOREIGN KEY ("id_receiver") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_periods" ADD CONSTRAINT "price_periods_id_vehicles_vehicles_id_fk" FOREIGN KEY ("id_vehicles") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles_to_equipments" ADD CONSTRAINT "vehicles_to_equipments_id_vehicles_vehicles_id_fk" FOREIGN KEY ("id_vehicles") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vehicles_to_equipments" ADD CONSTRAINT "vehicles_to_equipments_id_equipments_equipments_id_fk" FOREIGN KEY ("id_equipments") REFERENCES "public"."equipments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_id_owner_users_id_fk" FOREIGN KEY ("id_owner") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_id_renter_users_id_fk" FOREIGN KEY ("id_renter") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_id_vehicle_vehicles_id_fk" FOREIGN KEY ("id_vehicle") REFERENCES "public"."vehicles"("id") ON DELETE set null ON UPDATE no action;