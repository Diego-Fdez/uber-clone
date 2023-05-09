import { View, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { Map, NavigateCard, RideOptionsCard } from '../../components';

const Stack = createNativeStackNavigator();

const MapScreen = () => {
  const { navigate } = useNavigation();

  return (
    <View style={tw`flex-1`}>
      <TouchableOpacity
        onPress={() => navigate('Home')}
        style={tw`absolute top-16 left-8 z-50 rounded-full shadow-lg`}
      >
        <Icon name='menu' />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
