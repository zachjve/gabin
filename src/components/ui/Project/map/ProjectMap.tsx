// components/project/map/ProjectMap.tsx
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ProjectDetails } from '@/components/ui/Project/types/project-detail';
import { getStoredMapPosition, saveMapPosition } from '@/components/ui/Project/utils/mapUtils';
import { useTheme } from '@/components/ui/hooks/useTheme';
import { fetchParcelleFromCoordinates, getCadastreData, saveCadastreData } from '@/components/ui/Project/cadastre/cadastreService';
import { CadastreParcelleResponse, ParcelleData } from '@/components/ui/Project/cadastre/cadastre-types';

// Configuration de l'API Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiemFjaGp2ZSIsImEiOiJjbTB6ZTE2bXQwNGp4MmlxdHVhZG9xNXJlIn0.xUXfl3QCRCfCQmlndZXaWg';

// Styles de carte pour les thèmes clair et sombre
const LIGHT_STYLE = 'mapbox://styles/zachjve/cm36b9umt00d101pdae103s3p';
const DARK_STYLE = 'mapbox://styles/zachjve/cm41kplvk007d01s6h7o60lep';

interface ProjectMapProps {
  project: ProjectDetails;
  className?: string;
}

const ProjectMap: React.FC<ProjectMapProps> = ({
  project,
  className = ""
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const isDarkTheme = useTheme();
  
  // Récupérer la position stockée ou utiliser les valeurs par défaut
  const storedPosition = getStoredMapPosition(project.id);
  const [lng, setLng] = useState(storedPosition?.lng || 2.3488);
  const [lat, setLat] = useState(storedPosition?.lat || 48.8534);
  const [zoom, setZoom] = useState(storedPosition?.zoom || 12);
  const [projectLocation, setProjectLocation] = useState<[number, number] | null>(null);
  const [parcelleData, setParcelleData] = useState<ParcelleData | null>(null);
  const [cadastreGeometry, setCadastreGeometry] = useState<any>(null);

  // Initialisation de la carte
  useEffect(() => {
    if (map.current) return; // La carte est déjà initialisée
    
    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: isDarkTheme ? DARK_STYLE : LIGHT_STYLE,
        center: [lng, lat],
        zoom: zoom
      });

      // Ajouter les contrôles de navigation
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Sauvegarder la position et le zoom lorsqu'ils changent
      map.current.on('moveend', () => {
        if (map.current) {
          const center = map.current.getCenter();
          const currentZoom = map.current.getZoom();
          
          setLng(center.lng);
          setLat(center.lat);
          setZoom(currentZoom);
          
          // Sauvegarder dans le localStorage
          saveMapPosition(project.id, {
            lng: center.lng,
            lat: center.lat,
            zoom: currentZoom
          });
        }
      });
      
      // Géocodage de l'adresse du projet pour centrer la carte et ajouter le marqueur
      geocodeAddress(project.address);
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
    };
  }, []);

  // Effet pour mettre à jour le style de la carte lorsque le thème change
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(isDarkTheme ? DARK_STYLE : LIGHT_STYLE);
    }
  }, [isDarkTheme]);

  // Effet pour afficher la géométrie de la parcelle sur la carte
  useEffect(() => {
    if (!map.current || !cadastreGeometry) return;

    // Convertir la couleur CSS en couleur hexadécimale
    const getColorValue = (cssVar: string): string => {
      // Couleurs par défaut au cas où la conversion échoue
      const defaultColors = {
        'var(--terracotta)': '#E07A5F',
        'var(--ocre)': '#F2CC8F',
        'var(--vert-olive)': '#81B29A',
        'var(--bleu-ardoise)': '#3D405B',
        'var(--mauve-terracotta)': '#9D6B53',
        'var(--gris-architecte)': '#5A5A5A'
      };
      
      // Utiliser la couleur par défaut si disponible
      if (defaultColors[cssVar as keyof typeof defaultColors]) {
        return defaultColors[cssVar as keyof typeof defaultColors];
      }
      
      // Sinon, retourner une couleur par défaut
      return '#81B29A';
    };
    
    const parcelleColor = getColorValue(project.color);

    // Attendre que la carte soit chargée
    map.current.on('load', () => {
      // Vérifier si la source existe déjà
      if (map.current?.getSource('parcelle-source')) {
        // Mettre à jour la source existante
        (map.current.getSource('parcelle-source') as mapboxgl.GeoJSONSource).setData(cadastreGeometry);
      } else {
        // Ajouter une nouvelle source
        map.current?.addSource('parcelle-source', {
          type: 'geojson',
          data: cadastreGeometry
        });

        // Ajouter une couche de remplissage pour la parcelle
        map.current?.addLayer({
          id: 'parcelle-fill',
          type: 'fill',
          source: 'parcelle-source',
          paint: {
            'fill-color': parcelleColor,
            'fill-opacity': 0.3
          }
        });

        // Ajouter une couche de contour pour la parcelle
        map.current?.addLayer({
          id: 'parcelle-line',
          type: 'line',
          source: 'parcelle-source',
          paint: {
            'line-color': parcelleColor,
            'line-width': 2
          }
        });
      }
    });

    // Si la carte est déjà chargée
    if (map.current.loaded()) {
      // Vérifier si la source existe déjà
      if (map.current.getSource('parcelle-source')) {
        // Mettre à jour la source existante
        (map.current.getSource('parcelle-source') as mapboxgl.GeoJSONSource).setData(cadastreGeometry);
      } else {
        // Ajouter une nouvelle source
        map.current.addSource('parcelle-source', {
          type: 'geojson',
          data: cadastreGeometry
        });

        // Ajouter une couche de remplissage pour la parcelle
        map.current.addLayer({
          id: 'parcelle-fill',
          type: 'fill',
          source: 'parcelle-source',
          paint: {
            'fill-color': parcelleColor,
            'fill-opacity': 0.3
          }
        });

        // Ajouter une couche de contour pour la parcelle
        map.current.addLayer({
          id: 'parcelle-line',
          type: 'line',
          source: 'parcelle-source',
          paint: {
            'line-color': parcelleColor,
            'line-width': 2
          }
        });
      }
    }
  }, [cadastreGeometry, map.current]);

  // Fonction pour géocoder une adresse
  const geocodeAddress = async (address: string) => {
    try {
      console.log("Géocodage de l'adresse:", address);
      
      // Vérifier d'abord si les données cadastrales sont déjà en cache
      const cachedData = getCadastreData(project.id);
      
      if (cachedData && cachedData.features && cachedData.features.length > 0) {
        console.log("Données cadastrales trouvées en cache avant géocodage:", cachedData);
        // Utiliser directement les données en cache
        processCadastreData(cachedData);
        
        // Récupérer les coordonnées de la parcelle pour positionner le marqueur
        const feature = cachedData.features[0];
        if (feature.geometry && feature.geometry.coordinates) {
          // Pour un polygone ou multipolygone, utiliser le premier point ou le centroïde
          let coordinates;
          if (feature.geometry.type === 'Polygon') {
            coordinates = feature.geometry.coordinates[0][0];
          } else if (feature.geometry.type === 'MultiPolygon') {
            coordinates = feature.geometry.coordinates[0][0][0];
          }
          
          if (coordinates) {
            const [longitude, latitude] = coordinates;
            console.log("Coordonnées extraites de la parcelle en cache:", longitude, latitude);
            setProjectLocation([longitude, latitude]);
            
            // Centrer la carte si nécessaire
            if (!storedPosition && map.current) {
              map.current.flyTo({
                center: [longitude, latitude],
                zoom: 15,
                essential: true
              });
            }
            
            // Ajouter un marqueur
            if (map.current) {
              if (marker.current) {
                marker.current.remove();
              }
              
              marker.current = new mapboxgl.Marker({ color: project.color })
                .setLngLat([longitude, latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${project.title}</h3><p>${project.address}</p>`))
                .addTo(map.current);
            }
            
            // Sortir de la fonction car nous avons déjà les données
            return;
          }
        }
      }
      
      // Si pas de données en cache ou si les coordonnées n'ont pas pu être extraites, procéder au géocodage
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}&limit=1`
      );
      
      const data = await response.json();
      console.log("Résultat du géocodage:", data);
      
      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        console.log("Coordonnées trouvées:", longitude, latitude);
        setProjectLocation([longitude, latitude]);
        
        // Si aucune position n'est stockée, centrer la carte sur l'adresse
        if (!storedPosition && map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 15,
            essential: true
          });
        }
        
        // Ajouter un marqueur à l'emplacement du projet
        if (map.current) {
          if (marker.current) {
            marker.current.remove();
          }
          
          marker.current = new mapboxgl.Marker({ color: project.color })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${project.title}</h3><p>${project.address}</p>`))
            .addTo(map.current);
        }
        
        // Récupérer les données cadastrales
        await fetchCadastreData(longitude, latitude);
      }
    } catch (error) {
      console.error('Erreur lors du géocodage de l\'adresse:', error);
    }
  };

  // Fonction pour récupérer les données cadastrales
  const fetchCadastreData = async (longitude: number, latitude: number) => {
    console.log("Récupération des données cadastrales pour:", longitude, latitude);
    
    // Vérifier si les données sont déjà en cache
    const cachedData = getCadastreData(project.id);
    
    if (cachedData) {
      console.log("Données cadastrales trouvées en cache:", cachedData);
      // Utiliser les données en cache
      processCadastreData(cachedData);
      return;
    }
    
    // Sinon, appeler l'API
    console.log("Appel de l'API cadastre...");
    const cadastreData = await fetchParcelleFromCoordinates(longitude, latitude);
    console.log("Réponse de l'API cadastre:", cadastreData);
    
    if (cadastreData && cadastreData.features && cadastreData.features.length > 0) {
      console.log("Données de parcelle trouvées:", cadastreData.features[0]);
      // Sauvegarder les données dans le localStorage
      saveCadastreData(project.id, cadastreData);
      
      // Traiter les données
      processCadastreData(cadastreData);
    } else {
      console.log("Aucune parcelle trouvée pour ces coordonnées");
    }
  };
  
  // Fonction pour traiter les données cadastrales
  const processCadastreData = (cadastreData: CadastreParcelleResponse) => {
    console.log("Traitement des données cadastrales:", cadastreData);
    if (cadastreData.features && cadastreData.features.length > 0) {
      const feature = cadastreData.features[0];
      const props = feature.properties;
      
      console.log("Propriétés de la parcelle:", props);
      
      // Extraire les informations pertinentes
      const extractedData: ParcelleData = {
        numero: props.numero,
        section: props.section,
        feuille: props.feuille,
        commune: props.code_com,
        departement: props.code_dep
      };
      
      console.log("Données extraites:", extractedData);
      setParcelleData(extractedData);
      
      // Stocker la géométrie pour l'afficher sur la carte
      console.log("Géométrie de la parcelle:", feature.geometry);
      setCadastreGeometry({
        type: 'Feature',
        geometry: feature.geometry,
        properties: {}
      });
    } else {
      console.log("Aucune feature trouvée dans les données cadastrales");
    }
  };

  return (
    <div className={`relative h-full w-full ${className}`}>      
      {/* Conteneur de la carte Mapbox */}
      <div ref={mapContainer} className="h-full w-full absolute inset-0" />
      
      {/* Affichage des informations de parcelle si disponibles */}
      {parcelleData && (
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg text-sm z-10">
          <h3 className="font-bold text-base mb-1">Informations cadastrales</h3>
          <p className="font-semibold">Parcelle: {parcelleData.section}-{parcelleData.numero}</p>
          <p>Feuille: {parcelleData.feuille}</p>
          <p>Commune: {parcelleData.commune}</p>
          <p>Département: {parcelleData.departement}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectMap;