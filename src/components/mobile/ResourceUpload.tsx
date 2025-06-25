
import React, { useState } from 'react';
import { apiService } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ResourceUpload = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!user) return;
    
    setUploading(true);
    try {
      await apiService.uploadFile(user.id, file);
      toast({ title: "✅ Fichier uploadé !" });
    } catch (error) {
      toast({ title: "❌ Erreur d'upload" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="block w-full p-4 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50"
      >
        {uploading ? "Upload en cours..." : "📁 Ajouter un fichier"}
      </label>
    </div>
  );
};

export default ResourceUpload;
