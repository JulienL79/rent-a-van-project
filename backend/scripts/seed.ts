import { faker } from "@faker-js/faker";
import * as schema from "../src/schemas/index.js";
import type {
  NewBooking,
  NewEquipment,
  NewPricePeriod,
  NewRole,
  NewUser,
  NewVehicle,
  NewMessage,
  NewCategory,
} from "../src/entities/index.js";
import { hashPassword, logger } from "../src/utils/index.js";
import { db, pool } from "../src/config/index.js";

const userInfos = [] as { email: string; password: string }[];

async function seedRoles(): Promise<Record<string, string>> {
  logger.info("➤ Seeding roles...");
  const roles = ["admin", "user"];
  const roleIds: Record<string, string> = {};

  for (const name of roles) {
    const res = await db
      .insert(schema.roles)
      .values({ name } as NewRole)
      .returning({ id: schema.roles.id });
    roleIds[name] = res[0].id;
  }

  return roleIds;
}

async function seedUsers(
  roleIds: Record<string, string>,
  length: number,
): Promise<string[]> {
  logger.info("➤ Seeding users...");
  const userIds: string[] = [];

  for (let i = 0; i < length; i++) {
    const email = faker.internet.email();
    const password = faker.internet.password();

    const res = await db
      .insert(schema.users)
      .values({
        roleId: faker.helpers.arrayElement(Object.values(roleIds)),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        birthdate: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
        email: email,
        phoneNumber: faker.phone.number().slice(0, 20),
        password: await hashPassword(password),
        addressStreet: faker.location.streetAddress(),
        addressCity: faker.location.city(),
        addressZip: faker.location.zipCode().slice(0, 5),
        addressCountry: faker.location.country(),
        tempTokenId: faker.string.uuid(),
        drivingLicense: faker.string.alphanumeric(10),
      } as NewUser)
      .returning({ id: schema.users.id });

    userIds.push(res[0].id);
    userInfos.push({ email, password });
  }

  return userIds;
}

async function seedCategories(): Promise<string[]> {
  logger.info("➤ Seeding categories...");
  const categoryIds: string[] = [];
  const categories = ["van", "camping-car"];

  for (const name of categories) {
    const res = await db
      .insert(schema.categories)
      .values({ name } as NewCategory)
      .returning({ id: schema.categories.id });
    categoryIds.push(res[0].id);
  }

  return categoryIds;
}

async function seedEquipments(): Promise<string[]> {
  logger.info("➤ Seeding equipments...");
  const equipmentIds: string[] = [];
  const equipments = [
    "GPS",
    "Bike Rack",
    "Awning",
    "Camping Table",
    "Solar Panel",
  ];

  for (const name of equipments) {
    const res = await db
      .insert(schema.equipments)
      .values({ name, icon: faker.internet.url() } as NewEquipment)
      .returning({ id: schema.equipments.id });
    equipmentIds.push(res[0].id);
  }

  return equipmentIds;
}

async function seedVehicles(
  users: string[],
  categories: string[],
  equipments: string[],
): Promise<string[]> {
  logger.info("➤ Seeding vehicles...");
  const vehicleIds: string[] = [];

  for (let i = 0; i < users.length; i++) {
    const res = await db
      .insert(schema.vehicles)
      .values({
        userId: faker.helpers.arrayElement(users),
        categoryId: faker.helpers.arrayElement(categories),
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        createdAt: new Date(),
        mileage: faker.number.int({ min: 0, max: 200000 }),
        registrationDate: faker.date.past({ years: 10 }),
        registrationPlate: faker.vehicle.vrm(),
        description: faker.vehicle.type(),
        numberOfSeats: faker.number.int({ min: 2, max: 8 }),
        numberOfSleepingPlaces: faker.number.int({ min: 2, max: 6 }),
        length: faker.number
          .float({ min: 4, max: 8, fractionDigits: 2 })
          .toString(),
        height: faker.number
          .float({ min: 1.8, max: 3, fractionDigits: 2 })
          .toString(),
        weight: faker.number
          .float({ min: 1500, max: 4000, fractionDigits: 1 })
          .toString(),
        fuelType: faker.helpers.arrayElement([
          "diesel",
          "petrol",
          "electric",
          "hybrid",
          "other",
        ]),
        gearType: faker.helpers.arrayElement(["manual", "automatic"]),
        consumption: faker.number
          .float({ min: 5, max: 15, fractionDigits: 2 })
          .toString(),
        cityName: faker.location.city(),
        cityCode: faker.location.zipCode(),
        latCoordinates: faker.location.latitude().toString(),
        lonCoordinates: faker.location.longitude().toString(),
        insuranceNumber: faker.string.uuid(),
        insuranceExpirationDate: faker.date.future(),
        basePrice: faker.number
          .float({ min: 50, max: 200, fractionDigits: 2 })
          .toString(),
        isAvailable: true,
      } as NewVehicle)
      .returning({ id: schema.vehicles.id });

    const vehicleId = res[0].id;
    vehicleIds.push(vehicleId);

    const shuffledEquipments = faker.helpers.arrayElements(
      equipments,
      faker.number.int({ min: 1, max: equipments.length }),
    );
    for (const equipmentId of shuffledEquipments) {
      await db
        .insert(schema.vehiclesToEquipments)
        .values({ vehicleId, equipmentId });
    }
  }

  return vehicleIds;
}

