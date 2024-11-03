import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');

export const coreStyles = StyleSheet.create({
  container: {
    height: height * 0.886,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    backgroundColor: 'rgb(0, 149, 255)',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'semibold',
    fontSize: 14,
    letterSpacing: 2,
    textAlign: 'center',
  },
});
