import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import TextAntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainProgressBar, SkeletonPlayScreen} from '../components';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import soundStore from '../zustand/soundStore';
import {trackStore, tracksStore} from '../zustand/tracksStore';

const PlayScreen = ({navigation, route}: any) => {
  const {width} = useWindowDimensions();
  const {trackId} = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const {sound, setSound} = soundStore();
  const {tracks} = tracksStore();
  const {track, setTrack} = trackStore();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (track && track.pathSong) {
      console.log('track in playscreen', track);
      Sound.setCategory('Playback');
      let soundTemp = new Sound(track.pathSong, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        if (soundTemp.isLoaded()) {
          setSound(soundTemp);
        }
      });
    } else {
      console.log('Track or pathSong is undefined', track);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  useEffect(() => {
    if (tracks.length > 0) {
      const newIndex = tracks.findIndex(item => item.id === trackId);
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
        setTrack(tracks[newIndex]);
      } else {
        console.log('Track ID not found in tracks:', trackId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackId, tracks]);

  const handlePlayMusic = () => {
    console.log('sound in play screen', sound);
    if (sound) {
      sound?.setVolume(1);
      if (!isPlaying) {
        sound.play(success => {
          if (success) {
            console.log('Successfully finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          setIsPlaying(false);
        });
        setIsPlaying(true);
      } else {
        sound.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleChangeTrack = (trackIndex: number) => {
    if (trackIndex < 0 || trackIndex >= tracks.length) {
      return false;
    }
    sound?.stop();
    setIsPlaying(false);
    setTrack(tracks[trackIndex]);
  };

  const handleNextTrack = () => {
    handleChangeTrack((currentIndex + 1) % tracks.length);
  };

  const handlePreviousTrack = () => {
    handleChangeTrack(
      currentIndex === 0 ? tracks.length - 1 : currentIndex - 1,
    );
  };

  if (!track) {
    return <SkeletonPlayScreen />;
  }

  return (
    <LinearGradient
      colors={['#DECBA4', '#3E5151']}
      style={styles.linearGradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <ScrollView style={styles.container}>
        <View style={styles.headerPlayView}>
          <TouchableOpacity
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginLeft: 10}}
            onPress={() => navigation.goBack()}>
            <TextAntDesign name="down" size={30} color={'white'} />
          </TouchableOpacity>
          <View style={styles.headerPlayContent}>
            <Text style={styles.headerTitle}>ĐANG PHÁT TỪ DANH SÁCH PHÁT</Text>
            <Text style={styles.headerSubTitle}>HongBaek</Text>
          </View>
          <TouchableOpacity style={{marginLeft: 10}}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            style={[styles.image, {width: width - 36, height: width - 60}]}
            source={{uri: track?.thumb}}
          />
        </View>
        <View style={styles.songContent}>
          <View style={styles.text}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {track?.title}
            </Text>
            <Text style={styles.songSubTitle}> {track?.singer}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={36} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: SPACING.space_28}}>
          <MainProgressBar />
        </View>
        <View style={styles.functionPlay}>
          <View>
            <Ionicons name="shuffle" size={30} color={'white'} />
          </View>
          <View style={styles.mainFn}>
            <TouchableOpacity onPress={handlePreviousTrack}>
              <MaterialCommunityIcons
                name="skip-previous"
                size={50}
                color={'white'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pauseAndPlayBtn}
              onPress={handlePlayMusic}>
              <MaterialCommunityIcons
                name={isPlaying ? 'pause' : 'play'}
                size={40}
                color={'black'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextTrack}>
              <MaterialCommunityIcons
                name="skip-next"
                size={50}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
          <View>
            <MaterialCommunityIcons
              name="repeat-variant"
              size={30}
              color="white"
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.space_18,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerPlayView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  headerPlayContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_10 + 1,
  },
  headerSubTitle: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_10 + 2,
    fontWeight: 'bold',
  },
  imageWrapper: {
    marginTop: SPACING.space_36 * 1.4,
  },
  image: {
    borderRadius: BORDERRADIUS.radius_10,
  },
  songContent: {
    marginTop: SPACING.space_36 * 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_18,
  },
  text: {
    flex: 1,
  },
  songTitle: {
    color: COLORS.White,
    fontWeight: 'bold',
    fontSize: FONTSIZE.size_18,
  },
  songSubTitle: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_14,
  },
  functionPlay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: SPACING.space_18,
    height: 100,
  },
  mainFn: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    gap: SPACING.space_28,
  },
  pauseAndPlayBtn: {
    backgroundColor: COLORS.White,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
