import {useEffect} from 'react';
import RNFS from 'react-native-fs';
import a1Words from '../../assets/json/ua/a1.json';
import a2Words from '../../assets/json/ua/a2.json';
import b1Words from '../../assets/json/ua/b1.json';
import b2Words from '../../assets/json/ua/b2.json';

const Starter = () => {
  const pathToA1 = `${RNFS.DocumentDirectoryPath}/a1.json`;
  const pathToA2 = `${RNFS.DocumentDirectoryPath}/a2.json`;
  const pathToB1 = `${RNFS.DocumentDirectoryPath}/b1.json`;
  const pathToB2 = `${RNFS.DocumentDirectoryPath}/b2.json`;

  const copyFileToDocumentDirectory = async () => {
    const isCopiedA1 = await RNFS.exists(pathToA1);
    const isCopiedA2 = await RNFS.exists(pathToA2);
    const isCopiedB1 = await RNFS.exists(pathToB1);
    const isCopiedB2 = await RNFS.exists(pathToB2);

    if (!isCopiedA1) {
      await RNFS.writeFile(pathToA1, JSON.stringify(a1Words), 'utf8');
    }

    if (!isCopiedA2) {
      await RNFS.writeFile(pathToA2, JSON.stringify(a2Words), 'utf8');
    }

    if (!isCopiedB1) {
      await RNFS.writeFile(pathToB1, JSON.stringify(b1Words), 'utf8');
    }

    if (!isCopiedB2) {
      await RNFS.writeFile(pathToB2, JSON.stringify(b2Words), 'utf8');
    }
  };

  useEffect(() => {
    copyFileToDocumentDirectory();
  });

  return null;
};

export default Starter;
