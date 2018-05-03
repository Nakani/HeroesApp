import React, { Component } from 'react'
import { ScrollView, Image, Dimensions, Text,View } from 'react-native'
import {
  RkCard,
  RkText,
  RkStyleSheet
} from 'react-native-ui-kitten';

const SCREEN_WIDTH = Dimensions.get('screen').width

export default class Description extends Component {
    static navigationOptions = {
        title: 'Description'
    }



    render() {
        const { hero } = this.props.navigation.state.params
        return (
          <ScrollView style={styles.root}>
            <RkCard rkType='article'>
            <Image 
            source={{uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`}} 
            style={{width:SCREEN_WIDTH, height:SCREEN_WIDTH}}
            />

              <View rkCardContent>
              <Text style={{padding:10, fontSize:20, textAlign:'center'}}>{hero.name}</Text>
                <View>
                  <RkText rkType='primary3 bigLine'>
                    {hero.description}
                  </RkText>
                </View>
              </View>
              <View rkCardFooter>

              </View>
            </RkCard>
          </ScrollView>

        )
    }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  title: {
    marginBottom: 5
  },
}));