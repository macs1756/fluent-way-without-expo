// @ts-nocheck
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import RNFS from 'react-native-fs';
import {
  initializeTts,
  playSucs,
  readFilesJson,
  shuffleArray,
  ttsInstance,
} from '../../utils/fn';

const WorldCombinations = () => {
  const [fileContent, setFileContent] = useState(null);
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [selectedDefinitions, setSelectedDefinitions] = useState(null);
  const [finishedFlows, setFinishedFlows] = useState([]);

  const getRandomElements = (array, count) => {
    if (count > array.length) {
      throw new Error('Count exceeds array length.');
    }

    const shuffledArray = [...array].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  const randomElementsWords = useMemo(() => {
    if (fileContent) {
      const res = getRandomElements(fileContent, 6);

      if (res) {
        return {
          words: res.map(item => item),
          definitions: shuffleArray(res.map(item => item)),
        };
      }

      return {
        words: null,
        definitions: null,
      };
    }
    return [];
  }, [fileContent]);

  useEffect(() => {
      readFilesJson({
        path: `${RNFS.DocumentDirectoryPath}/a2.json`,
        setState: setFileContent,
      });
  }, []);

  useEffect(() => {
    if (finishedFlows.length === 6) {
      readFilesJson({
        path: `${RNFS.DocumentDirectoryPath}/a2.json`,
        setState: setFileContent,
      });
      setFinishedFlows([]);
    }
  }, [finishedFlows]);

  useEffect(() => {
    if (selectedWorld && selectedDefinitions) {
      if (selectedWorld.id === selectedDefinitions.id) {
        playSucs();
        setSelectedWorld(null);
        setSelectedDefinitions(null);
        setFinishedFlows(prev => [...prev, selectedWorld.id]);
      } else {
        setSelectedWorld(null);
        setSelectedDefinitions(null);
        Vibration.vibrate(400);
      }
    }
  }, [selectedWorld, selectedDefinitions]);

  useEffect(() => {
    selectedWorld && ttsInstance(selectedWorld.word);
  }, [selectedWorld]);

  return (
    <View style={styles.container}>
      <View style={styles.half}>
        {randomElementsWords?.words?.map(word => {
          const isSelected = selectedWorld?.word === word.word;
          const isFinished = finishedFlows.includes(word.id);

          return (
            <TouchableOpacity
              key={word.id}
              style={[
                styles.button,
                {
                  backgroundColor: isSelected ? 'green' : 'rgb(33, 150, 243)',
                  display: isFinished ? 'none' : 'flex',
                },
              ]}
              onPress={() => setSelectedWorld(word)}>
              <Text style={styles.buttonText}>{word.word}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.half}>
        {randomElementsWords.definitions &&
          randomElementsWords.definitions.map(word => (
            <TouchableOpacity
              key={word.id}
              style={[
                styles.button,
                {
                  backgroundColor:
                    selectedDefinitions?.definition === word.definition
                      ? 'green'
                      : 'rgb(33, 150, 243)',
                  display: finishedFlows.includes(word.id) ? 'none' : 'flex',
                },
              ]}
              onPress={() => {
                setSelectedDefinitions(word);
              }}>
              <Text style={styles.buttonText}>{word.definition}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 6,
    width: '100%',
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default WorldCombinations;
