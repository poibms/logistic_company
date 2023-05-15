import { geocode } from "opencage-api-client";

async function calculateDistance(
  cityA: string,
  cityB: string
): Promise<number > {
  try {
    const [resultA, resultB] = await Promise.all([
      geocode({ q: cityA, key: "37343d8d8ff34fd8b5564ff4f45a126a" }),
      geocode({ q: cityB, key: "37343d8d8ff34fd8b5564ff4f45a126a" }),
    ]);

    const [latA, lngA] = [
      resultA.results[0].geometry.lat,
      resultA.results[0].geometry.lng,
    ];
    const [latB, lngB] = [
      resultB.results[0].geometry.lat,
      resultB.results[0].geometry.lng,
    ];

    const earthRadius = 6371; // Earth's radius in kilometers
    const latDistance = toRadians(latB - latA);
    const lngDistance = toRadians(lngB - lngA);
    const a =
      Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
      Math.cos(toRadians(latA)) *
        Math.cos(toRadians(latB)) *
        Math.sin(lngDistance / 2) *
        Math.sin(lngDistance / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  } catch (e) {
    console.log(e);
    return 0;
  }
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export default calculateDistance;
