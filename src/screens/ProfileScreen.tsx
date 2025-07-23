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
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const imageSize = width / 3 - 2;

// Mock user data
const mockUser = {
  id: '1',
  userName: 'your_username',
  fullName: 'Your Full Name',
  profilePictureUrl: 'https://via.placeholder.com/150',
  bio: '🌟 Living my best life\n📍 San Francisco\n💻 Developer',
  websiteUrl: 'www.yourwebsite.com',
  postsCount: 42,
  followersCount: 1250,
  followingCount: 180,
  isFollowing: false,
};

// Mock posts data
const mockUserPosts = [
  { id: 1, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 2, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 3, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 4, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 5, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 6, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 7, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 8, imageUrl: 'https://via.placeholder.com/300x300' },
  { id: 9, imageUrl: 'https://via.placeholder.com/300x300' },
];

export default function ProfileScreen() {
  const [user] = useState(mockUser);
  const [userPosts] = useState(mockUserPosts);
  const [selectedTab, setSelectedTab] = useState('grid'); // 'grid' or 'tagged'

  const formatCount = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  const renderPost = ({ item }: { item: typeof mockUserPosts[0] }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.username}>{user.userName}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="add-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="menu-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          {/* Profile Picture and Stats */}
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.profilePictureUrl }} style={styles.profileImage} />
            
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{formatCount(user.postsCount)}</Text>
                <Text style={styles.statLabel}>Posts</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{formatCount(user.followersCount)}</Text>
                <Text style={styles.statLabel}>Followers</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>{formatCount(user.followingCount)}</Text>
                <Text style={styles.statLabel}>Following</Text>
              </View>
            </View>
          </View>

          {/* Name and Bio */}
          <View style={styles.bioSection}>
            <Text style={styles.fullName}>{user.fullName}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            {user.websiteUrl && (
              <Text style={styles.website}>{user.websiteUrl}</Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <Ionicons name="person-add-outline" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stories Highlights */}
        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.addHighlight}>
              <View style={styles.addHighlightCircle}>
                <Ionicons name="add" size={24} color="#666" />
              </View>
              <Text style={styles.highlightText}>New</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'grid' && styles.activeTab]}
            onPress={() => setSelectedTab('grid')}
          >
            <Ionicons 
              name="grid-outline" 
              size={24} 
              color={selectedTab === 'grid' ? '#000' : '#666'} 
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'tagged' && styles.activeTab]}
            onPress={() => setSelectedTab('tagged')}
          >
            <Ionicons 
              name="pricetag-outline" 
              size={24} 
              color={selectedTab === 'tagged' ? '#000' : '#666'} 
            />
          </TouchableOpacity>
        </View>

        {/* Posts Grid */}
        <FlatList
          data={userPosts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          scrollEnabled={false}
          style={styles.postsGrid}
        />
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
  username: {
    fontSize: 20,
    fontWeight: 'bold',
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
  profileSection: {
    padding: 15,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 30,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  bioSection: {
    marginBottom: 15,
  },
  fullName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 5,
  },
  website: {
    fontSize: 14,
    color: '#1e90ff',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contactButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  highlightsSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  addHighlight: {
    alignItems: 'center',
    marginRight: 15,
  },
  addHighlightCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  highlightText: {
    fontSize: 12,
    color: '#666',
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
  postsGrid: {
    flex: 1,
  },
  postItem: {
    flex: 1,
    margin: 1,
  },
  postImage: {
    width: imageSize,
    height: imageSize,
  },
});
