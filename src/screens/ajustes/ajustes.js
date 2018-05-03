import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
export default class Home extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      sendPush: true,
      shouldRefresh: false,
      twitterEnabled: true,
      googleEnabled: false,
      facebookEnabled: true
    }

    this.logout = this.logout.bind(this);
  } 

  logout(){

    PhoneStorage.clearDataAsync();
    this.props.navigation.dispatch(
    NavigationActions.reset(
    {
      index: 0,
      actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
      ],
    }
    )
    );
  }

  render() {
  const { navigate } = this.props.navigation;
    return (

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>Configurações</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6' onPress={() => navigate('Home')} >Editar Perfil</RkText>
            </TouchableOpacity>
          </View>

        </View>


        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>Suporte</RkText>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Ajuda</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Politica de privacidade</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6'>Termos e condições</RkText>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.rowButton}>
              <RkText rkType='header6' onPress={() => navigate('Login')} >Sair</RkText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  container: {

  },
  header: {
    alignItems: 'center',
    height:(Platform.OS === 'ios') ? 20 : 50,
    paddingTop:(Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: 20,
    paddingVertical: 25
  },
  section: {
    marginVertical: 25
  },
  heading: {
    paddingBottom: 12.5
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center'
  },
  rowButton: {
    flex: 1,
    paddingVertical: 24
  },
  switch: {
    marginVertical: 14
  },
}));