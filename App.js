import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Datastore from 'react-native-local-mongodb';
const dbOptions = {filename: 'stefsApp', autoload: false,timestampData:true,}
const db= new Datastore(dbOptions);

export default class App extends React.Component {
  state = {
    name: ''
  }
  componentDidMount(){
    this.loadDb();
  }
  loadDb = async ()=>{
    await db.loadDatabase();
  }

  insert = () =>{
    db.insert([{ music: 'jazz', name:'miles' }, { music: 'opera', name: 'georgio' },{music: 'rave', name: 'stefan'}], function (err, newDocs) {
        console.warn('inserted')
    }); 
  }
  find = () =>{
    const {setName} = this;
    db.find({music:'jazz'}, function(err,docs){
      const name = docs;
      setName(name);
    })
  }
  setName = name =>{
    console.warn(name)
    // this.setState({
    //   name,
    // });
  }
  render() {
    
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 40}}>{this.state.name}</Text>
        <TouchableOpacity style={{marginBottom: 50}}>
          <Text onPress={this.insert}>insert</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={this.find}>find</Text>
        </TouchableOpacity>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
