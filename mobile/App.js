import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font'
import SignUpScreen from './screens/SignUp'
// import AppLoading from 'expo-app-loading'
// import Singup from './screens/SignUp';
import HomeScreen from './screens/Home';
import DoctorScreen from './screens/Doctors';
import SignInScreen from './screens/SignIn'
import ProfileScreen from  './screens/Profile';

const App = () => {
	const [isReady, setIsReady] = useState(false);

	const [loaded] = useFonts({
		NotoFont: require('./assets/fonts/NotoKufiArabic-Regular.ttf')
	})
	if (!loaded) {
		return null
	}
	const Stack = createStackNavigator()
	return (
		<NavigationContainer>
			<Stack.Navigator
				
				screenOptions={{
					headerStyle: {
						backgroundColor: '#007bff',
					},
					headerTintColor: '#fff',
					headerTitleContainerStyle: {
						width: "100%",
					},
					headerTitleStyle: {
						fontFamily: 'NotoFont',
					}
				}}
			>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Doctors'
					component={DoctorScreen}
					options={{ title: 'الأطباء' }}
				/>
				<Stack.Screen
					name='SignUp'
					component={SignUpScreen}
					options={{ title: 'حساب جديد' }}
				/>
				<Stack.Screen
					name='SignIn'
					component={SignInScreen}
					options={{ title: 'تسجيل الدخول' }}
				/>
				<Stack.Screen
					name='Profile'
					component={ProfileScreen}
					options={{ title: 'الملف الشخصي' }}
				/>

			</Stack.Navigator>
		</NavigationContainer>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});

export default App;