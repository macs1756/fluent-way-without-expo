import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';

interface IWord {
  id: number;
  word: string;
  definition: string;
  progress: number;
}

interface IReadFilesJson {
  path: string;
  setState: React.Dispatch<React.SetStateAction<IWord[]>>;
}

export const readFilesJson = async ({path, setState}: IReadFilesJson) => {
  try {
    const data = await RNFS.readFile(path, 'utf8');
    const jsonData: IWord[] = JSON.parse(data);
    setState(jsonData);
  } catch (error) {
    console.error('Error reading file:', error);
    setState([]);
  }
};

export function getUniqueRandomNumbers<T>(
  sourceArray: T[],
  word: T,
  count: number,
): T[] {
  const filteredArray = sourceArray.filter(item => item !== word);

  const shuffledArray = filteredArray.sort(() => 0.5 - Math.random());

  return shuffledArray.slice(0, count);
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function playSucs() {
  try {
    const sound = new Sound(require('../../../assets/quiz-sucs.mp3'), error => {
      if (error) {
        console.error('Failed to load the sound', error);
        return;
      }

      sound.setVolume(0.8);

      sound.play(success => {
        if (!success) {
          console.log('Playback failed');
        }
        sound.release();
      });
    });
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

export const ttsInstance = async (word: string) => {
  if (word) {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.6);
    Tts.setDefaultPitch(1);

    const voices = await Tts.voices();

    const bestVoice = voices.reduce((prev, current) => {
      return prev.quality > current.quality ? prev : current;
    });

    if (bestVoice) {
      Tts.setDefaultVoice(bestVoice.id);
    }

    Tts.speak(word);
  }
};
