import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

export default function CreatePostScreen({ navigation }: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request camera permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera is required!');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Photo',
      'Choose how you want to select a photo',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handlePost = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setIsLoading(true);
    
    try {
      // Here you would call your API to create the post
      // const formData = new FormData();
      // formData.append('image', {
      //   uri: selectedImage,
      //   type: 'image/jpeg',
      //   name: 'photo.jpg',
      // } as any);
      // formData.append('caption', caption);
      // 
      // await apiService.createPost(formData);

      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Success', 'Post created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setSelectedImage(null);
            setCaption('');
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPost = () => {
    setSelectedImage(null);
    setCaption('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={resetPost}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity 
          onPress={handlePost}
          disabled={!selectedImage || isLoading}
          style={[styles.shareButton, (!selectedImage || isLoading) && styles.shareButtonDisabled]}
        >
          <Text style={[styles.shareText, (!selectedImage || isLoading) && styles.shareTextDisabled]}>
            {isLoading ? 'Posting...' : 'Share'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          {selectedImage ? (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity style={styles.changeImageButton} onPress={showImagePicker}>
                <Ionicons name="camera" size={20} color="#007AFF" />
                <Text style={styles.changeImageText}>Change Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.imagePlaceholder} onPress={showImagePicker}>
              <Ionicons name="camera-outline" size={60} color="#666" />
              <Text style={styles.placeholderText}>Tap to add photo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Caption Section */}
        <View style={styles.captionSection}>
          <Text style={styles.captionLabel}>Write a caption...</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="What's on your mind?"
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={2200}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{caption.length}/2,200</Text>
        </View>

        {/* Options Section */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Tag People</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Add Location</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Accessibility</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Advanced Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>
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
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  cancelText: {
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  shareButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  shareButtonDisabled: {
    opacity: 0.5,
  },
  shareText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  shareTextDisabled: {
    color: '#666',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    padding: 15,
  },
  imageContainer: {
    alignItems: 'center',
  },
  selectedImage: {
    width: width - 30,
    height: width - 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  changeImageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  changeImageText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  imagePlaceholder: {
    width: width - 30,
    height: 300,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  captionSection: {
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  captionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  captionInput: {
    minHeight: 100,
    fontSize: 16,
    textAlignVertical: 'top',
    paddingTop: 0,
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  optionsSection: {
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
  },
});
