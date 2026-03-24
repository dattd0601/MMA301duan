import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, Filter } from "lucide-react-native";

import { useColorScheme } from "../../hooks/useColorScheme";
import Colors from "../../constants/colors";
import { useUserStore } from "../../store/userStore";
import { FoodItem } from "../../mocks/vietnameseFoods";
import FoodCard from "../../components/FoodCard";

export default function FoodScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const { calculateCalories, profile } = useUserStore();
  const calories = calculateCalories() || { dailyCalories: 2000, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 };
  const { dailyCalories, proteinGrams, carbsGrams, fatGrams } = calories;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [foodData, setFoodData] = useState<FoodItem[]>([]);

  React.useEffect(() => {
    fetch('http://192.168.3.250:5005/api/foods')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setFoodData(data);
        } else {
          console.error('API did not return an array:', data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const totalCalories = useMemo(() => {
    return selectedFoods.reduce((sum, f) => sum + f.calories, 0);
  }, [selectedFoods]);

  const filteredFoods = useMemo(() => {
    return (Array.isArray(foodData) ? foodData : []).filter((food) => {
      const matchesSearch =
        food?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(food.tags) && food.tags.some((tag) =>
          tag?.toLowerCase().includes(searchQuery.toLowerCase())
        ));

      const matchesCategory = selectedCategory
        ? food.category === selectedCategory
        : true;

      let matchesGoal = true;
      if (selectedFilter === "weightLoss") matchesGoal = !!food.isForWeightLoss;
      else if (selectedFilter === "weightGain")
        matchesGoal = !!food.isForWeightGain;

      return matchesSearch && matchesCategory && matchesGoal;
    });
  }, [foodData, searchQuery, selectedCategory, selectedFilter]);

  const categories = [
    { id: "breakfast", label: "Sáng" },
    { id: "lunch", label: "Trưa" },
    { id: "dinner", label: "Tối" },
    { id: "snack", label: "Ăn nhẹ" },
  ];

  const filters = [
    { id: null, label: "Tất cả" },
    { id: "weightLoss", label: "Giảm cân" },
    { id: "weightGain", label: "Tăng cân" },
  ];
  
  const handleSelectFood = (food: FoodItem) => {
    if (selectedFoods.some(f => (f.id || (f as any)._id) === (food.id || (food as any)._id))) {
      setSelectedFoods(selectedFoods.filter(f => (f.id || (f as any)._id) !== (food.id || (food as any)._id)));
    } else {
      // Thêm món ăn
      const newTotal = totalCalories + food.calories;
      if (newTotal > dailyCalories) {
        alert("Bạn đã vượt quá mức calories cho phép trong ngày!");
      }
      setSelectedFoods([...selectedFoods, food]);
    }
  };


  const renderFoodItem = ({ item }: { item: FoodItem }) => {
    const isSelected = selectedFoods.some(f => (f.id || (f as any)._id) === (item.id || (item as any)._id));
    return (
      <FoodCard 
        food={item} 
        onPress={() => handleSelectFood(item)} 
        isSelected={isSelected}
      />
    );
  };


  // const renderFoodItem = ({ item }: { item: FoodItem }) => (
  //   <FoodCard food={item} />
  // );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { margin: 10 }]}>
        <Text style={[styles.title, { color: colors.text }]}>
          Thực phẩm Việt Nam
        </Text>
        <Text style={[styles.subtitle, { color: colors.muted }]}>
          Khám phá các món ăn phù hợp với mục tiêu của bạn
        </Text>
      </View>
      <View style={{ marginHorizontal: 16, marginBottom: 12 }}>
        <Text style={{ color: colors.text, fontWeight: '500', marginBottom: 4 }}>
          Calories đã chọn: {totalCalories} / {dailyCalories} kcal
        </Text>
        <View style={{ height: 10, backgroundColor: colors.border, borderRadius: 8 }}>
          <View
            style={{
              width: `${Math.min((totalCalories / dailyCalories) * 100, 100)}%`,
              height: '100%',
              backgroundColor: colors.primary,
              borderRadius: 8,
            }}
          />
        </View>
      </View>


      {/* Search bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card, margin: 10 }]}>
        <Search size={20} color={colors.muted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Tìm kiếm món ăn..."
          placeholderTextColor={colors.muted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category selector */}
      <View style={[styles.categoriesContainer, { margin: 10 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  { backgroundColor: isActive ? colors.primary : colors.card },
                ]}
                onPress={() =>
                  setSelectedCategory(isActive ? null : category.id)
                }
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: isActive ? "white" : colors.text },
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Filter by goal */}
      <View style={[styles.filtersContainer, { margin: 10 }]}>
        <View style={styles.filterHeader}>
          <View style={styles.filterTitleContainer}>
            <Filter size={16} color={colors.muted} />
            <Text style={[styles.filterTitle, { color: colors.text }]}>
              Lọc theo mục tiêu
            </Text>
          </View>
          <View style={styles.filterButtons}>
            {filters.map((filter) => {
              const isActive = selectedFilter === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id ?? "all"}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: isActive ? colors.primary : "transparent",
                      borderColor: colors.border,
                    },
                  ]}
                  onPress={() => setSelectedFilter(filter.id)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      { color: isActive ? "white" : colors.text },
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Food list */}
      <FlatList
        data={filteredFoods}
        renderItem={renderFoodItem}
        keyExtractor={(item: FoodItem) => item.id || (item as any)._id || Math.random().toString()}
        numColumns={2}
        columnWrapperStyle={styles.foodGrid}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
              Không tìm thấy món ăn phù hợp
            </Text>
          </View>
        }
      />
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
  foodGrid: {
    justifyContent: "space-between",
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
  },
});
