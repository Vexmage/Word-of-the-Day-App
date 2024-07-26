import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { DateTime } from 'luxon';

const useFetchWordData = (selectedDate) => {
    const [wordDetails, setWordDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const storedData = await AsyncStorage.getItem(selectedDate);
            if (storedData) {
                setWordDetails(JSON.parse(storedData));
                setLoading(false);
            } else {
                await fetchAndStoreData();
            }
        };

        const fetchAndStoreData = async () => {
            const db = getFirestore();
            const targetDate = DateTime.fromISO(selectedDate);
            const wordOfDayColRef = collection(db, 'Word_Of_The_Day_App');
            const q = query(wordOfDayColRef, where("Month_Num", "==", targetDate.month));
            const wordSnapshot = await getDocs(q);

            if (!wordSnapshot.empty) {
                const wordData = wordSnapshot.docs[targetDate.day - 1]?.data();
                if (wordData) {
                    const details = [
                        { label: 'Art', value: await saveFileLocally(wordData.App_Art, 'Image') },
                        { label: 'Daily Word', value: wordData.Day_Lang },
                        { label: 'Phonetic', value: wordData.Day_Phonetic },
                        { label: 'Translation', value: wordData.Day_English },
                        { label: 'Month Language', value: wordData.Month_Lang },
                        { label: 'Month Phonetic', value: wordData.Month_Phonetic },
                        { label: 'Audio', value: await saveFileLocally(wordData.App_Audio, 'Audio') },
                        { label: 'Month', value: wordData.Month_English },
                    ];
                    await AsyncStorage.setItem(selectedDate, JSON.stringify(details));
                    setWordDetails(details);
                } else {
                    setWordDetails([{ label: 'Data', value: 'No data for this day' }]);
                }
            } else {
                setWordDetails([{ label: 'Data', value: 'No data available' }]);
            }
            setLoading(false);
        };

        const saveFileLocally = async (fileName, type) => {
            const uri = `https://storage.googleapis.com/blackfootmedia/${type}/${fileName}`;
            const fileInfo = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + fileName);
            return fileInfo.uri;
        };

        fetchData();
    }, [selectedDate]);

    return [wordDetails, loading];
};

export default useFetchWordData;
