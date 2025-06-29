// src/components/dashboard/workspace/WorkspaceFileEditor.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Save, Edit } from 'lucide-react';

interface WorkspaceFileEditorProps {
  selectedFile: any;
  selectedFolder: any;
  onClose: () => void;
}

export const WorkspaceFileEditor: React.FC<WorkspaceFileEditorProps> = ({
  selectedFile,
  selectedFolder,
  onClose
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState(selectedFile?.content || '');

  React.useEffect(() => {
    if (selectedFile) {
      setContent(selectedFile.content || '');
      setIsEditing(false);
    }
  }, [selectedFile]);

  const handleSave = () => {
    // Logique de sauvegarde
    console.log('Saving file:', selectedFile.id, content);
    setIsEditing(false);
  };

  if (!selectedFile && !selectedFolder) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a file or folder to start editing</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (selectedFolder && !selectedFile) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{selectedFolder.name}</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Folder contains {selectedFolder.files.length} files
            </p>
            <div className="grid grid-cols-1 gap-2">
              {selectedFolder.files.map((file: any) => (
                <Card key={file.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {file.type}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{selectedFile.name}</span>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)]">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none"
            placeholder="Start typing your content..."
          />
        ) : (
          <div className="w-full h-full p-4 bg-gray-50 rounded border overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm">
              {content || 'No content yet. Click Edit to add content.'}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
