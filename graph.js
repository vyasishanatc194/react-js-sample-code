/**
 * Created by PhpStorm.
 * User: TJ 
 * Date: 20/01/19
 * Time: 11:45 AM
 */
 
import { createReducer } from 'redux-starter-kit';
import * as types from 'Actions/actionTypes';

const initialState = {
  nodes: [],
  edges: [],
  active: {
    category: '',
    description: '',
    statement: '',
    files: [],
  },
  activeEdge: null,
  focus: false,
};

const graph = createReducer(initialState, {
  [types.FETCH_NODES]: (state, action) => {
    state.nodes = action.payload.nodes;
    state.edges = action.payload.edges;
  },
  [types.SET_ACTIVE_NODE]: (state, action) => {
    state.active = action.payload;
  },
  [types.CLEAR_NODE]: (state) => {
    state.active = null;
  },
  [types.SET_FOCUS_MODE]: (state, action) => {
    state.focus = action.payload;
  },
  [types.SET_ACTIVE_EDGE]: (state, action) => {
    state.activeEdge = action.payload;
  },
  [types.UPDATE_NODE]: (state, action) => {
    const index = state.nodes.findIndex(node => node.id === state.active.id);
    state.nodes[index] = action.payload;
    state.active = action.payload;
  },
  [types.NODE_ADD_FILES]: (state, action) => {
    state.active.files.push(...action.files);
  },
  [types.CLEAR_GRAPH]: () => initialState,
});

export default graph;
