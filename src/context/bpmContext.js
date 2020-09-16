import React, {createContext} from 'react';

const BpmContext = createContext();

export default BpmContext;
export const  BpmProvider = BpmContext.Provider;
