import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddGoals from '../Component/AddGoals';
import CreateButton from '../Component/Button/CreateButton';
import Contribution from '../Component/Contribution';
import DropDown from '../Component/DropDown';
import Home from '../Component/Home';
import ShowList from '../Component/ShowList';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Addgoals" component={AddGoals} />
        <Stack.Screen name ="CreateButton" component={CreateButton} />
        <Stack.Screen name="contribution" component={Contribution} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}