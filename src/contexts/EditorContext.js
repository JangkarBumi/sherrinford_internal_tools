import React, { useContext, useState } from 'react';

const EditorContext = React.createContext();

export function useEditor() {
  return useContext(EditorContext);
}

export function EditorProvider({ children }) {
  const [postData, setPostData] = useState({});

  const value = {
    postData,
    setPostData,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
