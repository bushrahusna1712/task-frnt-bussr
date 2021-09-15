import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Card from '../components/UI/Card';
import Screen from '../components/UI/Screen';
import Colors from '../constants/Colors';
import * as itemsActions from '../store/actions/items';
import {useDispatch} from 'react-redux';

const NewItemScreen = props => {
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [title, setTitle] = useState();
  const [isLoading, setIsLoading] = useState();

  const {navigation} = props;

  const dispatch = useDispatch();

  const checkBoxHandler = () => {
    setCheckBoxValue(value => !value);
  };

  const titleHandler = value => {
    setTitle(value);
  };

  const submitHandler = async () => {
    if (!title) {
      Alert.alert('Please enter the title');
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(itemsActions.createItem(title, checkBoxValue));
      setIsLoading(false);
      navigation.goBack();
    } catch (err) {
      setIsLoading(false);
      Alert.alert(err.message);
    }
  };

  return (
    <Screen style={styles.screen}>
      <Card style={styles.itemContainer}>
        <View>
          <Text style={styles.title}>Title</Text>
          <TextInput
            style={styles.input}
            autoFocus
            onChangeText={titleHandler}
          />
        </View>
        <CheckBox
          value={checkBoxValue}
          onValueChange={checkBoxHandler}
          tintColors={{true: Colors.primary, false: Colors.primary}}
        />
      </Card>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <Button color={Colors.primary} title="Create" onPress={submitHandler} />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewItemScreen;
