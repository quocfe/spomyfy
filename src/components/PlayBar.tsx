import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProgressBar from './ProgressBar';
import soundStore from '../zustand/soundStore';
import {trackStore} from '../zustand/tracksStore';

const PlayBar = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iconPlaying, setIconPlaying] = useState('play');
  const navigation = useNavigation();
  const {sound} = soundStore();
  const {track} = trackStore();

  useEffect(() => {
    if (track) {
      setIsPlaying(true);
      setIconPlaying('pause');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound]);
  const handlePlayMusic = () => {
    console.log('sound in play screen', sound);
    if (sound) {
      sound?.setVolume(1);
      if (!sound.isPlaying()) {
        setIsPlaying(true);
        sound.play(success => {
          if (success) {
            setIsPlaying(false);
            console.log('successfully finished playing');
          } else {
            setIsPlaying(true);
            console.log('playback failed due to audio decoding errors');
          }
        });
        setIconPlaying('pause');
      } else {
        sound.pause();
        setIsPlaying(false);
        setIconPlaying('play');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('Play', {
              trackId: track.id,
            })
          }>
          <View style={styles.contentContainer}>
            <View>
              <Image
                style={{width: 40, height: 40, borderRadius: 4}}
                source={{
                  uri: track?.thumb,
                }}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{track?.title}</Text>
              <Text style={styles.subText}>{track?.singer}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.fnContainer}>
          <FontAwesome style={styles.btn} name="plus-circle" />
          <TouchableOpacity onPress={() => handlePlayMusic()}>
            <FontAwesome style={[styles.btn, {width: 24}]} name={iconPlaying} />
          </TouchableOpacity>
        </View>
      </View>
      <ProgressBar />
    </View>
  );
};

export default PlayBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60,
    left: 10,
    right: 10,
  },

  bg: {
    padding: SPACING.space_10,
    backgroundColor: COLORS.Grey,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.space_10,
    width: '100%',
    height: '100%',
    borderRadius: BORDERRADIUS.radius_10,
    // transform: [{translateX: 50}],
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 10,
  },
  content: {
    width: '70%',
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: 15,
  },
  subText: {
    color: COLORS.GreenMain,
    fontSize: 11,
  },
  fnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: SPACING.space_24,
    marginRight: 10,
  },
  btn: {
    fontSize: SPACING.space_24,
    color: COLORS.White,
    flexShrink: 0,
  },
});
