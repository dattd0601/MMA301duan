import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Exercise } from '../mocks/exercises';
import Colors from '../constants/colors';
import { useColorScheme } from '../hooks/useColorScheme';
import { Clock, Dumbbell, Flame } from 'lucide-react-native';

interface ExerciseCardProps {
  exercise: Exercise;
  onPress: (exercise: Exercise) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Map difficulty values to display strings
  const difficultyDisplay =
    exercise.difficulty === 'beginner'
      ? 'Dễ'
      : exercise.difficulty === 'intermediate'
      ? 'Trung bình'
      : exercise.difficulty === 'advanced'
      ? 'Khó'
      : exercise.difficulty;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]} 
      onPress={() => onPress(exercise)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: exercise.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{exercise.name}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Clock size={16} color={colors.primary} />
            <Text style={[styles.infoText, { color: colors.muted }]}>
              {exercise.duration} phút
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Flame size={16} color={colors.warning} />
            <Text style={[styles.infoText, { color: colors.muted }]}>
              {exercise.caloriesBurned} calo
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Dumbbell size={16} color={colors.secondary} />
            <Text style={[styles.infoText, { color: colors.muted }]}>
              {difficultyDisplay}
            </Text>
          </View>
        </View>
        
        <View style={styles.tags}>
          {exercise.muscleGroups.slice(0, 5).map((muscle, index) => (
            <View 
              key={index} 
              style={[styles.tag, { backgroundColor: colors.highlight }]}
            >
              <Text style={[styles.tagText, { color: colors.primary }]}>
                {muscle}
              </Text>
            </View>
          ))}
          {exercise.isForWeightGain && (
            <View style={[styles.tag, { backgroundColor: colors.highlight }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>
                Tăng Cân
              </Text>
            </View>
          )}
          {exercise.isForWeightLoss && (
            <View style={[styles.tag, { backgroundColor: colors.highlight }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>
                Giảm Cân
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
  borderRadius: 12,
  marginBottom: 16,
  marginLeft: 8,
  marginRight: 8,
  overflow: 'hidden',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Đây là cách mới để tạo bóng
  elevation: 2, // Android vẫn cần cái này
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default ExerciseCard;