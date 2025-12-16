import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { pricePeriods } from "../schemas/index.js";

export type PricePeriod = InferSelectModel<typeof pricePeriods>;

export type NewPricePeriod = InferInsertModel<typeof pricePeriods>;

export type UpdatePricePeriod = Partial<
  InferInsertModel<typeof pricePeriods>
> & { startDate: Date; endDate: Date };
