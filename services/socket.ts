import http from 'http';

import { Server } from 'socket.io';

let io: Server;

export const initializeSocketIO = (server: http.Server) => {
  io = new Server(server);
};

export const broadcastUpvoteChangedEvent = (id: string, count: number) => {
  io.emit('upvote-changed', { id, count });
};
