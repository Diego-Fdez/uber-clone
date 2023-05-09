import { View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { NavFavorites, NavOptions } from '../../components';
import { setDestination, setOrigin } from '../../slices/navSlice';

const Home = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white flex-1 h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          placeholder='Where From?'
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          minLength={2}
          enablePoweredByContainer={false}
          query={{
            key: MAPS_KEY,
            language: 'es',
          }}
        />
        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
};

export default Home;
