import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Image } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

interface CompletionModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isVisible, onClose }) => {
  // State to toggle between views
  const [viewState, setViewState] = useState('initial'); // 'initial' or 'followup'

  // Handle view change
  const handleContinue = () => {
    if (viewState === 'initial') {
      setViewState('followup');
    } else {
      onClose();  // Close modal if already on followup view
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {viewState === 'initial' ? (
            <>
              <Text style={styles.modalText}>Congrats!</Text>
              <TabBarIcon name='checkmark-circle-outline' style={styles.checkIcon}/>
            </>
          ) : (
            <>
              <Text style={styles.modalText}>Streak!</Text>
              <View style = {styles.statusContainer}>
          <Image
            source={require('../assets/images/fire.gif')}
            style={styles.fireGif}></Image>
            <Text
                style={styles.streakText}
            >3</Text>
        </View>
            </>
          )}
          <Pressable
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>{viewState === 'initial' ? 'Continue' : 'Continue'}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkIcon: {
    fontSize: 75,
    marginBottom: 20,
    textShadowColor: '#000',
    opacity: 0.8,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  continueButton: {
    backgroundColor: '#FFC72E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  continueText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fireGif: {
    width: 60,
    height: 60,
    marginTop: -10,
    marginRight: 15,
    opacity: 0.6, 
  },
  streakText: {
    fontSize: 60,
    fontWeight: 'semibold',
    color: '#FFC72E',
  },
  statusContainer:{

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',   
    marginBottom: 20,
  },
});

export default CompletionModal;
