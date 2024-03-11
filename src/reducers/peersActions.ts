import { PeerState } from "./peersReducer";

export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;
export const ADD_ALL_PEERS = "ADD_ALL_PEERS" as const;
export const ADD_PEER_STREAM = "ADD_PEER_STREAM" as const;
export const ADD_PEER_NAME = "ADD_PEER_NAME" as const;

export function addPeer(userId: string, userName: string, peerId: string) {
  return {
    type: ADD_PEER,
    payload: {
      userId,
      userName,
      peerId,
    },
  };
}

export function removePeer(userId: string) {
  return {
    type: REMOVE_PEER,
    payload: {
      userId,
    },
  };
}

export function addAllPeers(peers: PeerState) {
  return {
    type: ADD_ALL_PEERS,
    payload: {
      peers,
    },
  };
}

export function addPeerStream(userId: string, stream: MediaStream) {
  return {
    type: ADD_PEER_STREAM,
    payload: {
      userId,
      stream,
    },
  };
}

export function addPeerName(userId: string, userName: string) {
  return {
    type: ADD_PEER_NAME,
    payload: {
      userId,
      userName,
    },
  };
}
