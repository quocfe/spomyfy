import AxiosConfig from './AxiosCofig';

export const TrackApi = {
  getTrack: async (trackId: number | string) => {
    const res = await AxiosConfig.get(`/tracks/${trackId}`);
    return res.data;
  },

  getTracks: async () => {
    const res = await AxiosConfig.get('/tracks');
    return res.data;
  },
};
