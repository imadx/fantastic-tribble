import { ThreadPayload } from '../types';
import { prisma } from './prisma';

export const find = async () => {
  return prisma.thread.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      message: true,
      createdAt: true,
      id: true,
      upvotes: true,
      author: {
        select: {
          id: true,
          name: true,
          photoURL: true,
        },
      },
    },
  });
};

export const create = async (authorId: string, payload: ThreadPayload) => {
  const thread = await prisma.thread.create({
    data: {
      message: payload.message,
      upvotes: 0,
      authorId: authorId,
    },
  });

  return thread;
};

export const incrementUpvotes = async (threadId: string): Promise<number> => {
  const { upvotes } = await prisma.thread.update({
    select: {
      upvotes: true,
    },
    where: {
      id: threadId,
    },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });

  return upvotes;
};
