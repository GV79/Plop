const Route = use('Route');

const jwtMiddleware = async ({ request }, next) => {
  try {
    request.headers().authorization = `Bearer ${request.cookie('XSStoken')}`;
  } catch (err) {
    console.log(`${new Date()} : ${err.message}`);
  } finally {
    await next();
  }
};

Route.on('/').render('welcome');

// User Info
Route.get('/userInfo', 'UserController.getUserInfo').middleware(jwtMiddleware);
Route.get('/userRoomInfo', 'UserController.getUserRoomInfo').middleware(jwtMiddleware);
Route.post('/userInfo', 'UserController.setUserInfo').middleware(jwtMiddleware);
Route.get('/avatar', 'UserController.getAvatar').middleware(jwtMiddleware);

// Authentication
Route.post('/login', 'UserController.login');
Route.post('/signup', 'UserController.addNewUser');
Route.post('/session', 'UserController.checkSession').middleware(jwtMiddleware);
Route.post('/logout', 'UserController.logout').middleware(jwtMiddleware);

// Teams/Rooms
Route.get('/room', 'RoomController.get').middleware(jwtMiddleware);
Route.get('/assignees', 'RoomController.getAssignees').middleware(jwtMiddleware);
Route.get('/members', 'RoomController.getMembers').middleware(jwtMiddleware);
Route.get('/repository', 'RoomController.getRepository').middleware(jwtMiddleware);
Route.get('/notifications', 'RoomController.getNotifications').middleware(jwtMiddleware);
Route.post('/notifications', 'RoomController.readNotifications').middleware(jwtMiddleware);
Route.post('/clearNotifications', 'RoomController.clearNotifications').middleware(jwtMiddleware);
Route.post('/room', 'RoomController.update').middleware(jwtMiddleware);
Route.post('/roomInfo', 'RoomController.info').middleware(jwtMiddleware);
Route.post('/sessionRoom', 'RoomController.session').middleware(jwtMiddleware);
Route.post('/joinRoom', 'RoomController.join').middleware(jwtMiddleware);
Route.post('/leaveRoom', 'RoomController.leave').middleware(jwtMiddleware);
Route.put('/room', 'RoomController.create').middleware(jwtMiddleware);
Route.delete('/room', 'RoomController.delete').middleware(jwtMiddleware);

// Issues - begin setting up other endpoints like this (REST)
Route.get('/issue/:id', 'IssueController.get').middleware(jwtMiddleware);
Route.get('/teamIssue/:status', 'IssueController.getTeam').middleware(jwtMiddleware);
Route.get('/userIssue/:status', 'IssueController.getUser').middleware(jwtMiddleware);
Route.get('/comments/:id', 'IssueController.getComments').middleware(jwtMiddleware);
Route.post('/comment', 'IssueController.setComments').middleware(jwtMiddleware);
Route.post('/issueProgress', 'IssueController.updateProgress').middleware(jwtMiddleware);
Route.post('/issue', 'IssueController.update').middleware(jwtMiddleware);
Route.put('/issue', 'IssueController.create').middleware(jwtMiddleware);
Route.delete('/issue/:id', 'IssueController.delete').middleware(jwtMiddleware);

// Images
Route.post('/image', 'ImageController.create').middleware(jwtMiddleware);
Route.get('/image/:id', 'ImageController.get').middleware(jwtMiddleware);
Route.delete('/image/:id', 'ImageController.delete').middleware(jwtMiddleware);

// Chat
Route.get('/chats', 'ChatController.get').middleware(jwtMiddleware);
Route.get('/lastReadChat', 'ChatController.getLastReadChat').middleware(jwtMiddleware);
Route.post('/lastReadChat', 'ChatController.updatelastReadChat').middleware(jwtMiddleware);

// Notes
Route.post('/notes', 'NotesController.create').middleware(jwtMiddleware);
Route.get('/notes', 'NotesController.get').middleware(jwtMiddleware);
Route.delete('/notes/:id', 'ImageController.delete').middleware(jwtMiddleware);
