import React, {createContext} from 'react';

const PianoContext = createContext();

export default PianoContext;
export const PianoProvider = PianoContext.Provider;