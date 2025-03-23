import {create} from 'zustand';
import Sound from 'react-native-sound';

type SoundStore = {
  sound: Sound;
  setSound: (sound: Sound) => void;
};

const soundStore = create<SoundStore>()(set => ({
  sound: {} as Sound,
  setSound: sound => set({sound}),
}));

export default soundStore;
