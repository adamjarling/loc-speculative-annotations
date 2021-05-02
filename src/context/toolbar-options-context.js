import React from 'react';
import { brandColors } from 'styles/brandPalette';
import { isMobile, isTablet } from 'react-device-detect';
import { ReactComponent as PenSm } from 'images/pen-weight-icons/ThinStroke.svg';
import { ReactComponent as PenMd } from 'images/pen-weight-icons/MediumStroke.svg';
import { ReactComponent as PenLg } from 'images/pen-weight-icons/ThickStroke.svg';

const ToolbarOptionsStateContext = React.createContext();
const ToolbarOptionsDispatchContext = React.createContext();

export const brushWidths = [
  {
    pixelWidth: isMobile && !isTablet ? 6 : 10,
    size: 'Sm',
    IconSVG: PenSm,
  },
  {
    pixelWidth: isMobile && !isTablet ? 12 : 18,
    size: 'Md',
    IconSVG: PenMd,
  },
  { pixelWidth: isMobile && !isTablet ? 24 : 40, size: 'Lg', IconSVG: PenLg },
];

const defaultState = {
  brushWidth: brushWidths[0],
  color: brandColors[0],
};

function toolbarOptionsReducer(state, action) {
  switch (action.type) {
    case 'updateColor': {
      return {
        ...state,
        color: action.color,
      };
    }
    case 'updateBrushWidth': {
      return {
        ...state,
        brushWidth: action.brushWidth,
      };
    }
    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
}

function ToolbarOptionsProvider({ initialState = defaultState, children }) {
  const [state, dispatch] = React.useReducer(
    toolbarOptionsReducer,
    initialState
  );
  return (
    <ToolbarOptionsStateContext.Provider value={state}>
      <ToolbarOptionsDispatchContext.Provider value={dispatch}>
        {children}
      </ToolbarOptionsDispatchContext.Provider>
    </ToolbarOptionsStateContext.Provider>
  );
}

function useToolbarOptionsState() {
  const context = React.useContext(ToolbarOptionsStateContext);
  if (context === undefined) {
    throw new Error(
      'useToolbarOptionsState must be used within ToolbarOptionsProvider'
    );
  }
  return context;
}

function useToolbarOptionsDispatch() {
  const context = React.useContext(ToolbarOptionsDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useToolbarOptionsDispatch must be used within ToolbarOptionsProvider'
    );
  }
  return context;
}

export {
  ToolbarOptionsProvider,
  useToolbarOptionsState,
  useToolbarOptionsDispatch,
};
