import React, {createContext} from 'react';

const SamplerContext = createContext();

export default SamplerContext;
export const SamplerProvider = SamplerContext.Provider;