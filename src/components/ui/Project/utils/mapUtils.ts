// utils/mapUtils.ts

// Interface pour la position de la carte
export interface MapPosition {
  lng: number;
  lat: number;
  zoom: number;
}

// Clé pour le localStorage
const getMapPositionKey = (projectId: number) => `project_${projectId}_map_position`;

// Fonction pour récupérer la position stockée
export const getStoredMapPosition = (projectId: number): MapPosition | null => {
  if (typeof window === 'undefined') return null;
  
  const storedData = localStorage.getItem(getMapPositionKey(projectId));
  if (!storedData) return null;
  
  try {
    return JSON.parse(storedData) as MapPosition;
  } catch (error) {
    console.error('Erreur lors de la récupération de la position de la carte:', error);
    return null;
  }
};

// Fonction pour sauvegarder la position
export const saveMapPosition = (projectId: number, position: MapPosition): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(getMapPositionKey(projectId), JSON.stringify(position));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la position de la carte:', error);
  }
}; 