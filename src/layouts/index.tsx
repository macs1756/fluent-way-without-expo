import React, {ReactNode} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {coreStyles} from '../styles';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18n';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={coreStyles.container}>{children}</View>
        </ScrollView>
      </SafeAreaView>
    </I18nextProvider>
  );
};
