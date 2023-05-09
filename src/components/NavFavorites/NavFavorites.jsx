import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import tw from 'tailwind-react-native-classnames';
import { navFavorites } from '../../utils/navMenu';

const NavFavorites = () => {
  return (
    <FlatList
      data={navFavorites}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={item.icon}
            type='ionicon'
            color='#fff'
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;
