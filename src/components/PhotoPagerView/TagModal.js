import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { actions } from '../../redux/states/viewerState';
import { getViewerModalState, getTagModalVisible } from '../../redux/selectors';
import { Alert } from 'react-native';

const TagModal = props => {
  const dispatch = useDispatch();
  const [tagVisible, viewerState] = useSelector(
    state => [getTagModalVisible(state), getViewerModalState(state)],
    shallowEqual
  );
  const [tagText, setTagText] = useState('');
  const tagInputRef = useRef(null);

  const { item, itemTags } = viewerState;

  const handleClose = useCallback(() => {
    dispatch(actions.setTagModalVisible(false));
    setTagText('');
    tagInputRef.current.clear();
  }, [dispatch]);

  const getTagsForItem = async () => {
    const idToTags = await AsyncStorage.getItem('idToTags');
    const parsed = JSON.parse(idToTags);
    if (parsed[item.id]) {
      dispatch(
        actions.setViewerModalState({
          ...viewerState,
          itemTags: parsed[item.id],
        })
      );
    } else {
      dispatch(
        actions.setViewerModalState({
          ...viewerState,
          itemTags: [],
        })
      );
    }
  };

  const handleRegister = useCallback(async () => {
    const idToTags = JSON.parse(await AsyncStorage.getItem('idToTags'));
    const tagToIds = JSON.parse(await AsyncStorage.getItem('tagToIds'));
    if (idToTags[item.id] && idToTags[item.id].includes(tagText)) {
      Alert.alert('이미 존재하는 태그입니다');
    } else {
      const ids = tagToIds[tagText]
        ? [...tagToIds[tagText], item.id]
        : [item.id];
      const tags = idToTags[item.id]
        ? [...idToTags[item.id], tagText]
        : [tagText];
      await AsyncStorage.setItem(
        'tagToIds',
        JSON.stringify({ ...tagToIds, [tagText]: ids })
      );
      await AsyncStorage.setItem(
        'idToTags',
        JSON.stringify({ ...idToTags, [item.id]: tags })
      );
      getTagsForItem();
    }
    setTagText('');
    tagInputRef.current.clear();
  }, [tagText, item]);

  useEffect(() => {
    getTagsForItem();
  }, []);

  const TagChip = ({ text }) => {
    const handleTagDelete = useCallback(async () => {
      const idToTags = JSON.parse(await AsyncStorage.getItem('idToTags'));
      const tagToIds = JSON.parse(await AsyncStorage.getItem('tagToIds'));
      const ids = tagToIds[text].filter(id => id !== item.id);
      const tags = idToTags[item.id].filter(tag => tag != text);
      await AsyncStorage.setItem(
        'tagToIds',
        JSON.stringify({ ...tagToIds, [text]: ids })
      );
      await AsyncStorage.setItem(
        'idToTags',
        JSON.stringify({ ...idToTags, [item.id]: tags })
      );
      getTagsForItem();
    }, [text, item]);
    return (
      <View style={styles.tagChip}>
        <Text style={styles.tagChipText}>{text}</Text>
        <TouchableOpacity style={{ marginLeft: 4 }} onPress={handleTagDelete}>
          <MaterialCommunityIcons name="close" color="#fff" size={12} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={tagVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
            <Text style={styles.buttonCloseText}>완료</Text>
          </TouchableOpacity>
          <Text style={styles.title}>태그</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              ref={tagInputRef}
              style={styles.textInput}
              onChangeText={setTagText}
              value={tagText}
              placeholder="태그를 입력해주세요"
              autoCapitalize="none"
              placeholderTextColor="grey"
            />
            <TouchableOpacity
              style={styles.tagAddButton}
              activeOpacity={0.5}
              onPress={handleRegister}
            >
              <Text style={styles.tagAddButtonText}>등록</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.registeredWrapper}>
            <Text style={styles.registeredText}>등록된 태그</Text>
            {itemTags && itemTags.length > 0 ? (
              <View style={styles.registeredTags}>
                {itemTags.map((t, i) => {
                  return <TagChip key={t + i} text={t} />;
                })}
              </View>
            ) : (
              <Text style={styles.noTagsText}>없음</Text>
            )}
          </View>
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
    right: 12,
    top: 12,
    position: 'absolute',
  },
  buttonCloseText: {
    color: 'rgb(0,122,255)',
    fontSize: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
  },
  textInput: {
    width: '60%',
    height: 34,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 6,
    marginHorizontal: 6,
    paddingHorizontal: 8,
    paddingVertical: 9,
    fontSize: 16,
  },
  tagAddButton: {
    borderRadius: 6,
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: 'rgb(0,122,255)',
    marginHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagAddButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  registeredWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    marginVertical: 10,
    width: '90%',
  },
  registeredText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
  registeredTags: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  tagChip: {
    backgroundColor: 'rgb(0,122,255)',
    opacity: 0.8,
    marginHorizontal: 4,
    marginBottom: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagChipText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  noTagsText: {
    fontSize: 12,
    marginTop: 6,
    width: '70%',
    textAlign: 'left',
    color: 'grey',
  },
});

export default TagModal;
