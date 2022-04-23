import express from 'express';
import faker from '@faker-js/faker';

import { find, create, incrementUpvotes } from '../services/threads';
import { Thread, ThreadCreateDto } from '../types';

const router = express.Router();

router.get('/', (req, res) => {
  const requestUsername = req.cookies['ghost-discussion-user'];
  let currentAuthorName: string = requestUsername;

  if (!currentAuthorName) {
    currentAuthorName = faker.name.findName();
    res.cookie('ghost-discussion-user', currentAuthorName, {
      httpOnly: true,
      secure: true,
    });
  }

  const currentAuthor = {
    name: currentAuthorName,
    photoURL: `https://i.pravatar.cc/32?u=${currentAuthorName}`,
  };

  const threads: Thread[] = find();

  res.render('index', { threads, currentAuthor });
});
create;

router.post('/thread', (req, res) => {
  const currentUser = req.cookies['ghost-discussion-user'];
  if (!currentUser) {
    res.redirect('/');
  }

  const _newThread: ThreadCreateDto = {
    author: {
      name: currentUser,
      photoURL: `https://i.pravatar.cc/32?u=${currentUser}`,
    },
    message: req.body.message,
  };

  create(_newThread);
  res.redirect('/');
});

router.post('/thread/:threadId/upvote', (req, res) => {
  try {
    const count = incrementUpvotes(req.params.threadId);
    res.status(201).json({ count });
  } catch (exception) {
    res.status(400).json({ count: -1 });
  }
});

export default router;
