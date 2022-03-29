import React from 'react';
import { SafeAreaView } from 'react-native';
import Login from './screens/login';

const App = () => {
  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
      }}>
      <Login />
    </SafeAreaView>
  );
};

export default App;
