import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { rideOptions } from '../../utils/navMenu';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../../slices/navSlice';

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const { navigate } = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigate('NavigateCard');
          }}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl py-5`}>
          Select a Ride - {travelInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={rideOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelected(item);
            }}
            style={tw`flex-row justify-between items-center px-10 ${
              item?.id === selected?.id && 'bg-gray-200'
            }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelInformation?.duration?.text} Travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(
                (travelInformation?.duration?.value *
                  SURGE_CHARGE_RATE *
                  item.multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
