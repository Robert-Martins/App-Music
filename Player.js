import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Audio} from 'expo-av';
import {AntDesign} from '@expo/vector-icons';

export default function Player(props){

    const handlePlay = async () => 
    {
        let curFile = props.musics[props.audioIndex].file;
        let newMusics = props.musics.filter((val,k)=>{
            if(props.audioIndex == k)
            {
              props.musics[k].playing = true;
              curFile = props.musics[k].file;
            }
            else
            {
              props.musics[k].playing = false;
            }
            return props.musics[k];
          })
          try{
            if(props.audio != null)
            {
                props.setPlaying(true);
                props.setMusics(newMusics);
                await props.audio.playAsync();
            }
            else 
            {
                let curAudio = new Audio.Sound();
                try{
                    await curAudio.loadAsync(curFile);
                    await curAudio.playAsync();
                }catch(error)
                {

                }
                props.setAudio(curAudio);
                props.setMusics(newMusics);
                props.setPlaying(true);
            }
          }catch(error)
          {

          }

    }

    const handlePause = async () => 
    {
        if(props.audio!=null)
        {
            props.audio.pauseAsync();
        }
        props.setPlaying(false);
    }

    const handleBack = async () =>
    {
        let newIndex = props.audioIndex - 1;
        if(newIndex < 0)
        {
            newIndex = props.musics.length - 1;
        }
        props.setAudioIndex(newIndex);
        let curFile = props.musics[newIndex].file;
        let newMusics = props.musics.filter((val,k)=>{
            if(newIndex == k)
            {
              props.musics[k].playing = true;
              curFile = props.musics[k].file;
            }
            else
            {
              props.musics[k].playing = false;
            }
            return props.musics[k];
          })
          if(props.audio != null)
          {
              props.audio.unloadAsync();
          }
            let curAudio = new Audio.Sound();
            try{
                await curAudio.loadAsync(curFile);
                await curAudio.playAsync();
            }catch(error)
            {

            }
            props.setAudio(curAudio);
            props.setMusics(newMusics);
            props.setPlaying(true);
    }

    const handleNext = async () =>
    {
        let newIndex = props.audioIndex + 1;
        if(newIndex >= props.musics.length)
        {
            newIndex = 0;
        }
        props.setAudioIndex(newIndex);
        let curFile = props.musics[newIndex].file;
        let newMusics = props.musics.filter((val,k)=>{
            if(newIndex == k)
            {
              props.musics[k].playing = true;
              curFile = props.musics[k].file;
            }
            else
            {
              props.musics[k].playing = false;
            }
            return props.musics[k];
          })
          if(props.audio != null)
          {
              props.audio.unloadAsync();
          }
            let curAudio = new Audio.Sound();
            try{
                await curAudio.loadAsync(curFile);
                await curAudio.playAsync();
            }catch(error)
            {

            }
            props.setAudio(curAudio);
            props.setMusics(newMusics);
            props.setPlaying(true);
    }


    return(
        <View style={styles.player}>
            <TouchableOpacity onPress={()=> handleBack()} style={styles.btn}>
                <AntDesign name="banckward" size={35} color="white" />
            </TouchableOpacity>
            {
                (!props.playing)?
                <TouchableOpacity onPress={()=> handlePlay()} style={styles.btn}>
                    <AntDesign name="playcircleo" size={35} color="white" />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=> handlePause()} style={styles.btn}>
                    <AntDesign name="pausecircleo" size={35} color="white" />
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={()=> handleNext()} style={styles.btn}>
                <AntDesign name="forward" size={35} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    player:
    {
        width:'100%',
        height:100,
        /*
        position:'absolute',
        bottom:0,
        left:0,
        zIndex:999, //Ordem de renderização, pra garantir que vai ficar em cima
        */
        backgroundColor:'#111',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    btn:
    {
        marginRight:20,
        marginLeft:20
    }
})