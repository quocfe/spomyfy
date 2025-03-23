import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';

const CategoryHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props?.title}</Text>
    </View>
  );
};

export default CategoryHeader;

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.space_10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.White,
    marginVertical: SPACING.space_10,
    textTransform: 'capitalize',
  },
});
