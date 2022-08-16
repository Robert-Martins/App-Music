import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';
import Player from './Player.js';
import { useFonts, Lusitana_400Regular, Lusitana_700Bold } from '@expo-google-fonts/lusitana';

export default function App() {

  LogBox.ignoreAllLogs(true);

  useFonts({
    Lusitana_400Regular,
    Lusitana_700Bold,
  });

  const [audioIndex, setAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [musics, setMusics] = useState([

    {
      name:'Oceans',
      artist:'Seafret',
      playing: false,
      file: require('./assets/oceans-seafret.mp3'),
    },
    {
      name:'The Mighty Fall',
      artist:'Fall Out Boy',
      playing: false,
      file:require('./assets/the_mighty_fall.mp3'),
    },
    {
      name:'The One',
      artist:'Deuce',
      playing:false,
      file: require('./assets/the_one-deuce.mp3'),
    },
    {
      name:'Set Me Off',
      artist:'Papa Roach',
      playing:false,
      file: require('./assets/set_me_off-papa-roach.mp3'),
    }

  ]);

  const changeMusic = async (id) => 
  {
    let curFile = null;
    let newMusics = musics.filter((val,k)=>{
      if(id == k)
      {
        musics[k].playing = true;
        curFile = musics[k].file;

        setPlaying(true);
        setAudioIndex(id);
      }
      else
      {
        musics[k].playing = false;
      }
      return musics[k];
    })

    if(audio!=null)
    {
      audio.unloadAsync();
    }

    let curAudio = new Audio.Sound();

    try{
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();

    }catch(error){

    }
    setAudio(curAudio);
    setMusics(newMusics);
  }

  return (
    <View style = {{flex:1}}>
      <ScrollView style = {styles.container}>
        <StatusBar hidden/>
        <View style = {styles.header}>
          <Text style = {styles.textHeader}>App Música</Text>
        </View>

        <View style = {styles.table}>
          <Text style = {styles.musicInfo}>Music</Text>
          <Text style = {styles.artistInfo}>Artist</Text>
        </View>

        {
          musics.map(function(val, k){
            if(val.playing)
            {
              //Renderiza algo aqui
              return(
                <View style = {styles.tableNowPlaying}>
                  <TouchableOpacity onPress={()=> changeMusic(k)} style = {styles.musicBtn}>
                    <Text style={styles.musicInfoPlaying}><AntDesign name="play" size={15} color="#ff6a00" /> {val.name}</Text>
                    <Text style={styles.artistInfoPlaying}>{val.artist}</Text>
                  </TouchableOpacity>
                </View>
              );
            }
            else
            {
              return(
                <View style = {styles.table}>
                  <TouchableOpacity onPress={()=> changeMusic(k)} style = {styles.musicBtn}>
                    <Text style={styles.musicInfo}><AntDesign name="play" size={15} color="white" /> {val.name}</Text>
                    <Text style={styles.artistInfo}>{val.artist}</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })
        }

      </ScrollView>

      <Player playing={playing} setPlaying={setPlaying} audioIndex={audioIndex} setAudioIndex={setAudioIndex} musics={musics} setMusics={setMusics} audio={audio} setAudio={setAudio}></Player>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header:
  {
    backgroundColor: 'black',
    width: '100%',
    padding: 20
  },
  textHeader:
  {
    color: '#ff6a00',
    fontSize: 30,
    textAlign: 'center',
    //fontFamily: 'Lusitana_400Regular'
  },
  table:
  {
    flexDirection: 'row',
    borderBottomColor: 'rgb(18, 18, 18)',
    borderBottomWidth: 1,
    padding:20
  },
  musicInfo:
  {
    width: '50%',
    color: 'white'
  },
  artistInfo:
  {
    width: '50%',
    color: 'white'
  },
  musicBtn:
  {
    width: '100%',
    flexDirection: 'row'
  },
  tableNowPlaying:
  {
    flexDirection: 'row',
    borderColor: '#ff6a00',
    borderWidth: 1,
    padding:20
  },
  musicInfoPlaying:
  {
    width: '50%',
    color: '#ff6a00'
  },
  artistInfoPlaying:
  {
    width: '50%',
    color: '#ff6a00'
  },
  viewPlayer:
  {
    paddingBottom: 150
  }
});
