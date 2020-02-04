import React, { useState, useEffect } from 'react';
import joinUrl from 'url-join';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import NewMessage from './NewMessage';
import moment from 'moment';
import _get from 'lodash/get';
import { Feather } from '@expo/vector-icons';
import config from '../../config';

const Join = ({ user, onPressJoin }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [state, setState] = useState({
    newMessage: false,
    messages: [],
    message: null
  });
  const requestMessages = () => {
    setRefreshing(true);
    fetch(joinUrl(config.api, 'messages'), {
      headers: {
        'x-user': user.username
      }
    })
    .then(r => r.json())
    .then(messages => {
      setRefreshing(false);
      setState({ messages });
    })
    .catch(err => setRefreshing(false));
  }

  const onRefresh = React.useCallback(() => {
    requestMessages();
  }, [refreshing]);

  useEffect(() => {
    requestMessages();
  }, []);

  const onPressMessage = message => () => {
    fetch(joinUrl(config.api, 'messages', message.id, 'check'), {
      method: 'PUT',
      headers: {
        'x-user': user.username
      }
    });
    message.check = true;
    setState({
      ...state,
      message: (message.id === _get(state, 'message.id')) ? null : message
    })
  }

  return (
    <View
      style={styles.container}>
      <View
        style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        {state.newMessage ? (
          <TouchableOpacity
            onPress={() => {
              setState({ ...state, newMessage: false })
            }}>
            <Feather style={styles.new} name='x' />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
                setState({ ...state,  newMessage: true })
            }}>
            <Feather style={styles.new} name='plus' />
          </TouchableOpacity>
        )}
      </View>
      {state.newMessage ? (
        <NewMessage
          user={user}
          onClose={() => setState({ ...state, newMessage: false })}
        />
      ) : (
        <FlatList
          style={{
            width: '100%',
            flex: 1
          }}
          refreshControl={
            <RefreshControl
                tintColor="#FFFFFF"
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
          }
          data={state.messages}
          renderItem={({ item }) => (
            <View
              style={styles.card}>
              <TouchableOpacity
                onPress={onPressMessage(item)}>
                <View
                  style={styles.message}>
                  <Text
                    numberOfLines={1}
                    style={[styles.subject, item.check ? styles.check : null]}>{item.subject}</Text>
                  <Text style={styles.time}>{moment(item.timestamp).startOf('seconds').fromNow()}</Text>
                </View>
                <Text style={styles.from}>{item.from}</Text>
              </TouchableOpacity>
                {item.id === _get(state, 'message.id') ? (
                  <ScrollView style={styles.detail}>
                    <Text style={styles.detailTitle}>{item.subject}</Text>
                    <Text>{item.detail}</Text>
                  </ScrollView>
                ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#1b55e2',
    paddingTop: 90
  },
  title: {
    fontSize: 34,
    color: '#FFFFFF',
    marginHorizontal: 10,
    marginBottom: 14
  },
  new: {
    fontSize: 34,
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    color: '#FFFFFF'
  },
  card: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10
  },
  time: {
    color: '#999'
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  from: {
    color: '#333',
    fontSize: 14,
    textTransform: 'capitalize'
  },
  check: {
    color: '#333',
    fontWeight: 'normal'
  },
  subject: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  detailTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    textTransform: 'capitalize',
    marginBottom: 8
  },
  detail: {
    marginTop: 10,
    fontSize: 16,
    maxHeight: 300
  }
});




export default Join;