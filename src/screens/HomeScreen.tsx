import {useQuery} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {TrackApi} from '../api/TrackApi';
import {ButtonCustom, CategoryHeader, CommonITem, PlayBar} from '../components';
import RecentItem from '../components/RecentItem';
import {playListRecent} from '../data';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import {TrackType} from '../types';
import {trackStore, tracksStore} from '../zustand/tracksStore';

const HomeScreen = ({navigation}: any) => {
  const {width} = useWindowDimensions();
  const {setTracks} = tracksStore();
  const {setTrack} = trackStore();
  const {data: tracksList} = useQuery({
    queryKey: ['tracks'],
    queryFn: async () => {
      return await TrackApi.getTracks();
    },
  });

  useEffect(() => {
    if (tracksList) {
      setTracks(tracksList);
    }
  }, [tracksList, setTracks]);

  const handleClickTrack = (track: TrackType) => {
    setTrack(track);
    navigation.push('Play', {
      trackId: track.id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerFixed}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://i.scdn.co/image/ab67757000003b82c3cb5f3a5e71d37d4041ffea',
            }}
          />
          <ButtonCustom title="Nhạc" />
          <ButtonCustom title="Podcasts" />
        </View>
      </View>
      <ScrollView>
        <View style={styles.recentList}>
          {tracksList?.map((track: any) => {
            return (
              <RecentItem
                key={track.id}
                track={track}
                itemFunction={() => handleClickTrack(track)}
              />
            );
          })}
        </View>
        <CategoryHeader title="Mới phát gần đây" />
        <FlatList
          data={playListRecent}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap36}
          snapToInterval={width * 0.7 + SPACING.space_36}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          renderItem={({item}) => (
            <CommonITem item={item} cardWidth={width * 0.3} />
          )}
        />
        <CategoryHeader title="Danh sách phát của bạn" />
        <FlatList
          data={playListRecent}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap36}
          snapToInterval={width * 0.7 + SPACING.space_36}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          renderItem={({item}) => (
            <CommonITem item={item} cardWidth={width * 0.35} />
          )}
        />
        <CategoryHeader title="Chương trình của bạn" />
        <FlatList
          data={playListRecent}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap36}
          snapToInterval={width * 0.7 + SPACING.space_36}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          renderItem={({item}) => (
            <CommonITem item={item} cardWidth={width * 0.35} />
          )}
        />
      </ScrollView>
      <PlayBar />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    paddingHorizontal: SPACING.space_20,
    flex: 1,
  },
  headerFixed: {
    backgroundColor: COLORS.Black,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    marginHorizontal: SPACING.space_20,
    height: 60,
    opacity: 0.9,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: SPACING.space_10,
    height: '100%',
    paddingVertical: SPACING.space_10,
  },
  avatar: {
    width: SPACING.space_36,
    height: SPACING.space_36,
    borderRadius: BORDERRADIUS.radius_25,
    objectFit: 'cover',
  },
  recentList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 70,
    marginHorizontal: -SPACING.space_4,
  },
  containerGap36: {
    gap: SPACING.space_24,
  },
});
