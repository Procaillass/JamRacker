import React, {createContext} from 'react';

const DragDropContext = createContext();

export default DragDropContext;
export const  DragDropProvider = DragDropContext.Provider;
