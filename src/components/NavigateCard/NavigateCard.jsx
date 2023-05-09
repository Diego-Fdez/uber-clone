import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { Icon } from '@rneui/themed';
import { setDestination } from '../../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from '../NavFavorites/NavFavorites';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center text-xl py-5`}>Good Morning, Diego</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            styles={toInputBoxStyles}
            returnKeyType={'search'}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            query={{
              key: MAPS_KEY,
              language: 'es',
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigate('RideOptionsCard');
            }}
          />
        </View>

        <NavFavorites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigate('RideOptionsCard')}
          style={tw`flex flex-row bg-black justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon name='car' type='font-awesome' color='#fff' size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name='fast-food-outline'
            type='ionicon'
            color='#222'
            size={16}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

export default NavigateCard;
