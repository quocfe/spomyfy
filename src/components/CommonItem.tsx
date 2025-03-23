import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {SPACING} from '../theme/theme';

const CommonITem = ({item, cardWidth}: any) => {
  return (
    <View style={{width: cardWidth, height: cardWidth, marginBottom: 60}}>
      <Image
        style={styles.image}
        source={{
          uri: item?.img,
        }}></Image>
      <Text style={styles.title}>{item?.title}</Text>
    </View>
  );
};

export default CommonITem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SPACING.space_10,
    overflow: 'hidden',
    objectFit: 'cover',
    marginBottom: SPACING.space_10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
  },
});
