import React, {createContext} from 'react';

const TrackerContext = createContext();

export default TrackerContext;
export const  TrackerProvider = TrackerContext.Provider;