import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {HomeScreen, LibraryScreen, SearchScreen} from '../screens';
import {COLORS, FONTSIZE, SPACING} from '../theme/theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.White,
        tabBarInactiveTintColor: COLORS.WhiteRGBA75,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          position: 'absolute',
          borderTopWidth: 0,
          opacity: 0.9,
          zIndex: 1001,
          height: 60,
        },
        tabBarItemStyle: {
          paddingVertical: SPACING.space_8, // Khoảng cách dọc giữa biểu tượng và văn bản
        },
        tabBarIconStyle: {
          marginBottom: -2, // Dịch chuyển biểu tượng lên một chút để canh chỉnh với văn bản
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: true,
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="home"
              size={FONTSIZE.size_24}
              color={focused ? COLORS.White : COLORS.WhiteRGBA75}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name="search"
              size={FONTSIZE.size_24}
              color={focused ? COLORS.White : COLORS.WhiteRGBA75}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarShowLabel: true,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="library-music"
              size={FONTSIZE.size_24}
              color={focused ? COLORS.White : COLORS.WhiteRGBA75}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
