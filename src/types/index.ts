// User Types
export interface UserSummaryDto {
  id: string;
  userName: string;
  fullName: string;
  profilePictureUrl?: string;
}

export interface UserDto {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  profilePictureUrl?: string;
  bio?: string;
  websiteUrl?: string;
  createdAt: string;
  lastLoginDate: string;
  isActive: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  followStatus?: FollowStatus;
}

export interface UpdateUserProfileDto {
  fullName: string;
  bio?: string;
  websiteUrl?: string;
}

// Post Types
export interface PostDto {
  id: number;
  authorId: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  modifiedAt: string;
  author: UserSummaryDto;
  likesCount: number;
  commentsCount: number;
  isLikedByCurrentUser: boolean;
  comments?: CommentDto[];
}

export interface PostSummaryDto {
  id: number;
  imageUrl: string;
  caption?: string;
  createdAt: string;
  author: UserSummaryDto;
  likesCount: number;
  commentsCount: number;
  isLikedByCurrentUser: boolean;
}

export interface PostCreateDto {
  image: any; // File/FormData
  caption?: string;
}

export interface PostUpdateDto {
  caption?: string;
}

// Comment Types
export interface CommentDto {
  id: number;
  postId: number;
  authorId: string;
  parentCommentId?: number;
  content: string;
  createdAt: string;
  author: UserSummaryDto;
  likesCount: number;
  repliesCount: number;
  isLikedByCurrentUser: boolean;
  replies?: CommentDto[];
}

export interface CreateCommentDto {
  content: string;
  parentCommentId?: number;
}

// Like Types
export interface LikeDto {
  userId: string;
  postId?: number;
  commentId?: number;
  createdAt: string;
}

// Follow Types
export enum FollowStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2
}

export interface FollowDto {
  followerId: string;
  followedId: string;
  createdAt: string;
  decidedAt?: string;
  status: FollowStatus;
  followed: UserSummaryDto;
  follower: UserSummaryDto;
}

// Message Types
export interface MessageDto {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  receiver: UserSummaryDto;
  sender: UserSummaryDto;
}

// Notification Types
export enum NotificationType {
  Like = 0,
  Comment = 1,
  Follow = 2,
  FollowRequest = 3,
  CommentLike = 4,
  CommentReply = 5
}

export interface NotificationDto {
  id: number;
  recipientId: string;
  type: NotificationType;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
  actor?: UserSummaryDto;
  postId?: number;
  commentId?: number;
}

// Auth Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  userName: string;
}

export interface AuthenticationResult {
  token: string;
  user: UserDto;
  refreshToken?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Login: undefined;
  Register: undefined;
  Profile: { userId?: string };
  PostDetail: { postId: number };
  CreatePost: undefined;
  EditProfile: undefined;
  Messages: undefined;
  Chat: { userId: string; userName: string };
  Notifications: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Activity: undefined;
  Profile: undefined;
};
