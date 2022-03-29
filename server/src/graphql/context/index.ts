import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { ContextFunction } from "apollo-server-core";
import { PrismaClient } from "@prisma/client";
import prisma from "../../prisma";

export interface Context {
  prisma: PrismaClient;
  req: Request & {
    session: Session & { userId: number };
  } & Partial<SessionData>;
  res: Response;
}

const context: ContextFunction = ({ req, res }): Context => {
  return {
    prisma,
    req,
    res,
  };
};

export default context;
