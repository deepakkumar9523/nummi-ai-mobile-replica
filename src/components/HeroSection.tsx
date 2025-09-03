import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const [inputText, setInputText] = useState('');
  const [isMobileModalVisible, setIsMobileModalVisible] = useState(false);
  const [selectedFast, setSelectedFast] = useState('Fast');
  const [selectedUser, setSelectedUser] = useState('User');
  const [selectedDefault, setSelectedDefault] = useState('Default');

  const { width, height } = Dimensions.get('window');
  const isMobile = width < 768;
  const gapHeight = height * 0.1; // 10vh equivalent

  const handleSend = () => {
    if (inputText.trim()) {
      console.log('Sending:', inputText);
      setInputText('');
      if (isMobileModalVisible) {
        setIsMobileModalVisible(false);
      }
    }
  };

  const handleChatBoxPress = () => {
    if (isMobile) {
      setIsMobileModalVisible(true);
    }
  };

  const ChatContent = ({ isModal = false }: { isModal?: boolean }) => (
    <View style={[styles.chatBox, isModal && styles.modalChatBox]}>
      <View style={styles.chatHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={['#3B82F6', '#1E3A8A']}
              style={styles.iconGradient}
            >
              <Feather name="message-circle" size={16} color="white" />
            </LinearGradient>
          </View>
          <Text style={styles.chatTitle}>Start a content session</Text>
        </View>
        {isModal && (
          <TouchableOpacity 
            onPress={() => setIsMobileModalVisible(false)}
            style={styles.closeButton}
          >
            <Feather name="x" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What's new today?"
          placeholderTextColor="#9CA3AF"
          value={inputText}
          onChangeText={setInputText}
          multiline
          textAlignVertical="top"
        />
        <View style={styles.inputActions}>
          <TouchableOpacity style={styles.attachButton}>
            <Feather name="paperclip" size={16} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sendButton, inputText.trim() && styles.sendButtonActive]}
            onPress={handleSend}
          >
            <Feather 
              name="send" 
              size={16} 
              color={inputText.trim() ? "white" : "#9CA3AF"} 
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>{selectedFast}</Text>
          <Feather name="chevron-down" size={14} color="#6B7280" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <Feather name="user" size={14} color="#6B7280" />
          <Text style={styles.optionText}>{selectedUser}</Text>
          <Feather name="chevron-down" size={14} color="#6B7280" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionButton}>
          <Feather name="type" size={14} color="#6B7280" />
          <Text style={styles.optionText}>{selectedDefault}</Text>
          <Feather name="chevron-down" size={14} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const WelcomeSection = () => (
    <View style={styles.welcomeContainer}>
      <View style={styles.welcomeIconContainer}>
        <LinearGradient
          colors={['#3B82F6', '#1E3A8A']}
          style={styles.welcomeIconGradient}
        >
          <Feather name="message-circle" size={32} color="white" />
        </LinearGradient>
      </View>
      <Text style={styles.welcomeTitle}>Start a content session</Text>
      <Text style={styles.welcomeSubtitle}>
        Turn your ideas into engaging content with AI assistance
      </Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#1E3A8A', '#93C5FD']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              From features to stories — in minutes.
            </Text>
            <Text style={styles.heroSubtitle}>
              Turn product updates into clear, publish-ready content without the busywork.
            </Text>
          </View>
          
          <View style={[styles.spacer, { height: gapHeight }]} />
          
          {isMobile ? (
            <TouchableOpacity 
              style={styles.chatBoxTouchable}
              onPress={handleChatBoxPress}
              activeOpacity={0.95}
            >
              <ChatContent />
            </TouchableOpacity>
          ) : (
            <ChatContent />
          )}
        </ScrollView>
      </SafeAreaView>

      <Modal
        visible={isMobileModalVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <LinearGradient
          colors={['#1E3A8A', '#93C5FD']}
          style={styles.modalContainer}
        >
          <SafeAreaView style={styles.modalSafeArea}>
            <ScrollView 
              contentContainerStyle={styles.modalScrollContent}
              showsVerticalScrollIndicator={false}
            >
              <WelcomeSection />
              <ChatContent isModal={true} />
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '600',
    lineHeight: 57.6, // 48 * 1.2
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 30, // 20 * 1.5
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
  },
  spacer: {
    width: '100%',
  },
  chatBoxTouchable: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 640,
  },
  chatBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 'auto',
    maxWidth: 640,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  modalChatBox: {
    backgroundColor: 'white',
    marginTop: 20,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  iconGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22.4, // 16 * 1.4
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 48,
    marginBottom: 16,
    position: 'relative',
  },
  textInput: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 100,
    fontSize: 14,
    lineHeight: 21, // 14 * 1.5
    color: '#1F2937',
    minHeight: 48,
  },
  inputActions: {
    position: 'absolute',
    right: 12,
    top: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    gap: 6,
    minHeight: 32,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6, // 14 * 1.4
    color: '#1F2937',
  },
  modalContainer: {
    flex: 1,
  },
  modalSafeArea: {
    flex: 1,
  },
  modalScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 60,
  },
  welcomeIconContainer: {
    marginBottom: 20,
  },
  welcomeIconGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 24,
  },
});