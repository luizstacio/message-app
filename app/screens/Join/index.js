import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Join = ({ onPressJoin }) => {
  const [user, setUser] = useState({
    username: null
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Input
        input={{
          autoCapitalize: 'none',
          onChangeText: (value) => setUser({ username: value }),
          value: user.username
        }}
        label={`Type your username`}
      />
      <Button
        label="JOIN"
        style={{ marginTop: 10 }}
        onPress={() => onPressJoin(user)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 90,
    justifyContent: 'center',
  },
  title: {
    fontSize: 34,
    color: '#333',
    marginBottom: 14
  },
});

export default Join;