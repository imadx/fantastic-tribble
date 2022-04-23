import { ThreadPayload } from '../types';
import { prisma } from './prisma';
import { broadcastUpvoteChangedEvent } from './socket';

export const find = async () => {
  return prisma.thread.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      parentThreadId: null,
    },
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
      childThreads: {
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
      },
    },
  });
};

export const create = async (
  authorId: string,
  payload: ThreadPayload,
  parentThreadId?: string
) => {
  const thread = await prisma.thread.create({
    data: {
      message: payload.message,
      upvotes: 0,
      authorId: authorId,
      parentThreadId,
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

  broadcastUpvoteChangedEvent(threadId, upvotes);

  return upvotes;
};

export const addReply = async (
  authorId: string,
  threadId: string,
  message: string
) => {
  return create(authorId, { message }, threadId);
};
