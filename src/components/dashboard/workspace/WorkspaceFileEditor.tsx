// src/components/dashboard/workspace/WorkspaceFileEditor.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Icons, Icon2D, getIcon } from '@/components/ui/icons';

interface WorkspaceFileEditorProps {
  selectedFile: any;
  selectedFolder: any;
  onClose: () => void;
  onSaveFile?: (fileId: string, content: string) => Promise<boolean>;
}

export const WorkspaceFileEditor: React.FC<WorkspaceFileEditorProps> = ({
  selectedFile,
  selectedFolder,
  onClose,
  onSaveFile
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (selectedFile) {
      setContent(selectedFile.content || '');
      setIsEditing(false);
    }
  }, [selectedFile]);

  const handleSave = async () => {
    if (!selectedFile || !onSaveFile) return;
    
    setSaving(true);
    try {
      const success = await onSaveFile(selectedFile.id, content);
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving file:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleOpenLink = () => {
    if (selectedFile?.url) {
      window.open(selectedFile.url, '_blank');
    }
  };

  if (!selectedFile && !selectedFolder) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <div className="text-center text-muted-foreground">
            <Icon2D icon={Icons.files.FileText} size={48} className="mx-auto mb-4 opacity-50" />
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
            <div className="flex items-center gap-2">
              <Icon2D 
                icon={getIcon('folders', selectedFolder.emoji) || Icons.folders.Folder} 
                size={20}
                color={selectedFolder.color}
              />
              <span>{selectedFolder.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon2D icon={Icons.actions.X} size={16} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Folder contains {selectedFolder.files.length} files
            </p>
            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
              {selectedFolder.files.map((file: any) => (
                <Card key={file.id} className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon2D 
                        icon={file.type === 'link' ? Icons.files.Link : Icons.files.FileText} 
                        size={16} 
                      />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {file.type}
                      </span>
                      {file.url && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <Icon2D icon={Icons.actions.ExternalLink} size={12} />
                        </Button>
                      )}
                    </div>
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
          <div className="flex items-center gap-2">
            <Icon2D 
              icon={selectedFile.type === 'link' ? Icons.files.Link : Icons.files.FileText} 
              size={20} 
            />
            <span>{selectedFile.name}</span>
            {selectedFile.size && (
              <span className="text-sm text-muted-foreground">({selectedFile.size})</span>
            )}
          </div>
          <div className="flex gap-2">
            {selectedFile.type === 'link' && selectedFile.url && (
              <Button variant="outline" size="sm" onClick={handleOpenLink}>
                <Icon2D icon={Icons.actions.ExternalLink} size={16} className="mr-1" />
                Open
              </Button>
            )}
            {isEditing ? (
              <>
                <Button 
                  size="sm" 
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Icon2D icon={Icons.actions.Save} size={16} className="mr-1" />
                      Save
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setIsEditing(false);
                    setContent(selectedFile.content || '');
                  }}
                  disabled={saving}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
              >
                <Icon2D icon={Icons.actions.Edit} size={16} className="mr-1" />
                Edit
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon2D icon={Icons.actions.X} size={16} />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-80px)]">
        {selectedFile.type === 'link' ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded border">
              <p className="text-sm text-blue-800 mb-2">Resource Link:</p>
              <a 
                href={selectedFile.url || selectedFile.content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {selectedFile.url || selectedFile.content}
              </a>
            </div>
            {isEditing && (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add notes about this resource..."
                className="min-h-32"
              />
            )}
          </div>
        ) : isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none font-mono text-sm"
            placeholder="Start typing your content..."
          />
        ) : (
          <div className="w-full h-full p-4 bg-gray-50 rounded border overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {content || 'No content yet. Click Edit to add content.'}
            </pre>
          </div>
        )}
        
        {selectedFile.lastModified && (
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
            Last modified: {selectedFile.lastModified}
          </div>
        )}
      </CardContent>
    </Card>
  );
};h-4 w-4 mr-1" />
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
        {selectedFile.type === 'link' ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded border">
              <p className="text-sm text-blue-800 mb-2">Resource Link:</p>
              <a 
                href={selectedFile.url || selectedFile.content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {selectedFile.url || selectedFile.content}
              </a>
            </div>
            {isEditing && (
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add notes about this resource..."
                className="min-h-32"
              />
            )}
          </div>
        ) : isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full resize-none font-mono text-sm"
            placeholder="Start typing your content..."
          />
        ) : (
          <div className="w-full h-full p-4 bg-gray-50 rounded border overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {content || 'No content yet. Click Edit to add content.'}
            </pre>
          </div>
        )}
        
        {selectedFile.lastModified && (
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
            Last modified: {selectedFile.lastModified}
          </div>
        )}
      </CardContent>
    </Card>
  );
};