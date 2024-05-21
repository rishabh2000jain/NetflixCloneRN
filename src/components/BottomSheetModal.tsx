import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, PropsWithChildren} from 'react';
import {AppColors} from '../util/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ModalProps = {
  isOpen: boolean;
  title: string;
  setIsOpen: (isOpen: boolean) => void;
};

const BottomSheetModal: FC<ModalProps & PropsWithChildren> = ({
  children,
  title,
  isOpen,
  setIsOpen,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      style={styles.modalStyle}
      animationType={'slide'}
      collapsable={true}
      transparent={true}
      onRequestClose={() => {
        setIsOpen(!isOpen);
      }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={insets.bottom}
        behavior="padding">
        <View style={styles.modalStyle}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  Keyboard.dismiss();
                  setIsOpen(!isOpen);
                }}>
                <Icon name="x" color={AppColors.onModalBackground} size={16} />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  modalStyle: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 5,
  },
  contentContainer: {
    height: 'auto',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: AppColors.modalBackground,
  },
  closeButton: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    borderRadius: 60,
    borderColor: AppColors.onModalBackground,
    borderWidth: 1,
  },
  modalTitle: {
    color: AppColors.onBackground,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
