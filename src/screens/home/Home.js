import React from 'react'
import {
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';
import md5 from 'js-md5'

const PUBLIC_KEY = '8f3cfd5cc812cbf3b6dd9174a5ecacf5'
const PRIVATE_KEY = 'c1c11983ed302dcd48236af7c80ca7f30bac473a'

export default class Home extends React.PureComponent {
 static navigationOptions = {
    title: 'Home'
  };

  constructor(props) {
    super(props);

    this.state = {
      heroes: '',
      loaded: false,
      loading: false,
      offset: 0,
      limit: 10
    };

    this.renderItem = this._renderItem.bind(this);
  }

  async componentDidMount(){

    const timestamp = Number(new Date())
    const hash = md5.create()
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

    const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=${this.state.limit}&offset=${this.state.offset}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
    const responseJson = await response.json()
    this.setState({heroes: responseJson.data.results, loaded:true, offset: 0, limit: this.state.limit +10})

  }


  _keyExtractor(post, index) {

    return post.id;
  }

  _renderItem(info) {
    const image = info.item.thumbnail.path+'.'+info.item.thumbnail.extension
    return (
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        onPress={() => this.props.navigation.navigate('Description', {hero: info.item}) }>
        <RkCard rkType='backImg'>
          <Image rkCardImg source={{uri: image}}/>
          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText 
            rkType='header2 inverseColor'
            style={styles.headerCard}
            >
            {info.item.name}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    )
  }

  render() {
    let info = {};

   // info.item = this.data[0];
    return this.state.loaded ? (
      <FlatList data={this.state.heroes}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
                onEndReached={async () => {
                    const timestamp = Number(new Date())
                    const hash = md5.create()
                    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)
                    const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=${this.state.limit}&offset=${this.state.offset}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
                    const responseJson = await response.json();

                    this.setState({heroes: responseJson.data.results, offset: 0, limit: this.state.limit +10});
                }}
                style={styles.root}/>


    ): (
 
    <Text>
    Aguarde . . .
    </Text>

    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  headerCard:{
    color:'#fff',
    fontSize:20,
    fontWeight:'bold'
  },
  overlay: {
    justifyContent: 'flex-end',
  },
  footer: {
    width: 240
  }
}));