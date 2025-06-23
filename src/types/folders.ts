
export interface FolderItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  parentId?: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  tags?: string[];
  color?: string;
  icon?: string;
}

export interface FileContent {
  id: string;
  folderId: string;
  title: string;
  content: string;
  contentType: 'note' | 'resource' | 'script' | 'idea' | 'concept';
  metadata?: {
    wordCount?: number;
    readingTime?: number;
    lastModified?: Date;
  };
}

export interface FolderStructure {
  folders: FolderItem[];
  files: FileContent[];
}
