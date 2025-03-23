import {create} from 'zustand';

type TrackType = {
  id: string;
  title: string;
  singer: string;
  thumb: string;
  pathSong: string;
};

type TracksStore = {
  tracks: TrackType[];
  setTracks: (tracks: TrackType[]) => void;
};

export type TrackStore = {
  track: TrackType;
  setTrack: (track: TrackType) => void;
};

const tracksStore = create<TracksStore>()(set => ({
  tracks: [],
  setTracks: (tracks: TrackType[]) => set({tracks}),
}));

const trackStore = create<TrackStore>()(set => ({
  track: {} as TrackType,
  setTrack: (track: TrackType) => set({track}),
}));

export {tracksStore, trackStore};
