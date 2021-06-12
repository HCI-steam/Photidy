import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

import { actions } from '../../redux/states/viewerState';

const PhotoViewHeader = props => {
  const dispatch = useDispatch();
  const { currentIndex, currentItem, onBackHandler } = props;

  const localFormatCreationTime = moment
    .parseZone(moment(currentItem.creationTime))
    .local(true)
    .format();

  const creationDate = localFormatCreationTime.split('T')[0].split('-');
  const year = Number.parseInt(creationDate[0]),
    month = Number.parseInt(creationDate[1]),
    day = Number.parseInt(creationDate[2]);

  const creationTime = localFormatCreationTime
    .split('T')[1]
    .split('+')[0]
    .split(':');
  let hour = Number.parseInt(creationTime[0]),
    minute = creationTime[1];
  const isAfterNoon = hour > 12;
  hour = isAfterNoon ? hour - 12 : hour;
  const currentYear = new Date().getFullYear();
  const yearText = year === currentYear ? '' : `${year}년 `;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={onBackHandler}>
        <Ionicons
          name="ios-chevron-back"
          size={28}
          color={'rgb(0, 122, 255)'}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>
          {yearText}
          {month}월 {day}일
        </Text>
        <Text style={styles.timeText}>
          {isAfterNoon ? '오후' : '오전'} {`${hour}:${minute}`}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.infoIcon}
        onPress={() => dispatch(actions.setInfoModalVisible(true))}
      >
        <Ionicons
          name="ios-information-circle-outline"
          size={28}
          color={'rgb(0, 122, 255)'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgb(199,199,204)',
    height: 44 + getStatusBarHeight(true),
    width: '100%',
    paddingBottom: 8,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 12,
  },
  backIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  infoIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
});

export default PhotoViewHeader;
