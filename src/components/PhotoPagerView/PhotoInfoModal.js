import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';

import { actions } from '../../redux/states/viewerState';
import {
  getInfoModalVisible,
  getViewerModalState,
} from '../../redux/selectors';

const getTimeFormat = unixTime => {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const local = moment.parseZone(moment(unixTime)).local(true);
  const format = local.format();
  const weekday = weekdays[local.weekday()];

  const dates = format.split('T')[0].split('-');
  const times = format.split('T')[1].split('+')[0].split(':');

  let hour = Number.parseInt(times[0]),
    minute = times[1],
    second = times[2];
  const isAfterNoon = hour > 12;
  hour = isAfterNoon ? hour - 12 : hour;

  return `${dates[0]}년 ${dates[1]}월 ${dates[2]}일 (${weekday}) ${
    isAfterNoon ? '오후' : '오전'
  } ${hour}:${minute}:${second}`;
};

const getFileSizeFormatted = size => {
  const units = [' ', 'K', 'M', 'G'];
  let thCount = 0;
  while (size / 1000 > 1) {
    size /= 1000;
    thCount++;
  }
  return `${size.toFixed(1)} ${units[thCount]}B`;
};

const getFileExtensionType = uri => {
  const split = uri.split('=');
  return split[split.length - 1];
};

const getImageAddressFormat = imageAddress => {
  if (!imageAddress) return '';
  const address = imageAddress[0];

  let addressFormat = '';
  if (address.postalCode) addressFormat += `${address.postalCode}, `;
  if (address.country) addressFormat += `${address.country}, `;
  if (address.region) addressFormat += `${address.region}, `;
  if (address.city) addressFormat += `${address.city}, `;
  if (address.name) addressFormat += `${address.name}`;
  if (addressFormat.endsWith(', '))
    addressFormat.substr(0, addressFormat.length - 2);
  return addressFormat;
};

const PhotoInfoModal = props => {
  const dispatch = useDispatch();

  const [viewerState, infoVisible] = useSelector(
    state => [getViewerModalState(state), getInfoModalVisible(state)],
    shallowEqual
  );
  const { item } = viewerState;
  const [image, setImage] = useState(item);

  useEffect(() => {
    const extendAssetInfo = async () => {
      let extended = await MediaLibrary.getAssetInfoAsync(item.id);
      let { exists, size } = await FileSystem.getInfoAsync(extended.localUri);

      if (exists) extended = { ...extended, size };
      if (extended.location) {
        const { latitude, longitude } = extended.location;
        const address = await Location.reverseGeocodeAsync(
          { latitude, longitude },
          { useGoogleMaps: false }
        );
        extended = { ...extended, address };
      }

      setImage(extended);
    };

    extendAssetInfo();
  }, [item]);

  const creationTimeFormat = getTimeFormat(image.creationTime);
  const modificationTimeFormat = getTimeFormat(image.modificationTime);
  const imageFileSize = getFileSizeFormatted(Number.parseInt(image.size));
  const imageFileExtension = getFileExtensionType(image.uri);
  const hasLocation = image.location != null;
  const addressFormat = getImageAddressFormat(image.address);
  const latitude = hasLocation ? image.location.latitude : '37.25',
    longitude = hasLocation ? image.location.longitude : '122.75';

  const infoData = {
    파일명: image.filename,
    '생성한 날짜': creationTimeFormat,
    '수정한 날짜': modificationTimeFormat,
    '사진 크기': `${image.width} x ${image.height}`,
    '파일 용량': imageFileSize,
    '파일 형식': imageFileExtension,
    위치: hasLocation ? addressFormat : '위치 정보 없음',
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={infoVisible}
      onRequestClose={() => dispatch(actions.setInfoModalVisible(false))}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => dispatch(actions.setInfoModalVisible(false))}
          >
            <MaterialCommunityIcons
              name="close"
              size={24}
              color="rgb(0,122,255)"
            />
          </TouchableOpacity>
          <Text style={styles.title}>사진 정보</Text>
          {Object.keys(infoData).map(key => {
            return (
              <View key={key} style={styles.infoArea}>
                <View style={styles.textLine}>
                  <Text style={styles.separatorText}>{key}</Text>
                  <Text style={styles.text}>{infoData[key]}</Text>
                </View>
              </View>
            );
          })}
          {hasLocation ? (
            <MapView
              style={styles.mapView}
              provider={null}
              region={{
                latitude,
                longitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
            >
              <Marker coordinate={{ latitude, longitude }} />
            </MapView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    right: 8,
    top: 8,
    position: 'absolute',
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoArea: {
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  separatorText: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'left',
  },
  text: {
    width: '70%',
    fontSize: 12,
    textAlign: 'right',
  },
  mapView: {
    marginTop: 20,
    width: '90%',
    height: 150,
    borderRadius: 12,
  },
});

export default PhotoInfoModal;
