// src/lib/api.ts - SERVICE API COMPLET
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7860';

export class ApiService {
  private baseUrl = API_BASE_URL;

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // === HEALTH & STATUS ===
  async healthCheck() {
    return this.request('/health');
  }

  async ping() {
    return this.request('/ping');
  }

  // === PROFILE ===
  async saveProfile(userId: string, profileData: any) {
    return this.request('/profile', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        profile_data: profileData
      })
    });
  }

  async getUserStatus(userId: string) {
    return this.request(`/user/${userId}/status`);
  }

  async getVaultStructure(userId: string) {
    return this.request(`/user/${userId}/vault_structure`);
  }

  // === AI CHAT ===
  async askAI(userId: string, question: string) {
    return this.request('/ask', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        question: question
      })
    });
  }

  // === NOTES ===
  async saveNote(userId: string, title: string, content: string) {
    return this.request('/note', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        title: title,
        content: content
      })
    });
  }

  // === UPLOAD ===
  async uploadFile(userId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
      headers: {} // Remove Content-Type for FormData
    });
  }

  // === RESOURCES ===
  async uploadUrl(userId: string, url: string, title?: string) {
    return this.request('/upload_url', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        url: url,
        title: title
      })
    });
  }
}

export const apiService = new ApiService();

// === HOOKS REACT ===
import { useState, useCallback } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = useCallback(async <T>(
    apiCall: () => Promise<T>
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err