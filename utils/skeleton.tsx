import { StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import React from 'react';
import { Skeleton as Skeletons } from '@motify/skeleton';

interface SkeletonProps {
  variant?: 'box' | 'circle';
  width: string | number;
  height: string | number;
  background?: StyleProp<ViewStyle>;
  marginVertical?: StyleProp<ViewStyle>;
  newStyles?: StyleProp<ViewStyle>;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'box',
  background,
  marginVertical,
  newStyles,
}) => {
  return (
    <View style={newStyles}>
      <Skeletons
        width={width}
        height={height}
        colorMode="light"
        colors={['#212121FF', '#060606FF', '#060606FF', '#2F2F2FFF']}
        radius={variant === 'circle' ? 'round' : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Skeleton: { backgroundColor: 'rgba(248,248,248,70)' },
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  padded: {
    padding: 16,
  },
});

export default Skeleton;
