import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { data } from '../../utils/navMenu';
import { selectOrigin } from '../../slices/navSlice';

const NavOptions = () => {
  const { navigate } = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          onPress={() => navigate(item.screen)}
          disabled={!origin}
        >
          <View style={tw`${!origin && 'opacity-20'}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              type='antdesign'
              name='arrowright'
              color='#fff'
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
