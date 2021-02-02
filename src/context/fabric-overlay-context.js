import React from 'react';

const FabricOverlayStateContext = React.createContext();
const FabricOverlayDispatchContext = React.createContext();

function getLocalUserCanvases() {
  const userCanvases = window.localStorage.getItem('userCanvases');
  if (!userCanvases) {
    window.localStorage.setItem('userCanvases', JSON.stringify({}));
    return {};
  } else {
    return JSON.parse(userCanvases);
  }
}

const defaultState = {
  activeTool: null,
  activeUserCanvas: '',
  fabricOverlay: null,
  isToolSettingsVisible: false,
  userCanvases: getLocalUserCanvases(),
  viewer: null,
};

function fabricOverlayReducer(state, action) {
  switch (action.type) {
    case 'toggleToolSettingsVisible': {
      return {
        ...state,
        isToolSettingsVisible: !state.isToolSettingsVisible,
      };
    }
    case 'updateActiveUserCanvas': {
      return {
        ...state,
        activeUserCanvas: action.activeUserCanvas,
      };
    }
    case 'updateOverlay': {
      return {
        ...state,
        fabricOverlay: action.fabricOverlay,
        viewer: action.viewer,
      };
    }
    case 'updateTool': {
      return {
        ...state,
        activeTool: action.tool,
      };
    }
    case 'updateUserCanvases': {
      // Update localStorage
      window.localStorage.setItem(
        'userCanvases',
        JSON.stringify(action.userCanvases)
      );

      // Update context state
      return {
        ...state,
        activeUserCanvas: action.activeUserCanvas,
        userCanvases: action.userCanvases,
      };
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
}

function FabricOverlayProvider({ initialState = defaultState, children }) {
  const [state, dispatch] = React.useReducer(
    fabricOverlayReducer,
    initialState
  );
  return (
    <FabricOverlayStateContext.Provider value={state}>
      <FabricOverlayDispatchContext.Provider value={dispatch}>
        {children}
      </FabricOverlayDispatchContext.Provider>
    </FabricOverlayStateContext.Provider>
  );
}

function useFabricOverlayState() {
  const context = React.useContext(FabricOverlayStateContext);
  if (context === undefined) {
    throw new Error(
      'useFabricOverlayState must be used within a FabricOverlayProvider'
    );
  }
  return context;
}

function useFabricOverlayDispatch() {
  const context = React.useContext(FabricOverlayDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useFabricOverlayDispatch must be used within FabricOverlayProvider'
    );
  }
  return context;
}

export {
  FabricOverlayProvider,
  useFabricOverlayState,
  useFabricOverlayDispatch,
};
