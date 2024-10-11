/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Pressable, View, Text} from 'react-native';
import { colors, styles } from '../theme/app-theme';

interface Props {
    label: string;
    color?: string;
    doubleSize?: boolean;
    alingment?: boolean;
    blackText?: boolean;
    onPress: () => void;
}

export const CalculatorButton = ({
    label,
    color = colors.darkGray,
    doubleSize = false,
    alingment = false,
    blackText = false,
    onPress,
}:Props) => {
  return (
    <View>
      <Pressable
      onPress={() => onPress()}
      style={ ({pressed}) => ({
        ...styles.button,
        backgroundColor: color,

        width: (doubleSize) ? 180 : 80,
        alignItems: (alingment) ? 'flex-start' : 'center',
        paddingLeft: (alingment) ? 20 : 'auto',
        opacity: (pressed) ? 0.8 : 1,
      })}>
        <Text style={{
            ...styles.buttonText,
            color: (blackText) ? 'black' : 'white',
        }}>{label}</Text>
      </Pressable>
    </View>
  );
};
