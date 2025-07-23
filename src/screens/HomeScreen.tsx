import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Mock data - replace with real data from your API
const mockPosts = [
  {
    id: 1,
    author: {
      id: '1',
      userName: 'john_doe',
      fullName: 'John Doe',
      profilePictureUrl: 'https://via.placeholder.com/40',
    },
    imageUrl: 'https://via.placeholder.com/400x400',
    caption: 'Beautiful sunset today! 🌅',
    likesCount: 42,
    commentsCount: 5,
    isLikedByCurrentUser: false,
    createdAt: '2025-01-21T10:30:00Z',
  },
  {
    id: 2,
    author: {
      id: '2',
      userName: 'jane_smith',
      fullName: 'Jane Smith',
      profilePictureUrl: 'https://via.placeholder.com/40',
    },
    imageUrl: 'https://via.placeholder.com/400x300',
    caption: 'Coffee time ☕️ #mondayvibes',
    likesCount: 128,
    commentsCount: 12,
    isLikedByCurrentUser: true,
    createdAt: '2025-01-21T08:15:00Z',
  },
];

export default function HomeScreen() {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLikedByCurrentUser: !post.isLikedByCurrentUser,
              likesCount: post.isLikedByCurrentUser 
                ? post.likesCount - 1 
                : post.likesCount + 1,
            }
          : post
      )
    );
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  const renderPost = (post: typeof mockPosts[0]) => (
    <View key={post.id} style={styles.postContainer}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: post.author.profilePictureUrl }} style={styles.profileImage} />
        <Text style={styles.username}>{post.author.userName}</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => handleLike(post.id)} style={styles.actionButton}>
            <Ionicons 
              name={post.isLikedByCurrentUser ? "heart" : "heart-outline"} 
              size={24} 
              color={post.isLikedByCurrentUser ? "#ff3040" : "#000"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likesText}>
        {post.likesCount} {post.likesCount === 1 ? 'like' : 'likes'}
      </Text>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          <Text style={styles.username}>{post.author.userName}</Text> {post.caption}
        </Text>
      </View>

      {/* Comments */}
      {post.commentsCount > 0 && (
        <TouchableOpacity>
          <Text style={styles.commentsText}>
            View all {post.commentsCount} comments
          </Text>
        </TouchableOpacity>
      )}

      {/* Time */}
      <Text style={styles.timeText}>{formatTime(post.createdAt)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="paper-plane-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {posts.map(renderPost)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  scrollView: {
    flex: 1,
  },
  postContainer: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: '600',
    flex: 1,
  },
  moreButton: {
    padding: 5,
  },
  postImage: {
    width: width,
    height: width,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  likesText: {
    fontWeight: '600',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  captionContainer: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  captionText: {
    lineHeight: 18,
  },
  commentsText: {
    color: '#666',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  timeText: {
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 15,
    textTransform: 'uppercase',
  },
});
