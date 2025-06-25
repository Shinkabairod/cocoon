
// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:7860';

export class ApiService {
  private baseUrl = API_BASE_URL;

  async askAI(userId: string, question: string) {
    const response = await fetch(`${this.baseUrl}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, question })
    });
    return response.json();
  }

  async saveProfile(userId: string, profileData: any) {
    const response = await fetch(`${this.baseUrl}/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, profile_data: profileData })
    });
    return response.json();
  }

  async uploadFile(userId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);
    
    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  }
}

export const apiService = new ApiService();
