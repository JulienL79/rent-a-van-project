import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IFilterState {
  vehicleType: "camping-car" | "van";
  locationCity: string | null;
  locationCode: string | null;
  startDate: Date | null;
  endDate: Date | null;
  radius: number;
  beds: number | null;
  options: string[] | null;
  sortingByPrice: "ascending" | "descending" | null;
  setVehicleType: (type: "camping-car" | "van") => void;
  setStartDate: (startDate: Date) => void;
  setEndDate: (startDate: Date) => void;
  setLocationCode: (code: string | null) => void;
  setLocationCity: (city: string | null) => void;
  setRadius: (radius: number) => void;
  resetSearch: () => void;
  setFilters: (filter: IFilter) => void;
  resetFilters: () => void;
}

interface IFilter {
  beds?: number;
  options?: string[];
  sortingByPrice?: "ascending" | "descending";
}

export const useFilterStore = create(
  persist<IFilterState>(
    (set) => ({
      vehicleType: "camping-car",
      locationCoordLat: null,
      locationCoordLon: null,
      locationCity: null,
      locationCode: null,
      startDate: null,
      endDate: null,
      radius: 50,
      beds: null,
      options: null,
      sortingByPrice: null,
      setVehicleType: (type) => set({ vehicleType: type }),
      setStartDate: (startDate) => set({ startDate }),
      setEndDate: (endDate) => set({ endDate }),
      setLocationCity: (city) => set({ locationCity: city }),
      setLocationCode: (code) => set({ locationCode: code }),
      setRadius: (radius) => set({ radius }),
      resetSearch: () =>
        set({
          locationCode: null,
          locationCity: null,
          startDate: null,
          endDate: null,
          radius: 50,
        }),
      setFilters: (filter: IFilter) =>
        set({
          beds: filter.beds ?? null,
          options: filter.options ?? null,
          sortingByPrice: filter.sortingByPrice ?? null,
        }),
      resetFilters: () =>
        set({
          beds: null,
          options: null,
          sortingByPrice: null,
        }),
    }),
    {
      name: "filter-storage",
    },
  ),
);
