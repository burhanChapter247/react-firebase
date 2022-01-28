export enum ChannelTypes {
  CHANNEL_FETCH = "@channel/FETCH",
  CHANNEL_FETCH_ERROR = "@channel/FETCH_ERROR",
  CHANNEL_FETCH_SUCCESS = "@channel/FETCH_SUCCESS",
  CHANNEL_LOADING = "@channel/LOADING",
  CHANNEL_CREATE = "@channel/CREATE",
}

export interface Channel {
  name: string;
}
