import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const AuthScreen = props => {
  const [signupMode, setSignupMode] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [emailValid, setEmailValid] = useState();
  const [passValid, setPassValid] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const dispatch = useDispatch();

  const inputChangeHandler = (id, value, validity) => {
    if (id === 'email') {
      setEmailValid(validity);
      setEmail(value);
    } else {
      setPassValid(validity);
      setPass(value);
    }
  };
  const switchModeHandler = () => {
    setSignupMode(mode => !mode);
    setEmailValid(false);
    setPassValid(false);
  };

  const submitHandler = async () => {
    if (!emailValid || !passValid) return;
    let action;
    if (signupMode) {
      action = authActions.signup(email, pass);
    } else {
      action = authActions.login(email, pass);
    }
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.replace('ItemsList');
    } catch (err) {
      console.log(err);
      Alert.alert('', err.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            key={signupMode ? 'signupEmail' : 'LoginEmail'}
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorMessage="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            key={signupMode ? 'signupPass' : 'loginPass'}
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            password
            autoCapitalize="none"
            errorMessage={
              signupMode
                ? 'Minimum eight characters, at least one letter and one number'
                : 'Please enter a valid password.'
            }
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={signupMode ? 'sign up' : 'log in'}
                color={signupMode ? '#3DB2FF' : Colors.primary}
                onPress={submitHandler}
              />
            )}
          </View>
        </ScrollView>
      </Card>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={switchModeHandler}>
          <Text style={styles.switch}>{`Switch to ${
            signupMode ? 'Login' : 'Sign Up'
          }`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffeded',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  switch: {
    color: '#696969',
    marginTop: 5,
  },
});

export default AuthScreen;
