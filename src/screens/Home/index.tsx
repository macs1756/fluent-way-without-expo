import React from 'react';
import {Layout} from '../../layouts';
import {useTranslation} from 'react-i18next';
import Button from '../../components/Button';
import {BackHandler, StyleSheet, View} from 'react-native';
import {NavigatorProps} from '../../../App';

function Home({navigation}: NavigatorProps): React.JSX.Element {
  const {t} = useTranslation();

  return (
    <Layout>
      <View style={styles.grid}>
        <Button
          text={t('rootMenuLink1')}
          onClick={() => {
            navigation.navigate('Flows');
          }}
        />
        <Button text={t('rootMenuLink2')} onClick={() => {}} />
        <Button text={t('rootMenuLink3')} onClick={() => {}} />
        <Button
          text={t('rootMenuLink4')}
          onClick={() => {
            BackHandler.exitApp();
          }}
        />
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

export default Home;
