import AuthContent from '../components/Auth/AuthContent';
import {useContext, useState} from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {login} from '../util/auth';
import {Alert} from 'react-native';
import {AuthContext} from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const logInHandler = async ({email, password}) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('error', 'failed to login');
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={' loggin in...'} />;
  }
  return <AuthContent isLogin onAuthenticate={logInHandler} />;
}

export default LoginScreen;
