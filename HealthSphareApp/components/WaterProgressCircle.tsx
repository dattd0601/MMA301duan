import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../hooks/useColorScheme';
import Colors from '../constants/colors';
import Svg, { Circle } from 'react-native-svg';
import { Droplets } from 'lucide-react-native';

interface WaterProgressCircleProps {
  percentage: number;
  consumed: number;
  goal: number;
}

const WaterProgressCircle: React.FC<WaterProgressCircleProps> = ({ 
  percentage, 
  consumed, 
  goal 
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  // SVG parameters
  const size = 200;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} style={styles.svg}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.border}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.water}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
        />
      </Svg>
      
      <View style={styles.contentContainer}>
        <Droplets size={32} color={colors.water} style={styles.icon} />
        <Text style={[styles.percentage, { color: colors.text }]}>
          {percentage}%
        </Text>
        <Text style={[styles.consumed, { color: colors.text }]}>
          {consumed} / {goal} ml
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  svg: {
    transform: [{ rotate: '-90deg' }],
  },
  contentContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  percentage: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  consumed: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default WaterProgressCircle;