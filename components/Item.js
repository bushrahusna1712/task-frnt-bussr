import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Colors from '../constants/Colors';
import Card from './UI/Card';
import * as itemActions from '../store/actions/items';
import {useDispatch} from 'react-redux';

const Item = props => {
  const {isChecked} = props;

  const dispatch = useDispatch();

  const [checkBoxValue, setCheckBoxValue] = useState();
  const [isLoading, setIsLoading] = useState();

  const checkBoxChangeHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(
        itemActions.updateItem(props.uid, props.title, !checkBoxValue),
      );
      setCheckBoxValue(value => !value);
    } catch (err) {
      Alert.alert(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isChecked === true || isChecked === false) {
      setCheckBoxValue(isChecked);
    }
  }, [isChecked]);

  return (
    <TouchableOpacity onPress={checkBoxChangeHandler}>
      <Card style={styles.itemContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <CheckBox
            style={styles.checkBox}
            value={checkBoxValue}
            onValueChange={checkBoxChangeHandler}
            tintColors={{true: Colors.primary, false: Colors.primary}}
            disabled
          />
        )}
        <Text style={styles.title}>{`${props.index}. ${props.title}`}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    marginVertical: 5,
  },
  checkBox: {
    color: 'red',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Item;
