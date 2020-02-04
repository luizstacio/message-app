import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';


const Button = ({ label, style, styleLabel, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.buttonContainer, style]}>
    <Text style={[styles.buttonLabel, styleLabel]}>{label}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  buttonContainer: {
    color: '#FFFFFF',
    backgroundColor: '#1b55e2',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8
  },
  buttonLabel: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 20
  }
});

export default Button;