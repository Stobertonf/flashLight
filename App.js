import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle(old => !old);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => setToggle(old => !old)}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
  lightingOff: {
    tintColor: 'white',
    resizeMode: 'contain',
    width: 200,
    height: 200,
  },
});