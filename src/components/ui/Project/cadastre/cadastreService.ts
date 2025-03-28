// Service pour interagir avec l'API de cadastre
import { CadastreParcelleResponse } from '@/components/ui/Project/cadastre/cadastre-types';

const CADASTRE_API_BASE_URL = 'https://apicarto.ign.fr/api/cadastre';

// Fonction pour récupérer les informations de parcelle à partir de coordonnées géographiques
export const fetchParcelleFromCoordinates = async (
  longitude: number, 
  latitude: number
): Promise<CadastreParcelleResponse | null> => {
  try {
    // Création d'un point GeoJSON avec les coordonnées
    const pointGeometry = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    // Construction de l'URL avec les paramètres
    const url = `${CADASTRE_API_BASE_URL}/parcelle?geom=${encodeURIComponent(JSON.stringify(pointGeometry))}&source_ign=PCI`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Erreur lors de la requête cadastre: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données cadastrales:', error);
    return null;
  }
};

// Clé pour le stockage local des données cadastrales
const CADASTRE_STORAGE_KEY = 'project_cadastre_data_';

// Fonction pour sauvegarder les données cadastrales dans le localStorage
export const saveCadastreData = (projectId: number, cadastreData: CadastreParcelleResponse): void => {
  try {
    localStorage.setItem(`${CADASTRE_STORAGE_KEY}${projectId}`, JSON.stringify(cadastreData));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données cadastrales:', error);
  }
};

// Fonction pour récupérer les données cadastrales depuis le localStorage
export const getCadastreData = (projectId: number): CadastreParcelleResponse | null => {
  try {
    const storedData = localStorage.getItem(`${CADASTRE_STORAGE_KEY}${projectId}`);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération des données cadastrales stockées:', error);
    return null;
  }
}; 