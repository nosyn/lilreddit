import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma";

export interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma,
};

export default context;
