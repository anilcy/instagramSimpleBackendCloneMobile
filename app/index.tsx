import { Feather, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { useColorScheme } from 'react-native';

import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock Instagram stories data
const mockStories = [
  {
    id: 1,
    userName: 'Your Story',
    profilePictureUrl: 'https://picsum.photos/60/60?random=me',
    hasNewStory: false,
    isViewed: false,
    isOwnStory: true,
  },
  {
    id: 2,
    userName: 'john_doe',
    profilePictureUrl: 'https://picsum.photos/60/60?random=1',
    hasNewStory: true,
    isViewed: false,
    isOwnStory: false,
  },
  {
    id: 3,
    userName: 'jane_smith',
    profilePictureUrl: 'https://picsum.photos/60/60?random=2',
    hasNewStory: true,
    isViewed: true,
    isOwnStory: false,
  },
  {
    id: 4,
    userName: 'mike_wilson',
    profilePictureUrl: 'https://picsum.photos/60/60?random=3',
    hasNewStory: true,
    isViewed: false,
    isOwnStory: false,
  },
  {
    id: 5,
    userName: 'sarah_j',
    profilePictureUrl: 'https://picsum.photos/60/60?random=4',
    hasNewStory: true,
    isViewed: true,
    isOwnStory: false,
  },
];

// Mock Instagram data
const mockPosts = [
  {
    id: 1,
    author: {
      userName: 'john_doe',
      profilePictureUrl: 'https://picsum.photos/40/40?random=1',
    },
    imageUrl: 'https://picsum.photos/400/400?random=1',
    caption: 'Beautiful sunset today! 🌅',
    likesCount: 42,
    isLiked: false,
  },
  {
    id: 2,
    author: {
      userName: 'jane_smith',
      profilePictureUrl: 'https://picsum.photos/40/40?random=2',
    },
    imageUrl: 'https://picsum.photos/400/400?random=2',
    caption: 'Coffee time ☕️ #mondayvibes',
    likesCount: 128,
    isLiked: true,
  },
  {
    id: 3,
    author: {
      userName: 'mike_wilson',
      profilePictureUrl: 'https://picsum.photos/40/40?random=3',
    },
    imageUrl: 'https://picsum.photos/400/400?random=3',
    caption: 'Amazing architecture 🏛️',
    likesCount: 89,
    isLiked: false,
  },
];

export default function InstagramClone() {

  const colorScheme = useColorScheme();              
  const bgColor     = colorScheme === 'dark' ? '#000' : '#fff';

  const [posts, setPosts] = useState(mockPosts);
  const [stories, setStories] = useState(mockStories);
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (postId: number) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1,
            }
          : post
      )
    );
  };

  const handleStoryPress = (storyId: number) => {
    // For now, we don't change the story state when pressed
    // In the future, this would open a story viewer
    console.log('Story pressed:', storyId);
  };

  const renderPost = (post: typeof mockPosts[0]) => (
    <View key={post.id} style={styles.postContainer}>
      {/* Header */}
      <View style={styles.postHeader}>
        <Image source={{ uri: post.author.profilePictureUrl }} style={styles.profileImage} />
        <Text style={styles.username}>{post.author.userName}</Text>
        <View style={{ marginLeft: 'auto' }}>
          <Feather name="more-horizontal" size={22} color="#222" />
        </View>
      </View>

      {/* Image */}
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleLike(post.id)} style={styles.actionButton}>
          <FontAwesome
            name={post.isLiked ? "heart" : "heart-o"}
            size={24}
            color={post.isLiked ? "#ff3040" : "#222"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-circle" size={24} color="#222" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Feather name="send" size={24} color="#222" />
        </TouchableOpacity>

        <View style={styles.rightActions}>
          <TouchableOpacity>
            <Feather name="bookmark" size={24} color="#222" />
          </TouchableOpacity>
        </View>
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
    </View>
  );

  const renderStory = ({ item }: { item: typeof mockStories[0] }) => (
    <TouchableOpacity
      onPress={() => handleStoryPress(item.id)}
      style={styles.storyContainer}
    >
      <LinearGradient
        colors={
          item.isOwnStory
            ? ['#c0c0c0', '#c0c0c0']
            : item.hasNewStory && !item.isViewed
            ? ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5']
            : ['#c0c0c0', '#c0c0c0']
        }
        style={styles.storyGradientBorder}
      >
        <Image
          source={{ uri: item.profilePictureUrl }}
          style={[
            styles.storyImage,
            { borderColor: bgColor }       // Dinamik boşluk rengi
          ]}
        />
        {item.isOwnStory && (
          <View style={styles.addStoryButton}>
            <Text style={styles.addStoryIcon}>+</Text>
          </View>
        )}
      </LinearGradient>
      <Text style={styles.storyUsername} numberOfLines={1}>
        {item.isOwnStory ? 'Your Story' : item.userName}
      </Text>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <ScrollView style={styles.feedContainer}>
            {/* Stories Section */}
            <View style={styles.storiesSection}>
              <FlatList
                data={stories}
                renderItem={renderStory}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storiesContent}
              />
            </View>
            
            {/* Divider */}
            <View style={styles.storiesDivider} />
            
            {/* Posts */}
            {posts.map(renderPost)}
          </ScrollView>
        );
      case 'search':
        return (
          <View style={styles.searchContainer}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {/* Search Results/Empty State */}
            <View style={styles.tabContent}>
              {searchQuery.length > 0 ? (
                <Text style={styles.tabDescription}>
                  Searching for "{searchQuery}"...
                </Text>
              ) : (
                <Text style={styles.tabDescription}>
                  Search for users and content
                </Text>
              )}
            </View>
          </View>
        );
      case 'create':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>📸 Create New Post</Text>
            <Text style={styles.tabDescription}>
              Take a photo or choose from gallery to share
            </Text>
          </View>
        );
      case 'activity':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>🔔 Activity</Text>
            <Text style={styles.tabDescription}>
              • john_doe liked your photo
            </Text>
            <Text style={styles.tabDescription}>
              • jane_smith started following you
            </Text>
            <Text style={styles.tabDescription}>
              • mike_wilson commented on your post
            </Text>
          </View>
        );
      case 'profile':
        return (
          <ScrollView style={styles.profileContainer}>
            {/* Profile Info Section */}
            <View style={styles.profileInfoSection}>
              {/* Profile Header with Avatar and Stats */}
              <View style={styles.profileHeader}>
                <Image 
                  source={{ uri: 'https://picsum.photos/80/80?random=me' }} 
                  style={styles.profileAvatar} 
                />
                <View style={styles.profileStats}>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>42</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>1.2K</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>180</Text>
                    <Text style={styles.statLabel}>Following</Text>
                  </View>
                </View>
              </View>
              
              {/* Profile Name and Bio */}
              <View style={styles.profileBioSection}>
                <Text style={styles.profileName}>Your Name</Text>
                <Text style={styles.profileBio}>
                  🌟 Living my best life{"\n"}
                  📍 San Francisco{"\n"}
                  💻 Developer
                </Text>
              </View>
              
              {/* Edit Profile Button */}
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit profile</Text>
              </TouchableOpacity>
            </View>
            
            {/* Divider */}
            <View style={styles.profileDivider} />
            
            {/* Posts Grid Placeholder */}
            <View style={styles.postsGridSection}>
              <Text style={styles.postsGridTitle}>Posts</Text>
              <Text style={styles.postsGridDescription}>
                Your posts will appear here in a grid format
              </Text>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'home' && styles.activeTab]}
          onPress={() => setCurrentTab('home')}
        >
          <Feather name="home" size={24} color={currentTab === 'home' ? "#222" : "#888"} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'search' && styles.activeTab]}
          onPress={() => setCurrentTab('search')}
        >
          <Feather name="search" size={24} color={currentTab === 'search' ? "#222" : "#888"} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'create' && styles.activeTab]}
          onPress={() => setCurrentTab('create')}
        >
          <Feather name="plus" size={24} color={currentTab === 'create' ? "#222" : "#888"} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'activity' && styles.activeTab]}
          onPress={() => setCurrentTab('activity')}
        >
          <Feather name="bell" size={24} color={currentTab === 'activity' ? "#222" : "#888"} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'profile' && styles.activeTab]}
          onPress={() => setCurrentTab('profile')}
        >
          <Feather name="user" size={24} color={currentTab === 'profile' ? "#222" : "#888"} />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  content: {
    flex: 1,
  },
  feedContainer: {
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
    fontSize: 14,
  },
  postImage: {
    width: width,
    height: width * 0.8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  actionButton: {
    marginRight: 15,
    padding: 5,
  },
  rightActions: {
    marginLeft: 'auto',
  },
  iconButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  likedButton: {
    borderColor: '#ff3040',
  },
  iconText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  likedText: {
    color: '#ff3040',
  },
  // Stories Styles
    storyGradientBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 3,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storiesSection: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  storiesContent: {
    paddingHorizontal: 10,
  },
  storiesDivider: {
    height: 0.5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyImageContainer: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 3,
    marginBottom: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1, 
  },
  newStoryBorder: {
    borderWidth: 2,
    borderColor: '#ff3040',
  },
  viewedStoryBorder: {
    borderWidth: 2,
    borderColor: '#c0c0c0',
  },
  ownStoryBorder: {
    borderWidth: 2,
    borderColor: '#c0c0c0',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  addStoryIcon: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  storyUsername: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    maxWidth: 64,
  },
  // Search Styles
  searchContainer: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
    marginVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 36,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clearIcon: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  // Profile Styles
  profileContainer: {
    flex: 1,
  },
  profileInfoSection: {
    padding: 15,
  },
  profileBioSection: {
    marginTop: 15,
  },
  editProfileButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  profileDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 15,
  },
  postsGridSection: {
    padding: 20,
    alignItems: 'center',
  },
  postsGridTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postsGridDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  likesText: {
    fontWeight: '600',
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: 14,
  },
  captionContainer: {
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  captionText: {
    lineHeight: 18,
    fontSize: 14,
  },
  tabContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 30,
  },
  profileStats: {
    flexDirection: 'row',
    flex: 1,
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
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 20,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#f0f0f0',
  },
  tabIcon: {
    fontSize: 24,
  },
});
