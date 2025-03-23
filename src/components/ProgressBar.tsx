import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import soundStore from '../zustand/soundStore';
import {calculateSongTime} from '../util/calculateSongTime';

const ProgressBar = () => {
  const [progress, setProgress] = useState<number>();
  const {sound} = soundStore();

  useEffect(() => {
    const updateProgress = setInterval(() => {
      if (Object.keys(sound).length != 0) {
        sound.getCurrentTime(seconds => {
          setProgress(
            (Math.floor(seconds) / Math.floor(sound?.getDuration())) * 100,
          );
        });
      }
    }, 100);
    return () => clearInterval(updateProgress);
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, {width: `${progress ?? 0}%`}]}></View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 2,
    borderRadius: 10,
    backgroundColor: COLORS.WhiteRGBA32,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: '5%',
    zIndex: 1000,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.White,
  },
});
