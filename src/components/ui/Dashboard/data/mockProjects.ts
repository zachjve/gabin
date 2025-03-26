// data/mockProjects.ts
import { Project } from '@/components/ui/Dashboard/types/project';
import { getColorForProject } from '@/components/ui/Dashboard/utils/projectUtils';

export const mockProjects: Project[] = [
  {
    id: 1,
    title: "Résidence Les Oliviers",
    address: "12 rue des Lilas, 75020 Paris",
    lastUpdated: "2023-11-15",
    status: "En cours",
    color: getColorForProject(1),
    progress: 65,
    priority: 'Haute',
    isFavorite: true,
    deadline: "2024-06-30",
    budget: 1250000,
    team: ["Marie Dupont", "Jean Martin"]
  },
  {
    id: 2,
    title: "Immeuble Haussmannien",
    address: "45 boulevard Saint-Germain, 75006 Paris",
    lastUpdated: "2023-11-10",
    status: "En attente",
    color: getColorForProject(2),
    progress: 20,
    priority: 'Moyenne',
    isFavorite: false,
    deadline: "2024-09-15",
    budget: 3500000,
    team: ["Sophie Leclerc", "Thomas Bernard"]
  },
  {
    id: 3,
    title: "Rénovation Villa Méditerranée",
    address: "8 boulevard de la Mer, 06400 Cannes",
    lastUpdated: "2024-01-10",
    status: "Terminé",
    color: getColorForProject(3),
    progress: 100,
    priority: 'Moyenne',
    isFavorite: true,
    deadline: "2024-01-05",
    budget: 850000,
    team: ["Pierre Durand", "Camille Petit"]
  },
  {
    id: 4,
    title: "Centre commercial Étoile",
    address: "23 rue du Commerce, 33000 Bordeaux",
    lastUpdated: "2023-10-05",
    status: "En cours",
    color: getColorForProject(4),
    progress: 45,
    priority: 'Haute',
    isFavorite: false,
    deadline: "2024-08-20",
    budget: 5200000,
    team: ["Julien Moreau", "Émilie Blanc"]
  },
  {
    id: 5,
    title: "Complexe sportif Municipal",
    address: "7 avenue des Sports, 59000 Lille",
    lastUpdated: "2023-09-18",
    status: "Terminé",
    color: getColorForProject(5),
    progress: 100,
    priority: 'Basse',
    isFavorite: false,
    deadline: "2023-09-15",
    budget: 2100000,
    team: ["Alexandre Dubois", "Lucie Mercier"]
  },
  {
    id: 6,
    title: "Résidence étudiante Campus",
    address: "12 rue Universitaire, 31000 Toulouse",
    lastUpdated: "2023-08-22",
    status: "En attente",
    color: getColorForProject(6),
    progress: 10,
    priority: 'Moyenne',
    isFavorite: false,
    deadline: "2024-07-10",
    budget: 1800000,
    team: ["Nicolas Roux", "Aurélie Leroy"]
  },
];