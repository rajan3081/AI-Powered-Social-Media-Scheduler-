# AI-Powered Social Media Scheduler 🚀

A full-stack application for scheduling and managing social media posts with AI-powered features, role-based authentication, and a beautiful modern UI.

## Features ✨

- **User Authentication** - Secure login and registration with JWT tokens
- **Role-Based Access Control** - Admin and Customer roles with different permissions
- **Post Scheduling** - Schedule posts to be published at specific times
- **Automatic Post Publishing** - Cron-based scheduler that publishes posts automatically
- **Image Upload** - Upload images to Cloudinary for posts
- **Analytics Dashboard** - View post performance and analytics
- **Calendar View** - Visual calendar to see scheduled posts
- **Admin Panel** - Manage all posts and users (Admin only)
- **Real-time Chat** - Socket.IO powered messaging system
- **AI Integration** - AI-powered post generation and enhancement
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Mobile-friendly interface

## Tech Stack 🛠️

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication
- **React Icons** - Icon library
- **React Toastify** - Notifications
- **React Dropzone** - File uploads

### Backend
- **Node.js & Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Node-Cron** - Job scheduling
- **Cloudinary** - Image hosting
- **Socket.IO** - Real-time communication
- **CORS** - Cross-origin requests

## Project Structure 📁

```
Social Media Scheduler/
├── backend/
│   ├── config/           # Database and Cloudinary config
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── scheduler/        # Post scheduling logic
│   ├── utils/            # Utility functions
│   ├── server.js         # Express server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Context API
│   │   ├── services/     # API services
│   │   ├── App.jsx       # Main app
│   │   └── main.jsx      # Entry point
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Installation 💻

### Prerequisites
- Node.js (v14+)
- MongoDB
- Cloudinary Account
- Git

### Backend Setup

```bash
cd backend
npm install

# Create .env file with:
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000

npm start
```

### Frontend Setup

```bash
cd frontend
npm install

# Frontend connects to http://localhost:5000
npm run dev
```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/forgot-password` - Reset password
- `POST /api/auth/select-role` - Select user role (Admin/Customer)

### Posts
- `POST /api/posts` - Create new post
- `GET /api/posts` - Get all user posts
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Upload
- `POST /api/upload` - Upload image to Cloudinary

### AI Features
- `POST /api/ai/generate` - Generate post caption

## Key Features Explained 🎯

### Role-Based System
- **Admin**: Can manage all posts, view analytics, access admin panel
- **Customer**: Can create and manage their own posts, view personal analytics

### Post Scheduling
Posts are automatically published when their scheduled time arrives. The scheduler:
- Runs every minute
- Checks for pending posts with `scheduledTime <= now`
- Updates status to "published" when time arrives

### Authentication Flow
1. User registers or logs in
2. Receives JWT token
3. Selects role (Admin/Customer)
4. Redirected to dashboard
5. Menu updates based on role

### Image Handling
- Images are uploaded to Cloudinary
- URLs are stored in MongoDB
- Supports multiple image formats

## Usage 📖

1. **Register** - Create a new account
2. **Login** - Sign in with your credentials
3. **Select Role** - Choose Admin or Customer
4. **Create Post** - Add caption, image, and scheduled time
5. **Schedule** - Set when you want the post published
6. **Track** - Monitor your posts in calendar/analytics
7. **Publish** - Posts are automatically published at scheduled time

## Development 🔧

### Run in Development Mode

```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm run dev
```

### Build for Production

```bash
# Frontend
cd frontend && npm run build

# Backend is ready to deploy as-is
```

## Recent Updates ✅

- ✨ Added role selection page on login (Admin vs Customer)
- 🔧 Fixed post scheduling system - scheduler now starts automatically
- 🛡️ Improved authentication middleware for better security
- 🎨 Enhanced UI with beautiful gradient cards for role selection
- 🐛 Fixed user ID handling in post creation/updates

## Environment Variables 🔐

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/social-scheduler
JWT_SECRET=your_super_secret_jwt_key_here
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

## Contributing 🤝

Feel free to fork this project and submit pull requests for any improvements!

## License 📄

This project is open source and available under the MIT License.

## Author ✍️

Created by [Rajan](https://github.com/rajan3081)

## Support 💬

For issues, suggestions, or questions, please open an issue on GitHub.

---

**Happy Scheduling! 🎉**
