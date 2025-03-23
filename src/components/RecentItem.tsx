import {View, Text, Image, StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';
import {TrackType} from '../types';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

const RecentItem = (props: any) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.itemFunction()}>
      <Image
        style={styles.thumb}
        source={{
          uri: `${props.track.thumb}`,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{props.track.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(RecentItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    height: 65,
    paddingHorizontal: SPACING.space_4,
    paddingVertical: SPACING.space_4,
  },
  thumb: {
    width: 55,
    height: '100%',
    borderTopLeftRadius: BORDERRADIUS.radius_4,
    borderBottomLeftRadius: BORDERRADIUS.radius_4,
    objectFit: 'cover',
  },
  content: {
    backgroundColor: COLORS.Grey,
    height: '100%',
    flex: 1,
    borderTopRightRadius: BORDERRADIUS.radius_4,
    borderBottomRightRadius: BORDERRADIUS.radius_4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: SPACING.space_10,
  },
  text: {
    color: COLORS.White,
  },
});
