
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';

interface FolderViewProps {
  folder: any;
  onBack: () => void;
  onAddFile: () => void;
  onFilePreview: (file: any) => void;
}

const FolderView: React.FC<FolderViewProps> = ({
  folder,
  onBack,
  onAddFile,
  onFilePreview
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{folder.name}</h1>
        </div>
        <Button onClick={onAddFile}>
          <Plus className="h-4 w-4 mr-2" />
          Add File
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folder.files.map((file: any) => (
          <div
            key={file.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => onFilePreview(file)}
          >
            <h3 className="font-medium">{file.name}</h3>
            <p className="text-sm text-gray-500">{file.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderView;
