// Types pour les données cadastrales

export interface CadastreFeature {
  type: string;
  id: string;
  properties: {
    numero: string;
    feuille: number;
    section: string;
    code_dep: string;
    code_com: string;
    com_abs: string;
    echelle: string;
    code_arr: string;
  };
  geometry: {
    type: string;
    coordinates: any;
  };
}

export interface CadastreParcelleResponse {
  type: string;
  features: CadastreFeature[];
}

// Type pour les données de parcelle extraites
export interface ParcelleData {
  numero: string;
  section: string;
  feuille: number;
  commune: string;
  departement: string;
} 