async function seedBookings(
  users: string[],
  vehicles: string[],
): Promise<string[]> {
  logger.info("➤ Seeding bookings...");
  const bookingIds: string[] = [];

  for (let i = 0; i < 20; i++) {
    const ownerId = faker.helpers.arrayElement(users);
    let renterId = faker.helpers.arrayElement(users);
    while (renterId === ownerId) renterId = faker.helpers.arrayElement(users);
    const vehicleId = faker.helpers.arrayElement(vehicles);

    const startDate = faker.date.soon();
    const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);

    const res = await db
      .insert(schema.bookings)
      .values({
        ownerId,
        renterId,
        vehicleId,
        vehiclePlate: faker.vehicle.vrm(),
        renterName: faker.person.fullName(),
        ownerName: faker.person.fullName(),
        startDate,
        endDate,
        status: faker.helpers.arrayElement([
          "pending",
          "confirmed",
          "cancelled",
          "finished",
        ]),
        ownerAddressStreet: faker.location.streetAddress(),
        ownerAddressCity: faker.location.city(),
        ownerAddressZip: faker.location.zipCode().slice(0, 5),
        ownerAddressCountry: faker.location.country(),
        renterAddressStreet: faker.location.streetAddress(),
        renterAddressCity: faker.location.city(),
        renterAddressZip: faker.location.zipCode().slice(0, 5),
        renterAddressCountry: faker.location.country(),
        amount: faker.number
          .float({ min: 100, max: 1000, fractionDigits: 2 })
          .toString(),
        insuranceContract: faker.string.uuid(),
        createdAt: new Date(),
      } as NewBooking)
      .returning({ id: schema.bookings.id });

    bookingIds.push(res[0].id);
  }

  return bookingIds;
}

async function seedMessages(users: string[]): Promise<void> {
  logger.info("➤ Seeding messages...");

  for (let i = 0; i < 20; i++) {
    let senderId = faker.helpers.arrayElement(users);
    let receiverId = faker.helpers.arrayElement(users);
    while (receiverId === senderId)
      receiverId = faker.helpers.arrayElement(users);

    await db.insert(schema.messages).values({
      content: faker.lorem.sentence(),
      senderId,
      receiverId,
      messageLinked: null,
      isEdited: false,
      status: faker.helpers.arrayElement(["sent", "delivered", "read"]),
      createdAt: new Date(),
    } as NewMessage);
  }
}

async function seedPricePeriods(vehicles: string[]): Promise<void> {
  logger.info("➤ Seeding price periods...");

  for (const vehicleId of vehicles) {
    for (let i = 0; i < 2; i++) {
      const startDate = faker.date.soon();
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      await db.insert(schema.pricePeriods).values({
        name: `Period ${i + 1}`,
        coefficient: faker.number
          .float({ min: 0.5, max: 2, fractionDigits: 2 })
          .toString(),
        startDate,
        endDate,
        vehicleId,
      } as NewPricePeriod);
    }
  }
}

async function main(): Promise<void> {
  logger.info("🌱 Starting seeding...");

  try {
    const roleIds = await seedRoles();
    const userIds = await seedUsers(roleIds, 10);
    const categoryIds = await seedCategories();
    const equipmentIds = await seedEquipments();
    const vehicleIds = await seedVehicles(userIds, categoryIds, equipmentIds);
    await seedBookings(userIds, vehicleIds);
    await seedMessages(userIds);
    await seedPricePeriods(vehicleIds);

    logger.info("✅ Seeding complete!");
  } catch (err) {
    logger.error("❌ Seeding failed:", err);
  } finally {
    logger.info("userInfos: ", userInfos);
    await pool.end();
    process.exit(0);
  }
}

main();
