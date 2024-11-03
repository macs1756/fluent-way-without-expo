import React from 'react';
import {Layout} from '../../layouts';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import {StyleSheet, View} from 'react-native';
import {NavigatorProps} from '../../../App';

function Flows({navigation}: NavigatorProps): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <Layout>
      <View style={styles.grid}>
        <Button
          text={t('quiz')}
          onClick={() => {
            navigation.navigate('Quiz');
          }}
        />
        <Button text={t('relativeBetweenWords')} onClick={() => {}} />
        <Button text={t('splitWordOnLetters')} onClick={() => {}} />
      </View>
    </Layout>
  );
}

export const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 25,
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
    height: 'auto',
  },
});

export default Flows;
