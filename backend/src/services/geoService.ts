import axios from "axios";

export const geoService = {
  getCommunesByNameOrZip: async (content: string) => {
    const byName = await axios.get("https://geo.api.gouv.fr/communes", {
      params: {
        nom: content,
        fields: "code, name, centre",
        boost: "population",
        limit: 5,
      },
    });

    if (byName.data?.length > 0) return byName.data;

    const byZip = await axios.get("https://geo.api.gouv.fr/communes", {
      params: {
        codePostal: content,
        fields: "code, name, centre",
        boost: "population",
        limit: 5,
      },
    });

    return byZip.data;
  },

  getCoordinatesByCode: async (
    code: string,
  ): Promise<[string, string] | null> => {
    const response = await axios.get("https://geo.api.gouv.fr/communes", {
      params: {
        code,
        fields: "centre",
        limit: 1,
      },
    });

    const commune = response.data?.[0];

    if (!commune?.centre?.coordinates) return null;

    const [lon, lat] = commune.centre.coordinates;

    return [lat.toString(), lon.toString()];
  },
};
