import React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

export const Home = () => {
  const {navigate} = useNavigation();
  return (
    <View>
      <Button title="Open Modal" onPress={() => navigate('modal')} />
    </View>
  );
};
