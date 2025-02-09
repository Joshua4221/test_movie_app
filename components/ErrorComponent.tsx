import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import AppButton from './AppButton';
import { Colors } from '@/constants/Colors';

const ErrorComponent = ({ Retry }: { Retry: () => void }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{ width, height, alignItems: 'center', justifyContent: 'center' }}
    >
      <AppButton
        color={Colors.black}
        width={149}
        height={44}
        size={20}
        fontSize={17}
        backgroundColor={Colors.white}
        title="Retry Again"
        onPress={Retry}
      />
    </View>
  );
};

export default ErrorComponent;

const styles = StyleSheet.create({});
