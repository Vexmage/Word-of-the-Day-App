import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Button, View, Platform } from 'react-native';
import { Audio } from 'expo-av';

const configureAudioSession = async () => {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });
        console.log('Audio mode set successfully.');
    } catch (error) {
        console.error('Failed to set audio session category:', error);
    }
};

const AudioPlayer = ({ uri }) => {
    const [sound, setSound] = useState(null);

    useEffect(() => {
        configureAudioSession();
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const playSound = async () => {
        console.log(`Loading Sound from URI on ${Platform.OS}:`, uri);
        try {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri });
            setSound(newSound);
            console.log(`Playing Sound on ${Platform.OS}`);
            await newSound.playAsync();
        } catch (error) {
            console.error(`Error loading or playing sound on ${Platform.OS}:`, error);
        }
    };
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={playSound}>
                <Image source={require('../assets/icons/audioicon.png')} style={styles.iconStyle} />
                <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    button: {
        backgroundColor: '#8B4513',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#F5F5DC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconStyle: {
        width: 50,
        height: 50,
    }
});

export default AudioPlayer;
