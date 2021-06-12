import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'loadsh';

const ListFooterComponent = ({ assets }) => {
  const countsByMediaType = _.countBy(assets, asset => asset?.mediaType);

  let listFooterText = '';
  if (!countsByMediaType['photo']) {
    listFooterText = `${Number(
      countsByMediaType['video']
    ).toLocaleString()}개의 비디오`;
  } else if (!countsByMediaType['video']) {
    listFooterText = `${Number(
      countsByMediaType['photo']
    ).toLocaleString()}장의 사진`;
  } else {
    listFooterText = `${Number(
      countsByMediaType['photo']
    ).toLocaleString()}장의 사진, ${Number(
      countsByMediaType['video']
    ).toLocaleString()}개의 비디오`;
  }

  return !assets ||
    (!countsByMediaType['photo'] && !countsByMediaType['video']) ? null : (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>{listFooterText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    marginTop: 16,
    marginBottom: 16,
    color: 'rgb(142, 142, 147)',
  },
});

export default ListFooterComponent;
