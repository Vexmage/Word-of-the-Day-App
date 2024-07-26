import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/AboutScreen';
import { ModalProvider, useModal } from './screens/ModalContext';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const customTransitionSpec = {
    open: {
        animation: 'timing',
        config: {
            duration: 1200,
            easing: TransitionSpecs.FadeInFromBottomAndroidSpec.animation.easing,
        },
    },
    close: {
        animation: 'timing',
        config: {
            duration: 1200,
            easing: TransitionSpecs.FadeOutToBottomAndroidSpec.animation.easing,
        },
    },
};

const HomeStack = () => {
    const { toggleModal } = useModal();
    
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: customTransitionSpec,
            }}
        >
            <Stack.Screen
                name="Main"
                component={MainScreen}
            />
        </Stack.Navigator>
    );
};

const AboutStack = () => (
    <Stack.Navigator
        initialRouteName="AboutDetails"
        screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: customTransitionSpec,
        }}
    >
        <Stack.Screen
            name="AboutDetails"
            component={AboutScreen}
        />
    </Stack.Navigator>
);

const AppNavigation = () => {
    const { toggleModal } = useModal();

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={({ navigation }) => ({
                    headerShown: true,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#8B4513',
                    },
                    headerTintColor: '#F5F5DC',
                    headerLeft: () => (
                        <Ionicons
                            name="menu"
                            size={35}
                            color="#F5F5DC"
                            onPress={() => navigation.toggleDrawer()}
                            style={{ marginLeft: 15 }}
                        />
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={toggleModal}>
                            <Image
                                source={require('./assets/icons/calendaricon.png')}
                                style={{ width: 30, height: 30, marginRight: 15 }}
                            />
                        </TouchableOpacity>
                    ),
                    drawerStyle: {
                        width: 240,
                        backgroundColor: '#deb887',
                    },
                })}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        title: 'Home',
                        drawerIcon: () => (
                            <Image
                                source={require('./assets/icons/homeicon.png')}
                                style={{ width: 40, height: 40 }}
                            />
                        )
                    }}
                />
                <Drawer.Screen
                    name="About"
                    component={AboutStack}
                    options={{
                        title: 'About',
                        drawerIcon: () => (
                            <Image
                                source={require('./assets/icons/abouticon.png')}
                                style={{ width: 40, height: 40 }}
                            />
                        )
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <ModalProvider>
            <AppNavigation />
        </ModalProvider>
    );
}
