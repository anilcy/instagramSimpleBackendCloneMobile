import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const imageSize = width / 3 - 2;

// Mock data for suggested users
const mockSuggestedUsers = [
  {
    id: '1',
    userName: 'john_doe',
    fullName: 'John Doe',
    profilePictureUrl: 'https://via.placeholder.com/50',
    followersCount: 1250,
  },
  {
    id: '2',
    userName: 'jane_smith',
    fullName: 'Jane Smith',
    profilePictureUrl: 'https://via.placeholder.com/50',
    followersCount: 890,
  },
  {
    id: '3',
    userName: 'mike_wilson',
    fullName: 'Mike Wilson',
    profilePictureUrl: 'https://via.placeholder.com/50',
    followersCount: 2340,
  },
];

// Mock data for explore posts
const mockExplorePosts = [
  { id: 1, imageUrl: 'https://via.placeholder.com/300x300', likesCount: 124 },
  { id: 2, imageUrl: 'https://via.placeholder.com/300x400', likesCount: 89 },
  { id: 3, imageUrl: 'https://via.placeholder.com/300x350', likesCount: 256 },
  { id: 4, imageUrl: 'https://via.placeholder.com/300x300', likesCount: 34 },
  { id: 5, imageUrl: 'https://via.placeholder.com/300x380', likesCount: 167 },
  { id: 6, imageUrl: 'https://via.placeholder.com/300x300', likesCount: 92 },
  { id: 7, imageUrl: 'https://via.placeholder.com/300x320', likesCount: 445 },
  { id: 8, imageUrl: 'https://via.placeholder.com/300x300', likesCount: 78 },
  { id: 9, imageUrl: 'https://via.placeholder.com/300x360', likesCount: 203 },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof mockSuggestedUsers>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
    
    if (query.length > 0) {
      // Filter suggested users based on search query
      const filtered = mockSuggestedUsers.filter(
        user => 
          user.userName.toLowerCase().includes(query.toLowerCase()) ||
          user.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const formatFollowersCount = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  const renderUser = ({ item }: { item: typeof mockSuggestedUsers[0] }) => (
    <TouchableOpacity style={styles.userItem}>
      <Image source={{ uri: item.profilePictureUrl }} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.fullName}>{item.fullName}</Text>
        <Text style={styles.followersText}>
          {formatFollowersCount(item.followersCount)} followers
        </Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderExplorePost = ({ item, index }: { item: typeof mockExplorePosts[0], index: number }) => {
    // Make some posts larger for visual variety
    const isLarge = index % 7 === 0;
    const postStyle = isLarge ? styles.largePost : styles.regularPost;
    
    return (
      <TouchableOpacity style={[styles.exploreItem, postStyle]}>
        <Image source={{ uri: item.imageUrl }} style={[styles.exploreImage, postStyle]} />
        <View style={styles.imageOverlay}>
          <Ionicons name="heart" size={16} color="#fff" />
          <Text style={styles.likesOverlay}>{item.likesCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={18} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      {isSearching ? (
        // Search Results
        <View style={styles.searchResults}>
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={renderUser}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>No users found</Text>
            </View>
          )}
        </View>
      ) : (
        // Explore Grid
        <View style={styles.exploreContainer}>
          <FlatList
            data={mockExplorePosts}
            renderItem={renderExplorePost}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            style={styles.exploreGrid}
          />
        </View>
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
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  clearButton: {
    marginLeft: 8,
  },
  searchResults: {
    flex: 1,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  fullName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  followersText: {
    fontSize: 12,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
  },
  exploreContainer: {
    flex: 1,
  },
  exploreGrid: {
    flex: 1,
  },
  exploreItem: {
    margin: 1,
    position: 'relative',
  },
  regularPost: {
    width: imageSize,
    height: imageSize,
  },
  largePost: {
    width: imageSize * 2 + 2, // Two columns plus gap
    height: imageSize * 2 + 2,
  },
  exploreImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  likesOverlay: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
});
