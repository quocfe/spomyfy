import React, {memo, useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import soundStore from '../zustand/soundStore';
import {calculateSongTime} from '../util/calculateSongTime';

const MainProgressBar: React.FC = () => {
  const [time, setTime] = useState<string>();
  const [progress, setProgress] = useState<number>();
  const [currentTime, setCurrentTime] = useState<string>();
  const {sound} = soundStore();

  useEffect(() => {
    const updateProgress = setInterval(() => {
      if (Object.keys(sound).length != 0) {
        setTime(calculateSongTime(sound.getDuration()));
        sound.getCurrentTime(seconds => {
          setProgress(
            (Math.floor(seconds) / Math.floor(sound?.getDuration())) * 100,
          );
          setCurrentTime(calculateSongTime(seconds));
        });
      }
    }, 100);
    return () => clearInterval(updateProgress);
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.mainProgressBarContainer}>
        <View style={[styles.progressBar, {width: `${progress ?? 0}%`}]}></View>
      </View>
      <View style={styles.time}>
        <Text style={styles.textTime}>
          {currentTime ? currentTime : '0:00'}
        </Text>
        <Text style={styles.textTime}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: SPACING.space_8,
  },
  mainProgressBarContainer: {
    width: '100%',
    height: 4,
    borderRadius: 10,
    backgroundColor: COLORS.WhiteRGBA32,
    zIndex: 1000,
    flexDirection: 'column',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.White,
    borderRadius: 10,
  },
  circleBar: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.White,
    position: 'absolute',
    top: -3,
    transform: [{translateX: -5}],
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTime: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_14,
    fontWeight: 'thin',
    fontFamily: FONTFAMILY.poppins_light,
  },
});

export default memo(MainProgressBar);
