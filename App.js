/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
  StatusBar,
  FlatList,
  Platform
} from 'react-native';
import {Header,SearchBar} from 'react-native-elements';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

// https://api.github.com/users/{user}
// https://api.github.com/users/{user}/repos


class App extends Component {

  constructor(props){
    super(props);
    this.state={
      searchstr:'',
      user:'',
      repos:[],
      message:''
    }
  }

  getUser=(user)=>{
    var url = `https://api.github.com/users/${user}`;
    this.setState({user:null,isLoading:true,message:''});
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.message){
        this.setState({message:"Username not found"})
      }else{
        this.setState({user:responseJson,isLoading:false});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  getRepos=(user)=>{
    var url = `https://api.github.com/users/${user}/repos`;
    //this.setState({isLoading:true,});
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.message){}else{
        this.setState({repos:responseJson});
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Header 
          statusBarProps={{translucent:true}}
          containerStyle={Platform.OS=='android'?{}:{}}
          centerComponent={{ text: 'GitHub User', style: { color: '#fff' } }}
          />
        <SearchBar placeholder={'Enter user name'} value={this.state.searchstr} platform={Platform.OS}
        onClear={()=>this.setState({user:null,repos:[]})}
        onChangeText={(text)=>this.setState({searchstr:text})} onSubmitEditing={()=>{this.getUser(this.state.searchstr);this.getRepos(this.state.searchstr)}} />

        {this.state.user?
        <View style={{flex:1,alignItems:'center'}}>
          <Image style={{height:150,width:150}} source={{uri:this.state.user.avatar_url}}/>
          <Text style={{fontSize:18,margin:8}}>{this.state.user.name}</Text>
          {this.state.repos.length>0?
            <View style={{flex:1,width:'100%'}}>
              <View style={{backgroundColor:'#ccc',padding:10}}>
                <Text style={{fontSize:17,color:'black'}}>Repositories</Text>
              </View>
              <FlatList data={this.state.repos} renderItem={({item})=>{
                return <View style={{paddingTop:10,paddingBottom:10,marginLeft:10,marginRight:10,borderBottomColor:'grey',borderBottomWidth:1}}>
                  <Text style={{fontSize:18,color:'black'}}>{item.name}</Text>
                  <Text>{item.name}</Text>
                </View>
              }}/>
            </View>
            :null}
        </View>
        :
        (this.state.message.length>0?<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text>{this.state.message}</Text>
        </View>:null)
        }

        {this.state.isLoading?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator />
          </View>
          :null}
        
      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
