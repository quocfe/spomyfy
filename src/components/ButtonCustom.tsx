import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';

const ButtonCustom = (props: any) => {
  return (
    <TouchableOpacity style={styles.buttonBg}>
      <Text style={styles.text}>{props?.title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

const styles = StyleSheet.create({
  buttonBg: {
    backgroundColor: COLORS.Grey,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_20,
  },
  text: {
    color: COLORS.White,
  },
});
