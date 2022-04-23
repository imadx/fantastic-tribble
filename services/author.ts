import { prisma } from './prisma';

export const create = (name: string) => {
  return prisma.author.create({
    data: {
      name,
      photoURL: `https://i.pravatar.cc/32?u=${name}`,
    },
  });
};

export const findOne = (id: string) => {
  return prisma.author.findUnique({
    where: {
      id,
    },
  });
};
