import React, {createContext} from 'react';

const InstrumentContext = createContext();

export default InstrumentContext;
export const InstrumentProvider = InstrumentContext.Provider;