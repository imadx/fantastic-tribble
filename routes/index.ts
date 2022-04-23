import express from 'express';
import faker from '@faker-js/faker';

import * as threadService from '../services/thread';
import * as authorService from '../services/author';
import { ThreadPayload } from '../types';

const router = express.Router();

const userIdCookie = 'ghost-discussion-user';
router.get('/', async (req, res) => {
  const requestUsername = req.cookies[userIdCookie];
  let currentAuthorId: string = requestUsername;

  let author;

  if (!currentAuthorId) {
    author = await authorService.create(faker.name.findName());

    res.cookie(userIdCookie, author.id, {
      httpOnly: true,
      secure: true,
    });
  } else {
    author = await authorService.findOne(currentAuthorId);
  }

  if (!author) {
    res.cookie(userIdCookie, null, { expires: new Date() });
    return res.redirect('/');
  }

  const currentAuthor = {
    name: author?.name,
    photoURL: author?.photoURL,
  };

  const threads = await threadService.find();

  res.render('index', { threads, currentAuthor });
});

router.post('/thread', async (req, res) => {
  const currentAuthorId = req.cookies[userIdCookie];
  if (!currentAuthorId) {
    res.redirect('/');
  }

  const _newThread: ThreadPayload = {
    message: req.body.message,
  };

  await threadService.create(currentAuthorId, _newThread);
  res.redirect('/');
});

router.post('/thread/:threadId/upvote', async (req, res) => {
  const count = await threadService.incrementUpvotes(req.params.threadId);
  res.status(201).json({ count });
});

router.post('/thread/:threadId/reply', async (req, res) => {
  if (!req.body.message) {
    res.redirect('/');
    return;
  }

  await threadService.addReply(
    req.cookies[userIdCookie],
    req.params.threadId,
    req.body.message
  );

  res.redirect('/');
});

export default router;
