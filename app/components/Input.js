import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

const Input = ({ label, input, style }) => (
  <View
    style={[styles.inputContainer, style]}>
    <Text
      style={styles.inputLabel}>{label}</Text>
    <TextInput
      {...input}
      style={styles.inputField}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCC',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  inputField: {
    fontSize: 14,
    height: 40,
    paddingHorizontal: 10,
    width: '100%'
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 0,
    marginTop: 6,
    marginLeft: 10,
  }
});

export default Input;