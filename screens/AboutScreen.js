import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../assets/icons/abouticon.png')} style={styles.icon} />
            <Text style={styles.title}>About the Word of the Day App</Text>
            <Text style={styles.text}>
                Welcome to the Word of the Day app! This app is designed to help you learn a new word every day in the Blackfoot language. Each day, you will receive a new word, its phonetic pronunciation, and its translation into English. Additionally, you can view an image related to the word and listen to its pronunciation.
            </Text>
            <Text style={styles.text}>
                The app was created with the goal of promoting and preserving the Blackfoot language. We hope you enjoy using it and that it helps you in your language learning journey.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5dc',
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8b4513',
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: '#8b4513',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default AboutScreen;
