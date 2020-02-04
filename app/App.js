import React, { useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Join from './screens/Join';
import Messages from './screens/Messages';

export default function App() {
  const [state, setState] = useState({
    user: null
  });

  return (
    <View style={styles.container}>
      {!state.user ? (
        <Join
          onPressJoin={(user) => {
            setState({ user });
          }}
        />
      ) : (
        <Messages
          user={state.user}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});
