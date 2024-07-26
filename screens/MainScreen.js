import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Alert, ActivityIndicator, Image, Dimensions, Modal, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DateTime } from 'luxon';
import AudioPlayer from '../components/AudioPlayer';
import useFetchWordData from '../components/FetchWordData';
import { useModal } from '../components/ModalContext';
import useOrientation from '../components/useOrientation';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
    const orientation = useOrientation();
    const styles = getStyles(orientation);
    const { isModalVisible, toggleModal } = useModal();
    const [selectedDate, setSelectedDate] = useState(DateTime.now().toISODate());
    const [wordDetails, loading] = useFetchWordData(selectedDate);
    const [showLoading, setShowLoading] = useState(true);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [audioUri, setAudioUri] = useState(null);
    const [monthDetails, setMonthDetails] = useState({ language: '', name: '', phonetic: '', translation: '' });
    const dailyWordDetail = wordDetails?.find(detail => detail.label === 'Daily Word');
    const translationDetail = wordDetails?.find(detail => detail.label === 'Translation');

    useEffect(() => {
        if (!loading) {
            setTimeout(() => setShowLoading(false), 1000);
            const artDetail = wordDetails.find(detail => detail.label === 'Art');
            if (artDetail) {
                setBackgroundImage(artDetail.value);
            }

            const monthLanguageDetail = wordDetails.find(detail => detail.label === 'Month Language');
            const monthNameDetail = wordDetails.find(detail => detail.label === 'Month');
            const monthPhoneticDetail = wordDetails.find(detail => detail.label === 'Month Phonetic');
            const monthTranslationDetail = wordDetails.find(detail => detail.label === 'Month');
            const audioDetail = wordDetails.find(detail => detail.label === 'Audio');

            setMonthDetails({
                language: monthLanguageDetail ? monthLanguageDetail.value : '',
                name: monthNameDetail ? monthNameDetail.value : '',
                phonetic: monthPhoneticDetail ? monthPhoneticDetail.value : '',
                translation: monthTranslationDetail ? monthTranslationDetail.value : '',
            });

            if (audioDetail) {
                setAudioUri(audioDetail.value);
            }
        }
    }, [loading, wordDetails]);

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        toggleModal();
    };

    if (showLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading data...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {backgroundImage && (
                <ImageBackground
                    source={{ uri: backgroundImage }}
                    style={styles.backgroundImage}
                    imageStyle={styles.backgroundImageStyle}
                >
                    <View style={styles.overlay}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={orientation === 'portrait' ? styles.portraitContent : styles.landscapeContent}>
                                <View style={styles.contentContainer}>
                                    {dailyWordDetail &&
                                                                />
                                                                </View>
                                                                <Button title="Close" onPress={toggleModal} color="#8b4513" />
                                                            </View>
                                                        </View>
                                                    </Modal>
                                                </View>
                                            );
                                        };
                                        
                                        const getStyles = (orientation) => StyleSheet.create({
                                            container: {
                                                flex: 1,
                                                backgroundColor: '#f5f5dc',
                                            },
                                            loadingContainer: {
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#f5f5dc',
                                            },
                                            loadingText: {
                                                marginTop: 10,
                                                fontSize: 18,
                                                color: '#8b4513',
                                            },
                                            backgroundImage: {
                                                flex: 1,
                                                resizeMode: 'cover',
                                            },
                                            backgroundImageStyle: {
                                                opacity: 0.7,
                                            },
                                            overlay: {
                                                flex: 1,
                                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                                justifyContent: 'center',
                                            },
                                            scrollViewContent: {
                                                flexGrow: 1,
                                            },
                                            portraitContent: {
                                                flex: 1,
                                                justifyContent: 'center',
                                                paddingHorizontal: 20,
                                            },
                                            landscapeContent: {
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                paddingHorizontal: 20,
                                            },
                                            contentContainer: {
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                borderRadius: 10,
                                                padding: 20,
                                                marginBottom: 20,
                                            },
                                            dailyWordSection: {
                                                marginBottom: 20,
                                            },
                                            monthSection: {
                                                marginBottom: 20,
                                            },
                                            row: {
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginBottom: 10,
                                            },
                                            label: {
                                                fontSize: 18,
                                                color: '#8b4513',
                                                fontWeight: 'bold',
                                            },
                                            value: {
                                                fontSize: 18,
                                                color: '#8b4513',
                                            },
                                            sectionTitle: {
                                                fontSize: 20,
                                                color: '#8b4513',
                                                fontWeight: 'bold',
                                                marginBottom: 10,
                                            },
                                            monthLanguageText: {
                                                fontSize: 18,
                                                color: '#8b4513',
                                            },
                                            translationText: {
                                                fontSize: 16,
                                                color: '#8b4513',
                                            },
                                            iconStyle: {
                                                width: 30,
                                                height: 30,
                                                marginRight: 10,
                                            },
                                            portraitButtonContainer: {
                                                alignItems: 'center',
                                            },
                                            landscapeButtonContainer: {
                                                justifyContent: 'space-around',
                                                width: '30%',
                                            },
                                            iconButton: {
                                                marginBottom: 10,
                                            },
                                            buttonIcon: {
                                                width: 50,
                                                height: 50,
                                            },
                                            modalOverlay: {
                                                flex: 1,
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            },
                                            modalContent: {
                                                width: '80%',
                                                backgroundColor: '#f5f5dc',
                                                borderRadius: 10,
                                                padding: 20,
                                                alignItems: 'center',
                                            },
                                        });
                                        
                                        export default MainScreen;
                                        