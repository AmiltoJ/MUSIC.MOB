import { StatusBar } from 'expo-status-bar';
import { ScrollView, SliderBase, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av'
import { useState } from 'react';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player';

export default function App() {
  const [audio, setarAudio] = useState(null);
  const [audioIndex, setarAudioIndex] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [musicas, setarMusicas] = useState([
  

{
    name: 'Payphone',
    Artista: 'Marron 5',
    playing:false,
    file: require ('./assets/musicas/Payfone.mp3')
},

{
  name: 'Isso Vale Minha Vida',
  Artista: 'Sid',
  playing:false,
  file: require ( './assets/musicas/Vale a vida.mp3')
},

{
  name: 'Relembrando Fodas',
  Artista: 'Leno Brega',
  playing:false,
  file: require ( './assets/musicas/Relembrando Fodas.mp3')
}])

const changeMusic = async (id) =>{
  let currentFileMusic = null

  let newMusicas= musicas.filter((val, index)=>{
   if(id == index){
     musicas[index].playing = true
     currentFileMusic = musicas[index].file
     setPlaying(true)
     setarAudioIndex(id)
     
   }else{
      musicas[index].playing = false
   }
    return musicas[index]
  })

  if(audio != null){
     audio.unloadAsync()
  }

  const currentAudio = new Audio.Sound()
  try{

   await currentAudio.loadAsync(currentFileMusic)
   await currentAudio.playAsync()

  } catch(error) {}

  setarAudio(currentAudio)
  setarMusicas(newMusicas)
}
  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <Text style={{textAlign:'center', color:'whiter'}}>App Música | Amilto</Text>
      </View>

      <View style={styles.table}>
        <Text style={{width:'50%', color:'rgb(200, 200, 200)'}}>Música</Text>
        <Text style={{width:'50%', color:'rgb(200, 200, 200)'}}>Artista</Text>
      </View>

  {
musicas.map((val,k)=>{
    if(val.playing){
      return(
        <View style={styles.table}>
        <TouchableOpacity onPress={() => changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
        <Text style={styles.tableTextSelected}><AntDesign name="play" size={15}
        color="#1DB954"/>{val.name}</Text>
        <Text style={styles.tableTextSelected}>{val.Artista}</Text>
          </TouchableOpacity>
            </View>
  );
}else{
  return(
    <View style={styles.table}>
    <TouchableOpacity onPress={() => changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
    <Text style={styles.tableTextSelected}>
      <AntDesign name="play" size={15} color="white"/>
      {val.name}
    </Text>
        <Text style={styles.tableTextSelected}>{val.Artista}</Text>
     </TouchableOpacity>  
    </View>
  );
}
})
  }<View style={{paddingBottom:200}}></View>
    </ScrollView>
    <Player playing={playing} setPlaying={setPlaying} setarAudioIndex={setarAudioIndex} audioIndex={audioIndex} 
    musicas={musicas} setarMusicas={setarMusicas} audio={audio} setarAudio={setarAudio}>
  
   </Player></View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
header:{
  backgroundColor:"#1DB954",
  width:'100%',
  padding:20
},
table:{
  flexDirection:'row',
  padding:20,
  borderBottomColor:'white',
  borderBottomWidth:1
},
tableTextSelected:{
  width:'50%',
  color:'white'
}
});
