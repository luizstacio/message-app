import React, { useState, useEffect } from 'react';
import joinUrl from 'url-join';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import config from '../../config';

const NewMessage = ({ user, onClose }) => {
  const [newMessage, setNewMessage] = useState({});

  const onSendMessage = () => {
    onClose();
    fetch(joinUrl(config.api, 'messages'), {
      method: 'POST',
      headers: {
        'x-user': user.username,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
    });
    setNewMessage({});
  }

  return (
    <ScrollView
      style={styles.newMessage}>
      <Input
        style={styles.newMessageInput}
        input={{
          autoCapitalize: 'none',
          onChangeText: (to) => setNewMessage({
            ...newMessage, to
          }),
          value: newMessage.to
        }}
        label={`To`}
      />
      <Input
        style={styles.newMessageInput}
        input={{
          autoCapitalize: 'none',
          onChangeText: (subject) => setNewMessage({
            ...newMessage, subject
          }),
          value: newMessage.subject
        }}
        label={`Subject`}
      />
      <Input
        style={styles.newMessageInput}
        input={{
          autoCapitalize: 'none',
          onChangeText: (detail) => setNewMessage({
              ...newMessage, detail
          }),
          value: newMessage.detail
        }}
        label={`Detail`}
      />
      <Button
        label="SEND"
        style={{ marginTop: 10 }}
        onPress={onSendMessage}
      />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  newMessage: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    width: '100%',
    padding: 10,
    paddingTop: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 4
  },
  newMessageTitle: {
    color: '#333'
  },
  newMessageInput: {
    marginBottom: 8
  }
});

export default NewMessage;