// types/project-detail.ts
export interface Document {
    id: number;
    name: string;
    type: string;
    date: string;
    size: string;
  }
  
  export interface TeamMember {
    id: number;
    name: string;
    role: string;
    email: string;
  }
  
  export interface ProjectDetails {
    id: number;
    title: string;
    address: string;
    lastUpdated: string;
    status: string;
    color: string;
    description: string;
    surface: number;
    parcelle: string;
    zone: string;
    documents: Document[];
    team: TeamMember[];
  }
  
  export type ProjectTab = 'zones' | 'documents' | 'conversation';
  
  export interface Message {
    sender: 'user' | 'assistant';
    text: string;
    timestamp?: Date;
  }