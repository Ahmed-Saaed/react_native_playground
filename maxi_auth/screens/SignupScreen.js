import {Alert} from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import {createUser} from '../util/auth';
import LoadingOverlay from './../components/ui/LoadingOverlay';
import {useContext} from 'react';
import AuthContextProvider from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContent);

  const signUpHandler = async ({email, password}) => {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('failed', "couldn't sign yo up");
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={'creating user...'} />;
  }

  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
