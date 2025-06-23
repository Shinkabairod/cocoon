
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save, FileText, Clock, BookOpen } from 'lucide-react';
import { FileContent } from '@/types/folders';
import { useFolderSystem } from '@/hooks/useFolderSystem';
import { useToast } from '@/hooks/use-toast';

interface FileEditorProps {
  file: FileContent | null;
  onClose?: () => void;
}

const FileEditor = ({ file, onClose }: FileEditorProps) => {
  const { updateFile } = useFolderSystem();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<FileContent['contentType']>('note');
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (file) {
      setTitle(file.title);
      setContent(file.content);
      setContentType(file.contentType);
      setIsModified(false);
    }
  }, [file]);

  useEffect(() => {
    if (file && (title !== file.title || content !== file.content || contentType !== file.contentType)) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [title, content, contentType, file]);

  const handleSave = async () => {
    if (!file || !isModified) return;

    try {
      await updateFile(file.id, {
        title,
        content,
        contentType
      });

      toast({
        title: "File saved",
        description: "Your changes have been saved successfully.",
      });

      setIsModified(false);
    } catch (error) {
      toast({
        title: "Error saving file",
        description: "There was an error saving your changes.",
        variant: "destructive",
      });
    }
  };

  if (!file) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>Select a file to edit</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            File Editor
            {isModified && (
              <Badge variant="secondary" className="ml-2">
                Unsaved
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleSave} 
              disabled={!isModified}
              size="sm"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            {onClose && (
              <Button onClick={onClose} variant="outline" size="sm">
                Close
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="file-title">Title</Label>
            <Input
              id="file-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter file title..."
            />
          </div>
          <div>
            <Label htmlFor="content-type">Content Type</Label>
            <Select value={contentType} onValueChange={(value) => setContentType(value as FileContent['contentType'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="note">Note</SelectItem>
                <SelectItem value="resource">Resource</SelectItem>
                <SelectItem value="script">Script</SelectItem>
                <SelectItem value="idea">Idea</SelectItem>
                <SelectItem value="concept">Concept</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="file-content">Content</Label>
          <Textarea
            id="file-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your content..."
            className="min-h-[400px] resize-none"
          />
        </div>

        {file.metadata && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{file.metadata.wordCount || 0} words</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{file.metadata.readingTime || 0} min read</span>
            </div>
            {file.metadata.lastModified && (
              <div className="flex items-center gap-1">
                <span>Last modified: {new Date(file.metadata.lastModified).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileEditor;
