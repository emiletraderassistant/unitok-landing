import { LandingData, Project, ProjectMetric } from '../models/landing.model';
import { ProyectoRoi } from '../models/proyecto-roi.model';

export function mergeLandingWithRoi(landing: LandingData, rois: ProyectoRoi[]): LandingData {
  return {
    ...landing,
    distributedAmount: formatCompactUsd(sumDistributed(rois)),
    projects: landing.projects.map((project) => applyRoiToProject(project, rois)),
  };
}

function applyRoiToProject(project: Project, rois: ProyectoRoi[]): Project {
  const match = findProyectoRoi(project, rois);
  if (!match) {
    return project;
  }

  return {
    ...project,
    metrics: toMetrics(match),
  };
}

function findProyectoRoi(project: Project, rois: ProyectoRoi[]): ProyectoRoi | undefined {
  if (project.apiId != null) {
    const byId = rois.find((item) => item.id === project.apiId);
    if (byId) {
      return byId;
    }
  }

  const name = normalize(project.name);
  return rois.find((item) => {
    const titulo = normalize(item.titulo);
    return titulo === name || titulo.includes(name) || name.includes(titulo);
  });
}

function toMetrics(proyecto: ProyectoRoi): ProjectMetric[] {
  const earnings = proyecto.roi?.totalEarningsPerNFT ?? 0;
  const nfts = proyecto.numnfts ?? 0;
  const minPrice = proyecto.minprice ?? 0;
  const totalDistributed = earnings * nfts;
  const accumulatedRoi = minPrice > 0 ? (earnings / minPrice) * 100 : 0;

  return [
    {
      label: 'Distribuciones',
      value: formatInteger(proyecto.roi?.totalDistributions ?? 0),
    },
    {
      label: 'Total Distribuido',
      value: formatUsd(totalDistributed),
    },
    {
      label: 'ROI Acumulado',
      value: formatPercent(accumulatedRoi),
      highlight: true,
    },
  ];
}

function sumDistributed(rois: ProyectoRoi[]): number {
  return rois.reduce((total, proyecto) => {
    const earnings = proyecto.roi?.totalEarningsPerNFT ?? 0;
    const nfts = proyecto.numnfts ?? 0;
    return total + earnings * nfts;
  }, 0);
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function formatInteger(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

function formatCompactUsd(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const rounded = millions >= 10 ? millions.toFixed(0) : millions.toFixed(1).replace(/\.0$/, '');
    return `+$${rounded}M`;
  }

  if (value >= 1_000) {
    return `+$${Math.round(value / 1_000)}K`;
  }

  return `+$${Math.round(value)}`;
}
