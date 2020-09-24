import React, {createContext} from 'react';

const PlayContext = createContext();

export default PlayContext;
export const PlayProvider = PlayContext.Provider;