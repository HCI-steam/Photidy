import * as React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';

const SortAndFilterModal = props => {
  const [modalVisible, setModalVisible] = React.useState(props.visible);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="formSheet"
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    elevation: 3,
  },
  button: {
    backgroundColor: 'brown',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
});

export default SortAndFilterModal;
