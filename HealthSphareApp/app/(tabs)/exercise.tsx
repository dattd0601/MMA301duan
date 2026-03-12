import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import Colors from "../../constants/colors";
import { exercises, Exercise } from "../../mocks/exercises";
import ExerciseCard from "../../components/ExerciseCard";
import { Search, Filter } from "lucide-react-native";
import { useColorScheme } from "../../hooks/useColorScheme";
import { useUserStore } from "../../store/userStore";

export default function ExerciseScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const { profile } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscleGroups.some((group) =>
        group.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDifficulty = selectedDifficulty ? exercise.difficulty === selectedDifficulty : true;

    let matchesGoal = true;
    if (selectedFilter === "weightLoss") {
      matchesGoal = !!exercise.isForWeightLoss;
    } else if (selectedFilter === "weightGain") {
      matchesGoal = !!exercise.isForWeightGain;
    }

    return matchesSearch && matchesDifficulty && matchesGoal;
  });

  const difficulties = [
    { id: "beginner", label: "Dễ" },
    { id: "intermediate", label: "Trung bình" },
    { id: "advanced", label: "Khó" },
  ];

  const filters = [
    { id: null, label: "Tất cả" },
    { id: "weightLoss", label: "Giảm cân" },
    { id: "weightGain", label: "Tăng cân" },
  ];

  const handleExercisePress = (exercise: Exercise) => {
    setSelectedExercise(exercise);
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <ExerciseCard exercise={item} onPress={handleExercisePress} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header,{margin: 10 }]}>
        {/* <Text style={[styles.title, { color: colors.text }]}>Bài tập</Text> */}
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Khám phá các bài tập phù hợp với mục tiêu của bạn
        </Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card ,margin: 10 }]}>
        <Search size={20} color={colors.muted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Tìm kiếm bài tập..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={[styles.categoriesContainer,{margin: 10 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    selectedDifficulty === difficulty.id ? colors.primary : colors.card,
                },
              ]}
              onPress={() =>
                setSelectedDifficulty(
                  selectedDifficulty === difficulty.id ? null : difficulty.id
                )
              }
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedDifficulty === difficulty.id ? "white" : colors.text },
                ]}
              >
                {difficulty.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={[styles.filtersContainer,{margin: 10 }]}>
        <View style={styles.filterHeader}>
          <View style={styles.filterTitleContainer}>
            <Filter size={16} color={colors.muted} />
            <Text style={[styles.filterTitle, { color: colors.text }]}>
              Lọc theo mục tiêu
            </Text>
          </View>

          <View style={styles.filterButtons}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id ?? "all"}
                style={[
                  styles.filterButton,
                  {
                    backgroundColor: selectedFilter === filter.id ? colors.primary : "transparent",
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setSelectedFilter(filter.id)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    { color: selectedFilter === filter.id ? "white" : colors.text },
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={filteredExercises}
        renderItem={renderExerciseItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              Không tìm thấy bài tập phù hợp
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectedDifficulty(null);
                setSelectedFilter(null);
                setSearchQuery("");
              }}
              style={[styles.resetButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.resetButtonText}>Xóa bộ lọc</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {selectedExercise && (
        <View style={[styles.exerciseDetail, { backgroundColor: "#22252a" }]}>
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "bold" }}>
            {selectedExercise.name}
          </Text>
            <Text
            style={{ color: colors.primary, fontSize: 16, marginTop: 8, textDecorationLine: "underline" }}
            onPress={() => {
              if (selectedExercise.linkYtb) {
              // Open YouTube link
              import("react-native").then(({ Linking }) => {
                Linking.openURL(selectedExercise.linkYtb);
              });
              }
            }}
            >
            Xem video hướng dẫn
            </Text>
          
          {Array.isArray(selectedExercise.steps)
            ? selectedExercise.steps.map((step, idx) => (
                <Text key={idx} style={{ color: colors.muted, marginTop: 8 }}>
                  {step}
                </Text>
              ))
            : null}
          <TouchableOpacity
            onPress={() => setSelectedExercise(null)}
            style={[styles.resetButton, { backgroundColor: colors.primary, marginTop: 16 }]}>
            <Text style={styles.resetButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontWeight: "500",
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  filterButtons: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginLeft: 8,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 8,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "600",
  },
  exerciseDetail: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 16,
    borderRadius: 10,
  },
});
