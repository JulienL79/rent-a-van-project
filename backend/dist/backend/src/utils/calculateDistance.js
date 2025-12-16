/**
 * Calcule la distance entre deux points géographiques (latitude, longitude).
 * @param lat1 - Latitude du premier point.
 * @param lon1 - Longitude du premier point.
 * @param lat2 - Latitude du second point.
 * @param lon2 - Longitude du second point.
 * @returns Distance en kilomètres.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
