import express from 'express';
import faker from '@faker-js/faker';

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

  const threads: Thread[] = [
    {
      id: 'df739e71-65ea-455a-b9a6-ada7dff20937',
      author: {
        name: 'Rob Hope',
        photoURL: `https://i.pravatar.cc/32?u=${'Rob Hope'}`,
      },
      createdAt: new Date('2022-04-23T05:28:41.385Z'),
      upvotes: 10,
      message: `Jeepers now that's a huge release with some big community earnings to back it - it must be so rewarding seeing creators quit their day jobs after monetizing (with real MRR) on the new platform.`,
      replies: [],
    },
    {
      id: '96c21eaa-30b6-4d33-b829-92827e797131',
      author: {
        name: 'Sophie Brecht',
        photoURL: `https://i.pravatar.cc/32?u=${'Sophie Brecht'}`,
      },
      createdAt: new Date('2022-04-23T04:28:41.385Z'),
      upvotes: 10,
      message:
        'Switched our blog from Hubspot to Ghost a year ago -- turned out to be a great decision. Looking forward to this update....the in-platform analytics look especially delicious. :)',
      replies: [
        {
          id: '9c38bd9a-f4a1-46bd-a68c-13826afe1067',
          author: {
            name: 'James',
            photoURL: `https://i.pravatar.cc/32?u=${'James'}`,
          },
          createdAt: new Date('2022-04-23T04:59:41.385Z'),
          upvotes: 10,
          replies: [],
          message:
            'Thanks Sophie! Last year has been an absolute goldrush for the creator economy. Slowly at first, then all at once. Will be interesting to see how this ecosystem evolves over the next few years',
        },
      ],
    },
    {
      id: '0b64a262-59f2-4996-9d70-26cc1bbe933e',
      author: {
        name: 'Cameron Lawrence',
        photoURL: `https://i.pravatar.cc/32?u=${'Cameron Lawrence'}`,
      },
      createdAt: new Date('2022-04-12T05:28:41.385Z'),
      upvotes: 10,
      message: `Love the native memberships and the zipless themes, I was just asked by a friend about options for a new site, and I think I know what I'll be recommending then...`,
      replies: [],
    },
  ];

  res.render('index', { threads, currentAuthor });
});

export default router;

interface Thread {
  id: string;
  author: {
    name: string;
    photoURL: string;
  };
  message: string;
  createdAt: Date;
  upvotes: number;
  replies: Thread[];
}
