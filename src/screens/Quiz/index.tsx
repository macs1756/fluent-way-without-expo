import React, {useEffect, useState} from 'react';
import {Layout} from '../../layouts';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, Vibration, View} from 'react-native';
import RNFS from 'react-native-fs';
import {
  getUniqueRandomNumbers,
  playSucs,
  readFilesJson,
  shuffleArray,
  ttsInstance,
} from '../../utils/fn';
import Button from '../../components/Button';

interface IWord {
  id: number;
  word: string;
  definition: string;
  progress: number;
}

function Quiz(): React.JSX.Element {
  const [fileContent, setFileContent] = useState<IWord[]>([]);
  const [quizContent, setQuizContent] = useState<any>(null);

  const {t} = useTranslation();
 
  const clickOnAnswers = async (isCorrect: boolean) => {
    if (isCorrect) {
      await playSucs();
      setTimeout(() => {
        setQuizContent(renderQuiz());
      }, 400);
    } else {
      Vibration.vibrate(400);
    }
  };

  const renderQuiz = () => {
    if (fileContent && Array.isArray(fileContent)) {
      const randomIndex = Math.floor(Math.random() * fileContent.length);
      const randomWord = fileContent[randomIndex];

      const uniqueRandomNumbers = getUniqueRandomNumbers(
        fileContent,
        randomWord,
        5,
      );
      let answers = uniqueRandomNumbers.map(e => ({...e, isCorrect: false}));
      answers = [...answers, {...randomWord, isCorrect: true}];
      answers = shuffleArray(answers);

      if (randomWord?.word) {
        ttsInstance(randomWord?.word);
      }

      return (
        <View style={[styles.grid]}>
          <View>
            <Text style={styles.h1}>
              {randomWord?.word
                ? randomWord.word.charAt(0).toUpperCase() +
                  randomWord.word.slice(1).toLowerCase()
                : ''}
            </Text>
            <Text style={styles.wordsCount}>{t('weLearnCountWord')}</Text>
            <Text style={styles.wordsCount}>
              {(fileContent.length ?? 0) + t('words')}
            </Text>
          </View>
          {answers.map(answer => (
            <View key={answer.id}>
              <Button
                text={answer.definition ?? ''}
                onClick={() => {
                  clickOnAnswers(answer.isCorrect);
                }}
              />
            </View>
          ))}
        </View>
      );
    } else {
      return <Text>Файл не містить даних або його не знайдено</Text>;
    }
  };

  useEffect(() => {
    readFilesJson({
      path: `${RNFS.DocumentDirectoryPath}/a2.json`,
      setState: setFileContent,
    });
  }, []);

  useEffect(() => {
    setQuizContent(renderQuiz());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileContent]);

  return (
    <Layout>
      <View style={[styles.wFull]}>{quizContent}</View>
    </Layout>
  );
}

export const styles = StyleSheet.create({
  wFull: {
    width: '100%',
  },
  grid: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 25,
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  h1: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B4B4B',
    letterSpacing: 2,
  },
  wordsCount: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
  },
});

export default Quiz;
