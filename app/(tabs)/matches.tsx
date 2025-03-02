import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MessageSquare } from 'lucide-react-native';
import { router } from 'expo-router';
import ady from '../../assets/images/ady.jpg';
import gg from '../../assets/images/g.jpg';
import k from '../../assets/images/k.jpg';
import t from '../../assets/images/t.jpg';
// Sample data for matches
const MATCHES = [
  {
    id: '1',
    name: 'Adyatan Dagar',
    image: ady,
    university: 'University of South Florida',
    major: 'Computer Science',
    matchDate: '2 days ago',
    compatibility: 92,
  },
  {
    id: '2',
    name: 'Anthony Martini',
    image: t,
    university: 'University of South Florida',
    major: 'Economics',
    matchDate: '1 week ago',
    compatibility: 85,
  },
  {
    id: '3',
    name: 'Kabir Sheikh',
    image: k,
    university: 'University of South Florida',
    major: 'Psychology',
    matchDate: '3 days ago',
    compatibility: 88,
  },
];

// Sample data for pending matches

export default function MatchesScreen() {
  const navigateToMessages = (match: any) => {
    router.push({
      pathname: '/chat',
      params: { id: match.id, name: match.name, image: match.image }
    });
  };

  const renderMatchItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.matchItem} onPress={() => navigateToMessages(item)}>
      <Image source={ item.image } style={styles.matchImage} />
      <View style={styles.matchInfo}>
        <Text style={styles.matchName}>{item.name}</Text>
        <Text style={styles.matchDetails}>{item.major} • {item.university}</Text>
        <Text style={styles.matchDate}>Matched {item.matchDate}</Text>
      </View>
      <View style={styles.matchActions}>
       
        <TouchableOpacity 
          style={styles.messageButton}
          onPress={() => navigateToMessages(item)}
        >
          <MessageSquare size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Matches</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Matches ({MATCHES.length})</Text>
          {MATCHES.length > 0 ? (
            <FlatList
              data={MATCHES}
              renderItem={renderMatchItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No matches yet. Keep swiping to find your perfect roommate!
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5864',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  matchItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  matchImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  matchInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  matchDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  matchDate: {
    fontSize: 12,
    color: '#999',
  },
  matchActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  compatibilityBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginBottom: 10,
  },
  compatibilityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF5864',
  },
  messageButton: {
    backgroundColor: '#F1D061',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingMatchItem: {
    flexDirection: 'row',
    backgroundColor: '#8EB1C7',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pendingMatchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  pendingMatchInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  pendingMatchName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  pendingMatchDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pendingCompatibility: {
    backgroundColor: '#FFF0F2',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  pendingCompatibilityText: {
    fontSize: 12,
    color: '#FF5864',
    fontWeight: '500',
  },
  pendingMatchActions: {
    justifyContent: 'center',
  },
  pendingActionButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#FF5864',
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  declineButton: {
    backgroundColor: '#f0f0f0',
  },
  declineButtonText: {
    color: '#666',
    fontSize: 14,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});