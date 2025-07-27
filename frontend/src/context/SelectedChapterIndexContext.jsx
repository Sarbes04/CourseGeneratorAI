import React, { createContext, useState } from "react";


export const SelectedChapterIndexContext = createContext(null);


export const SelectedChapterIndexProvider = ({ children }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  return (
    <SelectedChapterIndexContext.Provider
      value={{ selectedChapterIndex, setSelectedChapterIndex }}
    >
      {children}
    </SelectedChapterIndexContext.Provider>
  );
};
 