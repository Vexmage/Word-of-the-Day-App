import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image source={require('../assets/icons/appicon.png')} style={styles.appIcon} />
                <Text style={styles.appName}>Word of the Day</Text>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8b4513',
        marginBottom: 20,
    },
    appIcon: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    appName: {
        fontSize: 24,
        color: '#f5f5dc',
    },
});

export default CustomDrawerContent;
