import { ChakraProvider } from '@chakra-ui/react';
import { InboxScreen } from './InboxScreen';
import { LoginScreen } from './LoginScreen';
import { theme } from './theme';
import { useAuth } from './useAuth';
import React from "react";

const ErrorPane = () => <div data-testid="errorPane">로그인 에러!</div>

function App() {
  const [user, logIn] = useAuth();

  return (
    <ChakraProvider theme={theme}>
      {user?.token ? <InboxScreen /> : <LoginScreen user={user} onLogIn={logIn} />}
      {!user?.token && <ErrorPane />}
    </ChakraProvider>
  );
}

export default App;
