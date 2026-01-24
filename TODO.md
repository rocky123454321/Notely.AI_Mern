# TODO: Add Login/Signup and User-Specific AI

## Backend Changes
- [x] Create User model (backend/src/models/User.js)
- [x] Add userId to Chat model (backend/src/models/Chat.js)
- [x] Add userId to Note model (backend/src/models/Note.js)
- [x] Install auth dependencies (bcryptjs, jsonwebtoken)
- [x] Create auth controller (backend/src/controllers/authController.js) with signup, login, logout
- [x] Create auth routes (backend/src/routes/authRoutes.js)
- [x] Update chatController to filter by userId
- [x] Update notesController to filter by userId
- [x] Update ChatRoutes to include userId in paths
- [x] Update notesRoutes to include userId in paths
- [x] Create auth middleware (backend/src/middleware/auth.js)
- [x] Update server.js to include auth routes and middleware

## Frontend Changes
- [ ] Create Login page (frontend/src/pages/LoginPage.jsx)
- [ ] Create Signup page (frontend/src/pages/SignupPage.jsx)
- [ ] Update App.jsx for routing and auth protection
- [ ] Update AiChat.jsx to use authenticated userId
- [ ] Update Navbar.jsx to show login/logout
- [ ] Update axios.js for auth headers if needed

## Testing
- [ ] Test signup/login/logout
- [ ] Test user-specific chats and notes
- [ ] Ensure AI is user-specific
