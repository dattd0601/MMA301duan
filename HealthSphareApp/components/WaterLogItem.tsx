import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/colors';
import { Droplets } from 'lucide-react-native';

interface WaterLogItemProps {
  amount: number;
  timestamp: string;
}

const WaterLogItem: React.FC<WaterLogItemProps> = ({ amount, timestamp }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.highlight }]}>
        <Droplets size={20} color={colors.water} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.amount, { color: colors.text }]}>
          {amount} ml
        </Text>
        <Text style={[styles.timestamp, { color: colors.muted }]}>
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
  },
});

export default WaterLogItem;