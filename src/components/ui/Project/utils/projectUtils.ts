// services/projectUtils.ts
import { ProjectDetails } from '@/components/ui/Project/types/project-detail';

// Tableau des couleurs disponibles
const projectColors = [
  "var(--terracotta)",
  "var(--ocre)",
  "var(--vert-olive)",
  "var(--bleu-ardoise)",
  "var(--mauve-terracotta)",
  "var(--gris-architecte)"
];

// Fonction pour attribuer une couleur en fonction de l'ID du projet
export const getColorForProject = (id: number) => {
  return projectColors[(id - 1) % projectColors.length];
};

// Format de dates commun
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Simuler une API pour récupérer les détails d'un projet
export const fetchProjectDetails = async (projectId: number): Promise<ProjectDetails> => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 800));

  // Données fictives pour le projet
  const projectData: ProjectDetails = {
    id: projectId,
    title: projectId === 1 ? "Résidence Les Oliviers" : 
           projectId === 2 ? "Immeuble Haussmannien" : 
           projectId === 3 ? "Rénovation Villa Méditerranée" :
           projectId === 4 ? "Centre commercial Étoile" :
           projectId === 5 ? "Complexe sportif Municipal" :
           "Résidence étudiante Campus",
    address: projectId === 1 ? "12 rue des Lilas, 75020 Paris" :
             projectId === 2 ? "45 boulevard Saint-Germain, 75006 Paris" :
             projectId === 3 ? "8 boulevard de la Mer, 06400 Cannes" :
             projectId === 4 ? "23 rue du Commerce, 33000 Bordeaux" :
             projectId === 5 ? "7 avenue des Sports, 59000 Lille" :
             "12 rue Universitaire, 31000 Toulouse",
    lastUpdated: projectId === 1 ? "2023-11-15" :
                 projectId === 2 ? "2023-11-10" :
                 projectId === 3 ? "2024-01-10" :
                 projectId === 4 ? "2023-10-05" :
                 projectId === 5 ? "2023-09-18" :
                 "2023-08-22",
    status: projectId === 1 || projectId === 4 ? "En cours" :
            projectId === 2 || projectId === 6 ? "En attente" :
            "Terminé",
    color: getColorForProject(projectId),
    description: "Ce projet consiste en la " + 
                (projectId === 1 ? "construction d'une résidence de standing comprenant 24 logements répartis sur 4 étages, avec un espace vert commun et un parking souterrain." :
                 projectId === 2 ? "rénovation complète d'un immeuble haussmannien du 19ème siècle pour y aménager 8 appartements de luxe tout en préservant les éléments architecturaux d'origine." :
                 projectId === 3 ? "rénovation d'une villa de 350m² avec vue sur mer, incluant l'extension de la terrasse et la création d'une piscine à débordement." :
                 projectId === 4 ? "construction d'un centre commercial de 15 000m² comprenant 45 boutiques, un hypermarché et un food court avec 8 restaurants." :
                 projectId === 5 ? "construction d'un complexe sportif municipal comprenant un gymnase, une piscine olympique et des terrains de tennis couverts." :
                 "construction d'une résidence étudiante de 120 studios avec espaces communs, salle d'étude et cafétéria."),
    surface: projectId === 1 ? 2400 :
             projectId === 2 ? 1200 :
             projectId === 3 ? 350 :
             projectId === 4 ? 15000 :
             projectId === 5 ? 8500 :
             3600,
    parcelle: "AB-" + (projectId * 123 + 456),
    zone: projectId === 1 || projectId === 2 ? "UA" :
          projectId === 3 ? "UB" :
          projectId === 4 ? "UX" :
          projectId === 5 ? "UE" :
          "UC",
    documents: [
      {
        id: 1,
        name: "Plan Local d'Urbanisme",
        type: "PDF",
        date: "2022-05-15",
        size: "4.2 MB"
      },
      {
        id: 2,
        name: "Règlement de zone " + (projectId === 1 || projectId === 2 ? "UA" :
                                      projectId === 3 ? "UB" :
                                      projectId === 4 ? "UX" :
                                      projectId === 5 ? "UE" :
                                      "UC"),
        type: "PDF",
        date: "2022-05-15",
        size: "1.8 MB"
      },
      {
        id: 3,
        name: "Plan de masse",
        type: "DWG",
        date: "2023-09-10",
        size: "3.5 MB"
      },
      {
        id: 4,
        name: "Étude de sol",
        type: "PDF",
        date: "2023-07-22",
        size: "2.1 MB"
      },
      {
        id: 5,
        name: "Servitudes d'utilité publique",
        type: "PDF",
        date: "2022-05-15",
        size: "1.2 MB"
      }
    ],
    team: [
      {
        id: 1,
        name: "Sophie Martin",
        role: "Chef de projet",
        email: "s.martin@exemple.fr"
      },
      {
        id: 2,
        name: "Thomas Dubois",
        role: "Architecte",
        email: "t.dubois@exemple.fr"
      },
      {
        id: 3,
        name: "Julie Leroy",
        role: "Urbaniste",
        email: "j.leroy@exemple.fr"
      }
    ]
  };

  return projectData;
};