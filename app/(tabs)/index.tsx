
import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { Heart, X } from 'lucide-react-native';
import ady from '../../assets/images/ady.jpg';
import gg from '../../assets/images/g.jpg';
import k from '../../assets/images/k.jpg';
import t from '../../assets/images/t.jpg';

const ROOMMATES = [
  {
    id: '1',
    name: 'Adyatan Dagar',
    age: 20,
    university: 'University of South Florida',
    major: 'Computer Science',
    year: 'Junior',
    bio: 'Early riser who loves to keep things tidy. I enjoy hiking on weekends and quiet study sessions during the week.',
    images: ady,
    lifestyle: ['Early Bird', 'Neat', 'Studious', 'Active'],
    location: 'Tampa, Florida'
  },
  {
    id: '2',
    name: 'Anthony Martini',
    age: 19,
    university: 'University of South Florida',
    major: 'Economics',
    year: 'Sophomore',
    bio: 'Easygoing and social. I play basketball and like to host small gatherings occasionally. Looking for a roommate who is respectful but also fun.',
    images: t,
    lifestyle: ['Social', 'Active', 'Foodie', 'Night Owl'],
    location: 'Cincinnati, Ohio'
  },
  {
    id: '3',
    name: 'Kabir Sheikh',
    age: 21,
    university: 'University of South Florida',
    major: 'Psychology',
    year: 'Senior',
    bio: 'Quiet bookworm who enjoys cooking and occasional Netflix binges. I keep to myself but am always up for a good conversation.',
    images: k,
    lifestyle: ['Quiet', 'Homebody', 'Foodie', 'Neat'],
    location: 'New Delhi, India'
  },
  {
    id: '4',
    name: 'Gianna Gentille',
    age: 20,
    university: 'University of South Florida',
    major: 'Engineering',
    year: 'Junior',
    bio: 'Engineering student who spends most of my time in the lab. I\'m clean, quiet, and respectful of shared spaces.',
    images: gg,
    lifestyle: ['Studious', 'Quiet', 'Neat', 'Early Bird'],
    location: 'Pittsburgh, Pennsylvania'
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: false,
    }).start();
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => swipeComplete());
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => swipeComplete());
  };

  const swipeComplete = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ROOMMATES.length);
    position.setValue({ x: 0, y: 0 });
  };

  const currentItem = ROOMMATES[currentIndex];

  return (
    <View style={styles.cardContainer}>
       <View style={styles.header}>
              <Text style={styles.headerTitle}>roommer.</Text>
             
            </View>
      <Animated.View
        style={[styles.card, { transform: [{ translateX: position.x }] }]}
        {...panResponder.panHandlers}
      >
        <Image source={currentItem.images} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardName}>
            {currentItem.name}, {currentItem.age}
          </Text>
          <Text style={styles.cardUniversity}>{currentItem.university}</Text>
          <Text style={styles.cardMajor}>
            {currentItem.major} • {currentItem.year}
          </Text>
          <Text style={styles.cardBio}>{currentItem.bio}</Text>
          <View style={styles.lifestyleTags}>
            {currentItem.lifestyle.map((tag) => (
              <Text key={tag} style={styles.lifestyleTag}>
                {tag}
              </Text>
            ))}
          </View>
          <Text style={styles.locationContainer}>
            From {currentItem.location} 
          </Text>
        </View>
      </Animated.View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={swipeLeft}>
          <X size={30} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={swipeRight}>
          <Heart size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    backgroundColor: '',
    paddingVertical:10,
    color:'#FF5864',
  },
  location: {
    color:'#FF5864',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF5864',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    height: '73%',
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '60%',
  },
  cardContent: {
    padding: 16,
  },
  cardName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardUniversity: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  cardMajor: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  cardBio: {
    fontSize: 14,
    color: 'darkgray',
    marginBottom: 8,
  },
  lifestyleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lifestyleTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 4,
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#59564A',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
