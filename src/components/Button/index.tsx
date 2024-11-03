import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import { coreStyles } from '../../styles';

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({onClick, text}) => {
  return (
    <TouchableOpacity style={coreStyles.button} onPress={onClick}>
      <Text style={coreStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
