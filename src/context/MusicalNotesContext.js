import React, {createContext} from 'react';

const MusicalNotesContext = createContext();

export default MusicalNotesContext;
export const MusicalNotesProvider = MusicalNotesContext.Provider;