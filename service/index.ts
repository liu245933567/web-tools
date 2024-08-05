"use server";
import prisma from "@/prisma";

/**
 * 请求天气
 */
export async function getTianqi() {
  const res = await fetch(
    "https://restapi.amap.com/v3/weather/weatherInfo?key=1ea092093becf27cca3ff1fbdf1e6a06&city=371481&extensions=all"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
