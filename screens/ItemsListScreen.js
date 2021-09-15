import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Screen from '../components/UI/Screen';
import {logout} from '../store/actions/auth';
import Item from '../components/Item';
import * as itemsActions from '../store/actions/items';
import Colors from '../constants/Colors';

const ItemsListScreen = props => {
  const dispatch = useDispatch();

  const items = useSelector(state => state.items.items);

  const itemsLength = Object.keys(items).length;

  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [searchText, setSearchText] = useState();

  const logoutHandler = () => {
    dispatch(logout());
    props.navigation.navigate('Auth');
  };

  const {navigation} = props;

  const loadItems = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(itemsActions.fetchItems());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  const createHandler = () => {
    setSearchText(null);
    navigation.navigate('NewItem');
  };

  const searchFilter = async text => {
    setSearchText(text);
    setIsLoading(true);
    let newItems = [];
    Object.keys(items).forEach(key => {
      if (items[key].title.toUpperCase().indexOf(text.toUpperCase()) > -1) {
        newItems.push({...items[key], uid: key});
      }
    });

    await setFilteredItems(newItems);

    setIsLoading(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'All Items',
      headerRight: () => (
        <View style={styles.navActions}>
          <TouchableOpacity onPress={createHandler}>
            <Text style={styles.create}>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logoutHandler}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (items) {
      const itemsArray = Object.keys(items).map(key => {
        return {...items[key], uid: key};
      });
      setFilteredItems(itemsArray);
    }
  }, [itemsLength]);

  return (
    <Screen>
      <TextInput
        style={styles.input}
        onChangeText={searchFilter}
        placeholder="search here"
        value={searchText}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          initialNumToRender={5}
          renderItem={({item, index}) => (
            <Item
              uid={item.uid}
              index={index + 1}
              title={item.title}
              isChecked={item.isChecked}
            />
          )}
          keyExtractor={item => item.uid}
          data={filteredItems}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  navActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logout: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  error: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  create: {
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});

export default ItemsListScreen;
