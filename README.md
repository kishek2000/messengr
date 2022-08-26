# messengr

Welcome to messengr!

This is a messenger app I'm making for fun to try and learn how to use sockets.

### Tech Stack:

Keeping it simple for now - NextJS frontend working with Cloudflare Workers and WebSockets.

TODOs

- [x] Write the frontend UI (basic form)
- [ ] Write backend endpoints for
  - [x] `/register` - register a new user
  - [x] `/login` - login with your account
  - [ ] `/logout` - logout from your account
- [ ] Write backend endpoints for
  - [x] `POST /chat` - create a new chat
  - [ ] `DELETE /chat` - delete a chat
  - [ ] `POST /chat/member` - add member to a chat
  - [ ] `DELETE /chat/member` - delete member from chat
  - [x] `(via socket) /message` - send a message
- [x] Connect the frontend to backend with sockets and REST
- [ ] Add functionality for
  - [ ] Sending image/video
  - [ ] Seeing who is currently typing
  - [ ] Seeing who has read messages
  - [ ] Forwarding messages
  - [ ] Emojis
  - [ ] Reactions
  - [ ] More themes
