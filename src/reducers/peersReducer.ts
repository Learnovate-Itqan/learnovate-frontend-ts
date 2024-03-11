import { ADD_ALL_PEERS, ADD_PEER, ADD_PEER_NAME, ADD_PEER_STREAM, REMOVE_PEER } from "./peersActions";

export type PeerState = {
  [userId: string]: { stream?: MediaStream; userId: string; userName?: string; peerId?: string };
};

type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { userId: string; userName: string; peerId: string };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { userId: string };
    }
  | {
      type: typeof ADD_ALL_PEERS;
      payload: { peers: PeerState };
    }
  | {
      type: typeof ADD_PEER_STREAM;
      payload: { userId: string; stream: MediaStream };
    }
  | {
      type: typeof ADD_PEER_NAME;
      payload: { userId: string; userName: string };
    };

export function peersReducer(state: PeerState, action: PeerAction) {
  switch (action.type) {
    case ADD_PEER: {
      const { userId, userName, peerId } = action.payload;
      return {
        ...state,
        [userId]: { userId, userName, peerId },
      };
    }
    case REMOVE_PEER: {
      const { userId } = action.payload;
      const newState = { ...state };
      delete newState[userId];
      return newState;
    }
    case ADD_ALL_PEERS: {
      const { peers } = action.payload;
      return peers;
    }
    case ADD_PEER_STREAM: {
      const { userId, stream } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], stream },
      };
    }
    case ADD_PEER_NAME: {
      const { userId, userName } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], userName },
      };
    }
  }
}
