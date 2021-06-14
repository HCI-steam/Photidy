import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useSelector, useDispatch } from 'react-redux';

import {
  getSFModalVisible,
  getTagToIds,
  getIdToTags,
} from '../../redux/selectors';
import { actions } from '../../redux/states/assetsState';

const SortAndFilterModal = props => {
  const { assets } = props;
  const dispatch = useDispatch();
  const [modalVisible, tagToIds, idToTags] = useSelector(state => [
    getSFModalVisible(state),
    getTagToIds(state),
    getIdToTags(state),
  ]);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '92%'], []);

  useEffect(() => {
    if (modalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [bottomSheetModalRef.current]);

  const handleSheetChanges = useCallback(
    index => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        dispatch(actions.setSFModalVisible(false));
      }
    },
    [dispatch]
  );

  const availableSubTypesMap = {
    hdr: 'HDR',
    panorama: '파노라마',
    stream: '스트림',
    timelapse: '타임랩스',
    screenshot: '스크린샷',
    highFrameRate: '슬로모션',
    livePhoto: '라이브 포토',
    depthEffect: '인물 사진',
  };

  const includeCountsData = Object.keys(availableSubTypesMap).map(st => {
    const countBy = _.countBy(assets, asset =>
      _.includes(asset.mediaSubtypes, st)
    );
    const count = countBy.true ? countBy.true : 0;

    return {
      label: count === 0 ? null : `${availableSubTypesMap[st]} (${count})`,
      value: st,
    };
  });
  const includeCountFiltered = includeCountsData.filter(
    count => count.label != null
  );
  const videoAssetsCount = _.countBy(
    assets,
    asset => asset.mediaType === 'video'
  );
  const videoCountFormat = videoAssetsCount.true
    ? { label: `비디오 (${videoAssetsCount.true})`, value: 'video' }
    : null;

  const includeCountWithVideo = videoCountFormat
    ? [videoCountFormat, ...includeCountFiltered]
    : includeCountFiltered;

  const tagsFormat = Object.keys(tagToIds).map(tag => ({
    label: tag,
    value: tag,
  }));

  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState('TIME/ASC');
  const [sortItems, setSortItems] = useState([
    { label: '최신 항목 순으로', value: 'TIME/ASC' },
    { label: '오래된 항목 순으로', value: 'TIME/DESC' },
  ]);

  const [mediaTypesOpen, setMediaTypesOpen] = useState(false);
  const [mediaTypesValue, setMediaTypesValue] = useState('ALL');
  const [mediaTypesItems, setMediaTypesItems] = useState([
    { label: '전체', value: 'ALL' },
    ...includeCountWithVideo,
  ]);

  const [startDateValue, setStartDateValue] = useState(new Date(2000, 0, 1));
  const [endDateValue, setEndDateValue] = useState(new Date());

  const handleChangeStartDate = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || startDateValue;
      setStartDateValue(currentDate);
    },
    [startDateValue]
  );

  const handleChangeEndDate = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || endDateValue;
      setEndDateValue(currentDate);
    },
    [endDateValue]
  );

  const [tagOpen, setTagOpen] = useState(false);
  const [tagValue, setTagValue] = useState('NONE');
  const [tagItems, setTagItems] = useState([
    { label: '태그 선택 안함', value: 'NONE' },
    ...tagsFormat,
  ]);

  const handleSortOpen = useCallback(() => {
    setMediaTypesOpen(false);
    setTagOpen(false);
  }, []);

  const handleMediaTypeOpen = useCallback(() => {
    setSortOpen(false);
    setTagOpen(false);
  }, []);

  const handleTagOpen = useCallback(() => {
    setSortOpen(false);
    setMediaTypesOpen(false);
  }, []);

  const handleRecovery = useCallback(() => {
    setSortValue('TIME/ASC');
    setMediaTypesValue('ALL');
    setStartDateValue(new Date(2000, 0, 1));
    setEndDateValue(new Date());
    setTagValue('NONE');
  }, [
    setSortValue,
    setMediaTypesValue,
    setStartDateValue,
    setEndDateValue,
    setTagValue,
  ]);

  const handleCancel = useCallback(() => {
    dispatch(actions.setSFModalVisible(false));
    handleRecovery();
  }, [dispatch, handleRecovery]);

  const handleApply = useCallback(() => {
    const filterOptions = {
      sort: sortValue,
      mediaType: mediaTypesValue,
      startDate: startDateValue,
      endDate: endDateValue,
      tag: tagValue,
    };

    dispatch(actions.setSFModalVisible(false));
    // dispatch(actions.setListFilterOptions(filterOptions))
    console.log(filterOptions);
  }, [
    dispatch,
    sortValue,
    mediaTypesValue,
    startDateValue,
    endDateValue,
    tagValue,
  ]);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={null}
        animateOnMount={true}
      >
        <TouchableOpacity style={styles.headerButton} onPress={handleCancel}>
          <Text style={{ ...styles.headerButtonText, left: 16 }}>취소</Text>
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>정렬 및 필터링</Text>
        </View>
        <TouchableOpacity
          style={{ ...styles.headerButton, right: 16 }}
          onPress={handleApply}
        >
          <Text style={styles.headerButtonText}>적용</Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <View style={styles.recoveryWrapper}>
            <TouchableOpacity
              style={styles.recoveryButton}
              onPress={handleRecovery}
            >
              <Ionicons
                name="refresh-outline"
                size={16}
                color="rgb(0,122,255)"
              />
              <Text style={styles.recoveryText}>초기화</Text>
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.sectionContainer, zIndex: 10 }}>
            <Text style={styles.sectionTitle}>정렬 기준</Text>
            <DropDownPicker
              open={sortOpen}
              value={sortValue}
              items={sortItems}
              setOpen={setSortOpen}
              setValue={setSortValue}
              setItems={setSortItems}
              onOpen={handleSortOpen}
              itemSeparator={true}
              style={{ height: 42 }}
              itemSeparatorStyle={{ backgroundColor: '#cdcdcd' }}
              selectedItemContainerStyle={{
                backgroundColor: '#eee',
              }}
              selectedItemLabelStyle={{
                color: 'rgb(0,122,255)',
                fontWeight: '500',
              }}
              TickIconComponent={({ style }) => (
                <Ionicons
                  name="checkmark-sharp"
                  size={20}
                  color="rgb(0,122,255)"
                />
              )}
            />
          </View>
          <View style={{ ...styles.sectionContainer, zIndex: 9 }}>
            <Text style={styles.sectionTitle}>미디어 유형</Text>
            <DropDownPicker
              open={mediaTypesOpen}
              value={mediaTypesValue}
              items={mediaTypesItems}
              setOpen={setMediaTypesOpen}
              setValue={setMediaTypesValue}
              setItems={setMediaTypesItems}
              onOpen={handleMediaTypeOpen}
              itemSeparator={true}
              style={{ height: 42 }}
              itemSeparatorStyle={{ backgroundColor: '#cdcdcd' }}
              selectedItemContainerStyle={{
                backgroundColor: '#eee',
              }}
              selectedItemLabelStyle={{
                color: 'rgb(0,122,255)',
                fontWeight: '500',
              }}
              TickIconComponent={({ style }) => (
                <Ionicons
                  name="checkmark-sharp"
                  size={20}
                  color="rgb(0,122,255)"
                />
              )}
            />
          </View>
          <View style={{ ...styles.sectionContainer, zIndex: 8 }}>
            <Text style={styles.sectionTitle}>날짜 선택</Text>
            <View style={styles.datePickerWrapper}>
              <Text style={styles.datePickerText}>시작 날짜</Text>
              <DateTimePicker
                value={startDateValue}
                maximumDate={new Date()}
                mode="date"
                is24Hour={true}
                locale="ko-KR"
                display="default"
                style={{ width: 111, height: 35 }}
                onChange={handleChangeStartDate}
              />
            </View>
            <View style={styles.datePickerWrapper}>
              <Text style={styles.datePickerText}>종료 날짜</Text>
              <DateTimePicker
                value={endDateValue}
                minimumDate={startDateValue}
                maximumDate={new Date()}
                mode="date"
                is24Hour={true}
                locale="ko-KR"
                display="default"
                style={{ width: 111, height: 35 }}
                onChange={handleChangeEndDate}
              />
            </View>
          </View>
          <View style={{ ...styles.sectionContainer, zIndex: 7 }}>
            <Text style={styles.sectionTitle}>태그</Text>
            <DropDownPicker
              open={tagOpen}
              value={tagValue}
              items={tagItems}
              setOpen={setTagOpen}
              setValue={setTagValue}
              setItems={setTagItems}
              onOpen={handleTagOpen}
              itemSeparator={true}
              searchable={true}
              listMode="MODAL"
              style={{ height: 42 }}
              itemSeparatorStyle={{ backgroundColor: '#cdcdcd' }}
              selectedItemContainerStyle={{
                backgroundColor: '#eee',
              }}
              selectedItemLabelStyle={{
                color: 'rgb(0,122,255)',
                fontWeight: '500',
              }}
              TickIconComponent={({ style }) => (
                <Ionicons
                  name="checkmark-sharp"
                  size={20}
                  color="rgb(0,122,255)"
                />
              )}
            />
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.3)',
  },
  headerButton: {
    top: 18,
    position: 'absolute',
    zIndex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    color: 'rgb(0,122,255)',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '100%',
    marginVertical: 8,
  },
  datePickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 4,
  },
  datePickerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  recoveryWrapper: {
    flexDirection: 'row-reverse',
    width: '100%',
    marginTop: 16,
  },
  recoveryButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
  },
  recoveryText: {
    color: 'rgb(0,122,255)',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 3,
  },
});

export default SortAndFilterModal;
