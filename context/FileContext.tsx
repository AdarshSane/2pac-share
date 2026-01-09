
import { createContext, useContext } from 'react';

interface FileContextType {
  activeFile: File | null;
  transferId: string | null;
  startTransfer: (file: File) => void;
  resetTransfer: () => void;
}

export const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFile = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFile must be used within a FileProvider');
  }
  return context;
};
