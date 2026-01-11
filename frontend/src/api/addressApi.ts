import { api } from "./core";

export interface CitySuggestion {
  code: string;
  nom: string;
}

export interface CitySuggestionResponse {
  message: string;
  data: CitySuggestion[];
}

export const fetchCityByNameAndPostalCode = async (
  content: string,
): Promise<CitySuggestion[]> => {
  try {
    const response = await api.get<CitySuggestionResponse>(
      `/address/city/${content}`,
    );
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const fetchCityByName = async (name: string) => {
  try {
    const response = await api.get<any[]>(`/address/city/${name}`, {
      params: {
        name,
        boost: "population",
        limit: 5,
      },
    });
    return response;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const fetchCityByPostalCode = async (zip: string) => {
  try {
    const response = await api.get<any[]>(`/address/city/${zip}`, {
      params: {
        zip,
        boost: "population",
        limit: 5,
      },
    });
    return response;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const fetchCityCoordinates = async (code: string) => {
  try {
    const response = await api.get<{
      message: string;
      data: { lat: string; lon: string };
    }>(`/address/coord/${code}`);
    return response;
  } catch (err: any) {
    throw err.response?.data ?? err;
  }
};
