import {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../store/auth-context';

function WelcomeScreen() {
  const [fecthedMessage, setFetchedMessage] = useState();

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //TODO remember to add your own api url in the auth file

  useEffect(() => {
    axios
      .get(
        'https://expenses-9d5b9-default-rtdb.firebaseio.com/message.json?auth=' +
          token
      )
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
