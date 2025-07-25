import React, { createContext, useState } from "react";

// ✅ Create Context
export const SelectedChapterIndexContext = createContext(null);

// ✅ Context Provider
export const SelectedChapterIndexProvider = ({ children }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(null);

  return (
    <SelectedChapterIndexContext.Provider
      value={{ selectedChapterIndex, setSelectedChapterIndex }}
    >
      {children}
    </SelectedChapterIndexContext.Provider>
  );
};
 