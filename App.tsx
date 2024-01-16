import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/navigation/routes'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Routes/>
    </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})