import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'like',
    actor: {
      id: '1',
      userName: 'john_doe',
      profilePictureUrl: 'https://via.placeholder.com/40',
    },
    message: 'liked your photo.',
    createdAt: '2025-01-21T10:30:00Z',
    postId: 1,
    postImageUrl: 'https://via.placeholder.com/50x50',
    isRead: false,
  },
  {
    id: 2,
    type: 'follow',
    actor: {
      id: '2',
      userName: 'jane_smith',
      profilePictureUrl: 'https://via.placeholder.com/40',
    },
    message: 'started following you.',
    createdAt: '2025-01-21T09:15:00Z',
    isRead: false,
  },
  {
    id: 3,
    type: 'comment',
    actor: {
      id: '3',
      userName: 'mike_wilson',
      profilePictureUrl: 'https://via.placeholder.com/40',
    },
    message: 'commented: "Amazing shot! 📸"',
    createdAt: '2025-01-21T08:45:00Z',
    postId: 2,
    postImageUrl: 'https://via.placeholder.com/50x50',
    isRead: true,
  },
  {
    id: 4,
    type: 'like',
    actor: {
      id: '4',
      userName: 'sarah_jones',
      profilePictureUrl: 'https://via.placeholder.com/40',
    },
    message: 'liked your photo.',
    createdAt: '2025-01-20T16:20:00Z',
    postId: 3,
    postImageUrl: 'https://via.placeholder.com/50x50',
    isRead: true,
  },
  {
    id: 5,
    type: 'follow_request',
    actor: {
      id: '5',
      userName: 'alex_brown',
      profilePictureUrl: 'https://via.placeholder.com/40',
    },
    message: 'requested to follow you.',
    createdAt: '2025-01-20T14:10:00Z',
    isRead: false,
  },
];

// Mock suggested users
const mockSuggestedUsers = [
  {
    id: '6',
    userName: 'david_clark',
    fullName: 'David Clark',
    profilePictureUrl: 'https://via.placeholder.com/60',
    mutualFriends: 5,
  },
  {
    id: '7',
    userName: 'emily_davis',
    fullName: 'Emily Davis',
    profilePictureUrl: 'https://via.placeholder.com/60',
    mutualFriends: 3,
  },
  {
    id: '8',
    userName: 'ryan_miller',
    fullName: 'Ryan Miller',
    profilePictureUrl: 'https://via.placeholder.com/60',
    mutualFriends: 8,
  },
];

export default function ActivityScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedTab, setSelectedTab] = useState<'following' | 'you'>('you');

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    return `${Math.floor(diffInDays / 7)}w`;
  };

  const handleFollowRequest = (notificationId: number, action: 'accept' | 'decline') => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
    
    // Here you would call your API to handle the follow request
    console.log(`${action} follow request for notification ${notificationId}`);
  };

  const renderNotification = ({ item }: { item: typeof mockNotifications[0] }) => {
    const getNotificationIcon = () => {
      switch (item.type) {
        case 'like':
          return <Ionicons name="heart" size={20} color="#ff3040" />;
        case 'comment':
          return <Ionicons name="chatbubble" size={20} color="#666" />;
        case 'follow':
        case 'follow_request':
          return <Ionicons name="person-add" size={20} color="#007AFF" />;
        default:
          return <Ionicons name="notifications" size={20} color="#666" />;
      }
    };

    return (
      <View style={[styles.notificationItem, !item.isRead && styles.unreadNotification]}>
        <View style={styles.notificationContent}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.actor.profilePictureUrl }} style={styles.avatar} />
            <View style={styles.notificationIconContainer}>
              {getNotificationIcon()}
            </View>
          </View>
          
          <View style={styles.notificationText}>
            <Text style={styles.notificationMessage}>
              <Text style={styles.username}>{item.actor.userName}</Text>{' '}
              {item.message}
            </Text>
            <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
          </View>

          {/* Action buttons for follow requests */}
          {item.type === 'follow_request' && (
            <View style={styles.followRequestActions}>
              <TouchableOpacity 
                style={styles.acceptButton}
                onPress={() => handleFollowRequest(item.id, 'accept')}
              >
                <Text style={styles.acceptButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.declineButton}
                onPress={() => handleFollowRequest(item.id, 'decline')}
              >
                <Text style={styles.declineButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Follow button for new followers */}
          {item.type === 'follow' && (
            <TouchableOpacity style={styles.followBackButton}>
              <Text style={styles.followBackButtonText}>Follow</Text>
            </TouchableOpacity>
          )}

          {/* Post thumbnail for post-related notifications */}
          {(item.type === 'like' || item.type === 'comment') && item.postImageUrl && (
            <TouchableOpacity>
              <Image source={{ uri: item.postImageUrl }} style={styles.postThumbnail} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const renderSuggestedUser = ({ item }: { item: typeof mockSuggestedUsers[0] }) => (
    <View style={styles.suggestedUserItem}>
      <Image source={{ uri: item.profilePictureUrl }} style={styles.suggestedAvatar} />
      <View style={styles.suggestedUserInfo}>
        <Text style={styles.suggestedUsername}>{item.userName}</Text>
        <Text style={styles.suggestedFullName}>{item.fullName}</Text>
        <Text style={styles.mutualFriendsText}>
          {item.mutualFriends} mutual {item.mutualFriends === 1 ? 'friend' : 'friends'}
        </Text>
      </View>
      <View style={styles.suggestedActions}>
        <TouchableOpacity style={styles.followSuggestedButton}>
          <Text style={styles.followSuggestedButtonText}>Follow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dismissButton}>
          <Ionicons name="close" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activity</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'following' && styles.activeTab]}
          onPress={() => setSelectedTab('following')}
        >
          <Text style={[styles.tabText, selectedTab === 'following' && styles.activeTabText]}>
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'you' && styles.activeTab]}
          onPress={() => setSelectedTab('you')}
        >
          <Text style={[styles.tabText, selectedTab === 'you' && styles.activeTabText]}>
            You
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {selectedTab === 'you' ? (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.notificationsList}
        />
      ) : (
        <ScrollView style={styles.followingContent}>
          <View style={styles.suggestedSection}>
            <Text style={styles.sectionTitle}>Suggested for you</Text>
            <FlatList
              data={mockSuggestedUsers}
              renderItem={renderSuggestedUser}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    paddingVertical: 12,
  },
  unreadNotification: {
    backgroundColor: '#f8f9fa',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationIconContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  notificationText: {
    flex: 1,
    marginRight: 10,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 2,
  },
  username: {
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  followRequestActions: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  declineButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  declineButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
  },
  followBackButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followBackButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  postThumbnail: {
    width: 40,
    height: 40,
  },
  followingContent: {
    flex: 1,
  },
  suggestedSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  suggestedUserItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  suggestedAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  suggestedUserInfo: {
    flex: 1,
  },
  suggestedUsername: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  suggestedFullName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  mutualFriendsText: {
    fontSize: 12,
    color: '#666',
  },
  suggestedActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  followSuggestedButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followSuggestedButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dismissButton: {
    padding: 8,
  },
});
