import * as types from './actionTypes';

export const clearGraph = () => ({
  type: types.CLEAR_GRAPH,
});

export const fetchNodes = (nodes, edges) => ({
  type: types.FETCH_NODES,
  payload: { nodes, edges },
});

export const setActiveNode = node => ({
  type: types.SET_ACTIVE_NODE,
  payload: node,
});

export const clearActiveNode = () => ({
  type: types.CLEAR_NODE,
});

export const setActiveEdge = edge => ({
  type: types.SET_ACTIVE_EDGE,
  payload: edge,
});

export const setFocusMode = value => ({
  type: types.SET_FOCUS_MODE,
  payload: value,
});

export const updateNode = node => ({
  type: types.UPDATE_NODE,
  payload: node,
});

export const addFiles = files => ({
  type: types.NODE_ADD_FILES,
  files,
});
