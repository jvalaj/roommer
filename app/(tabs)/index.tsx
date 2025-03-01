import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import { Heart, X, Star, Filter } from 'lucide-react-native';
import ady from '../../assets/images/ady.jpg';
import gg from '../../assets/images/g.jpg';
import k from '../../assets/images/k.jpg';
import t from '../../assets/images/t.jpg';
// Sample data for potential roommates

function renderImage(image: string | number) {
  if (typeof image === 'string') {
    return { uri: image };   // Remote URL
  } else {
    return image;            // Local file
  }
}


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
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default function DiscoverScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.5, 1],
    extrapolate: 'clamp',
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.9, 1],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
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
    }).start(() => swipeComplete('right'));
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 300,
      useNativeDriver: false,
    }).start(() => swipeComplete('left'));
  };

  const swipeComplete = (direction: string) => {
    const item = ROOMMATES[currentIndex];
    direction === 'right' ? console.log('Liked', item.name) : console.log('Disliked', item.name);
    
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex(isLastItem ? 0 : currentIndex + 1);
    setNextIndex(isLastItem ? 1 : nextIndex + 1);
  };

  const isLastItem = currentIndex === ROOMMATES.length - 1;
  const currentItem = ROOMMATES[currentIndex];
  const nextItem = ROOMMATES[nextIndex];

  if (!currentItem) {
    return (
      <View style={styles.noMoreCards}>
        <Text style={styles.noMoreCardsText}>No more roommates to show!</Text>
        <TouchableOpacity 
          style={styles.resetButton}
          onPress={() => setCurrentIndex(0)}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>roommer.</Text>
       
      </View>

      <View style={styles.cardContainer}>
        {nextItem && (
          <Animated.View
            style={[
              styles.card,
              {
                opacity: nextCardOpacity,
                transform: [{ scale: nextCardScale }],
              },
            ]}
          >
            <Image source={nextItem.images} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{nextItem.name}, {nextItem.age}</Text>
                <Text style={styles.cardUniversity}>{nextItem.university}</Text>
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardMajor}>{nextItem.major} • {nextItem.year}</Text>
                <Text style={styles.cardBio}>{nextItem.bio}</Text>
              </View>
              <View style={styles.lifestyleTags}>
                {nextItem.lifestyle.map((tag) => (
                  <View key={tag} style={styles.lifestyleTag}>
                    <Text style={styles.lifestyleTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>
        )}

        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: rotation },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Animated.View style={[styles.likeLabel, { opacity: likeOpacity }]}>
            <Text style={styles.likeLabelText}>LIKE</Text>
          </Animated.View>
          <Animated.View style={[styles.dislikeLabel, { opacity: dislikeOpacity }]}>
            <Text style={styles.dislikeLabelText}>NOPE</Text>
          </Animated.View>

          <Image source={currentItem.images} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{currentItem.name}, {currentItem.age}</Text>
              <Text style={styles.cardUniversity}>{currentItem.university}</Text>
            </View>
            <View style={styles.cardDetails}>
              <Text style={styles.cardMajor}>{currentItem.major} • {currentItem.year}</Text>
              <Text style={styles.cardBio}>{currentItem.bio}</Text>
            </View>
            <View style={styles.lifestyleTags}>
              {currentItem.lifestyle.map((tag) => (
                <View key={tag} style={styles.lifestyleTag}>
                  <Text style={styles.lifestyleTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={swipeLeft}>
          <X size={30} color="#FF5864" />
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.button} onPress={swipeRight}>
          <Heart size={30} color="#4CD964" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5864',
  },
  filterButton: {
    padding: 8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.9,
    height: '80%',
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '60%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardUniversity: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  cardDetails: {
    marginBottom: 15,
  },
  cardMajor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  cardBio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lifestyleTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lifestyleTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  lifestyleTagText: {
    fontSize: 12,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 30,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#59564A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  starButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  likeLabel: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 10,
    transform: [{ rotate: '20deg' }],
  },
  likeLabelText: {
    borderWidth: 4,
    borderColor: '#4CD964',
    color: '#4CD964',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
  },
  dislikeLabel: {
    position: 'absolute',
    top: 50,
    left: 40,
    zIndex: 10,
    transform: [{ rotate: '-20deg' }],
  },
  dislikeLabelText: {
    borderWidth: 4,
    borderColor: '#FF5864',
    color: '#FF5864',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 10,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMoreCardsText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#FF5864',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});