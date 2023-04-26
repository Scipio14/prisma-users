import { Request, Response } from "express";
import prisma from "../services/prisma";
import { User } from "@prisma/client";

export const userController = {
  async index(req: Request, res: Response) {
    const users: User[] = await prisma.user.findMany({
      include: {
        car: true,
      },
    });
    return res.json(users);
  },
  async createUser(req: Request, res: Response) {
    const userData = req.body;
    const user = await prisma.user.create({
      data: {
        fname: userData.fname,
        lname: userData.lname,
      },
      include: {
        car: true,
      },
    });
    return res.status(201).json({ user: user });
  },

  async findUniqueUser(req: Request, res: Response) {
    const paramId = req.params.id;
    const uniqueUser = await prisma.user.findUnique({
      where: {
        id: paramId,
      },
    });
    return res.json({ uniqueUser });
  },
  async updateUser(req: Request, res: Response) {
    const paramId = req.params.id;
    const updateUser = await prisma.user.update({
      data: req.body,
      where: {
        id: paramId,
      },
    });
    return res.json(updateUser);
  },

  async deleteUser(req: Request, res: Response) {
    const paramId = req.params.id;

    const deletedUser = await prisma.user.delete({
      where: {
        id: paramId,
      },
    });

    return res.status(204).json(deletedUser);
  },
};
