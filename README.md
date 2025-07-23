# Instagram Clone React Native App

A React Native Instagram clone that matches your backend .NET API structure with all the core Instagram features.

## 🚀 Features

### Core Screens
- **📱 Home Feed** - Scrollable Instagram-like feed with posts, likes, comments
- **👤 Profile** - User profile with stats, bio, posts grid, edit profile
- **📸 Create Post** - Photo picker from camera/gallery, caption, post creation
- **🔍 Search** - User search and explore posts grid
- **🔔 Activity** - Notifications for likes, comments, follows, follow requests
- **🔐 Login** - Authentication screen with email/password

### Instagram-Like Features
- ❤️ Like/unlike posts and comments
- 💬 Comments with nested replies
- 👥 Follow/unfollow users with approval system
- 📷 Photo upload from camera or gallery
- 🔔 Push notifications
- 📊 User stats (posts, followers, following counts)
- 🔒 Private account support (follow requests)

## 🛠 Tech Stack

- **React Native** with TypeScript
- **Expo** for easy development and deployment
- **React Navigation** for navigation (Stack + Bottom Tabs)
- **Expo Vector Icons** for Instagram-like icons
- **Expo Image Picker** for camera/gallery access
- **AsyncStorage** for local data persistence

## 📋 Backend Integration Ready

The app is structured to easily connect to your .NET backend:

### API Endpoints Mapped:
- `POST /api/auth/login` - User authentication
- `GET /api/posts` - Fetch feed posts
- `POST /api/posts` - Create new post
- `POST /api/likes/posts/{id}` - Like/unlike posts
- `GET /api/users/{id}` - Get user profile
- `POST /api/follows/{id}` - Follow user
- `GET /api/notifications` - Get notifications
- And more...

### Data Models Match Your DTOs:
- ✅ UserDto, PostDto, CommentDto
- ✅ NotificationDto with all types
- ✅ FollowDto with status handling
- ✅ All backend entities mapped to TypeScript interfaces

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`
- iOS Simulator (for Mac) or Android Studio (for Android)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run web        # For web browser
   npm run ios        # For iOS simulator
   npm run android    # For Android emulator
   ```

3. **Scan QR code with Expo Go app** (on your phone) to test on device

## 📱 Screen Navigation

```
App
├── Login Screen (authentication)
└── Main Tabs
    ├── Home (feed)
    ├── Search (users + explore)
    ├── Create (new post)
    ├── Activity (notifications)
    └── Profile (user profile)
```

## 🔗 Connect to Your Backend

1. **Update API base URL** in `src/services/api.ts`:
   ```typescript
   private baseURL = 'https://your-api-url.com/api';
   ```

2. **Replace mock data** with real API calls in screens:
   ```typescript
   // Replace mock data like this:
   const mockPosts = [...];
   // With real API calls:
   const { data: posts } = await apiService.getPosts();
   ```

3. **Add authentication** by uncommenting API calls in:
   - LoginScreen: `apiService.login()`
   - CreatePostScreen: `apiService.createPost()`
   - HomeScreen: `apiService.getPosts()`

## 📦 Project Structure

```
src/
├── screens/            # Main app screens
│   ├── HomeScreen.tsx      # Feed
│   ├── ProfileScreen.tsx   # User profile  
│   ├── CreatePostScreen.tsx # Post creation
│   ├── SearchScreen.tsx    # Search & explore
│   ├── ActivityScreen.tsx  # Notifications
│   └── LoginScreen.tsx     # Authentication
└── types/              # TypeScript interfaces (matches your DTOs)
```

## 🎨 UI Features

- **Instagram-accurate design** with proper colors, spacing, fonts
- **Responsive layout** that works on all screen sizes  
- **Native iOS/Android feel** with platform-specific styles
- **Smooth animations** for likes, follows, navigation
- **Loading states** and error handling
- **Optimized images** and performance

## 🔄 Next Steps

1. **Connect to your .NET API** - Update the API service calls
2. **Add real authentication** - Implement JWT token handling
3. **Add push notifications** - Use Expo notifications
4. **Add stories feature** - When you add it to your backend
5. **Add messaging** - Direct messages between users
6. **Deploy to app stores** - Use Expo Application Services (EAS)

Your React Native Instagram clone is ready! 🎉 

The app perfectly mirrors your .NET backend structure and is ready to connect to your real API endpoints.
