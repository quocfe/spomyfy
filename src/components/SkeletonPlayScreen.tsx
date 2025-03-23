import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING, BORDERRADIUS} from '../theme/theme';

const SkeletonPlayScreen = () => {
  return (
    <LinearGradient
      colors={['#DECBA4', '#3E5151']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{height: '100%'}}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#E0E0E0', '#C0C0C0', '#E0E0E0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.imageSkeleton}
        />
        <View style={styles.textSkeletonContainer}>
          <LinearGradient
            colors={['#E0E0E0', '#C0C0C0', '#E0E0E0']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.textSkeleton}
          />
          <LinearGradient
            colors={['#E0E0E0', '#C0C0C0', '#E0E0E0']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[styles.textSkeleton, styles.textSkeletonShort]}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_18,
  },
  imageSkeleton: {
    width: '100%',
    height: 200,
    borderRadius: BORDERRADIUS.radius_10,
  },
  textSkeletonContainer: {
    marginTop: SPACING.space_18,
  },
  textSkeleton: {
    height: 20,
    borderRadius: BORDERRADIUS.radius_10,
    marginBottom: SPACING.space_8,
  },
  textSkeletonShort: {
    width: '60%',
  },
});

export default SkeletonPlayScreen;
