import 'intl';
import 'intl/locale-data/jsonp/en';
import './firebaseConfig';
import React, { useEffect } from 'react';
import AppNavigation from './AppNavigation';
import { Audio } from 'expo-av';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

async function scheduleDailyNotification() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        console.log('No notification permissions granted!');
        return;
    }

    await Notifications.cancelAllScheduledNotificationsAsync();
    const trigger = Platform.select({
        ios: {
            hour: 12,
            minute: 0,
            repeats: true,
        },
        android: {
            seconds: 43200,
            repeats: true,
        },
    });

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Word of the Day",
            body: "Check out your new word of the day!",
        },
        trigger,
    });
}

async function configureAudioSession() {
    try {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });
        console.log("Audio mode set successfully.");
    } catch (error) {
        console.error("Failed to set audio session category:", error);
    }
}

export default function App() {
    useEffect(() => {
        configureAudioSession();
        scheduleDailyNotification();

        return () => {
            Notifications.cancelAllScheduledNotificationsAsync();
        };
    }, []);

    return <AppNavigation />;
}
