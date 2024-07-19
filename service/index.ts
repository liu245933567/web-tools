"use server";
import prisma from "@/prisma";
import type { User } from "@prisma/client";

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

export async function getUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export const createUser = async (user: Omit<User, "id">) => { 
  const newUser = await prisma.user.create({
    data: user,
  });

  return newUser;
};
