import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Send, Info } from 'lucide-react-native';
import ady from '../../assets/images/ady.jpg';
import gg from '../../assets/images/g.jpg';
import k from '../../assets/images/k.jpg';
import t from '../../assets/images/t.jpg';
// Sample messages data
const SAMPLE_MESSAGES = [
  {
    id: '1',
    text: 'Hi there! I saw we matched as potential roommates. I think we might be a good fit!',
    sender: 'other',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: 'Hey! Nice to meet you. I was impressed by your profile. What are you looking for in a roommate?',
    sender: 'me',
    timestamp: '10:32 AM',
  },{
    id: '11',
    text: 'How do you like roommer so far?',
    sender: 'other',
    timestamp: '10:53 AM',
  }
];

export default function ChatScreen() {
  const { id, name, image } = useLocalSearchParams();
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when component mounts
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Scroll to bottom after sending message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessageContainer : styles.otherMessageContainer
    ]}>
      {item.sender === 'other' && (
        <Image source={image} style={styles.avatar} />
      )}
      <View style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessageBubble : styles.otherMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'me' ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.text}
        </Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image source={image} style={styles.headerAvatar} />
          <Text style={styles.headerName}>{name}</Text>
        </View>
       
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !newMessage.trim() && styles.disabledSendButton]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Send size={20} color={newMessage.trim() ? '#fff' : '#ccc'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#FF5864'
  },
  infoButton: {
    padding: 5,
  },
  messagesContainer: {
    padding: 15,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
  },
  myMessageBubble: {
    backgroundColor: '#FF5864',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding:20,
    marginBottom:0,
    backgroundColor: '#FF5864',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5864',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  disabledSendButton: {
    backgroundColor: '#f0f0f0',
  },
});