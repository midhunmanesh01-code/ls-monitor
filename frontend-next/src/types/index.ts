// ============================================================
// Landslide Monitor — Type Definitions
// ============================================================

// --- Risk & Hazard ---

export type RiskCategory = 'NORMAL' | 'WATCH' | 'HIGH' | 'CRITICAL';
export type RiskTrend = 'STABLE' | 'INCREASING' | 'DECREASING';
export type ConfidenceLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RiskAssessment {
  zoneId: string;
  score: number;            // 0–100
  category: RiskCategory;
  trend: RiskTrend;
  confidence: ConfidenceLevel;
  lastUpdated: string;       // ISO timestamp
  factors: ContributingFactor[];
  exposure: ExposureData;
  responsePriority: number;  // 1 = highest
}

export interface ContributingFactor {
  id: string;
  label: string;
  level: RiskCategory;
  value: number;  // 0–100
  description: string;
}

export interface ExposureData {
  population: number;
  buildings: number;
  roadsKm: number;
  criticalFacilities: string[];
}

// --- Zones ---

export interface Zone {
  id: string;
  name: string;
  description: string;
  center: [number, number];  // [lat, lng]
  bounds: [number, number][];
  riskCategory: RiskCategory;
  riskScore: number;
  elevation: string;
  terrain: string;
}

// --- Rainfall ---

export type ThresholdStatus = 'NORMAL' | 'WATCH' | 'HIGH' | 'CRITICAL';

export interface RainfallReading {
  timestamp: string;
  value: number;       // mm
  cumulative24h: number;
  cumulative72h: number;
}

export interface RainfallData {
  zoneId: string;
  current: number;
  cumulative24h: number;
  cumulative72h: number;
  forecast24h: number;
  forecast72h: number;
  thresholdStatus: ThresholdStatus;
  threshold24h: number;
  threshold72h: number;
  readings: RainfallReading[];
  dataStatus: DataSourceStatus;
}

export interface ReplayFrame {
  frameIndex: number;
  timestamp: string;
  label: string;
  rainfall: RainfallData;
  riskScore: number;
  riskCategory: RiskCategory;
  thresholdStatus: ThresholdStatus;
  events: string[];  // narrative events for this frame
}

// --- Alerts ---

export type AlertStatus =
  | 'DRAFT'
  | 'AWAITING_AUTHORIZATION'
  | 'AUTHORIZED'
  | 'ACKNOWLEDGED'
  | 'UNDER_VERIFICATION'
  | 'CLOSED'
  | 'ESCALATED';

export type AlertSeverity = 'WATCH' | 'HIGH' | 'CRITICAL';

export interface Alert {
  id: string;
  zoneId: string;
  zoneName: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  authorizedBy?: string;
  authorizedAt?: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  closedAt?: string;
  closedReason?: string;
  timeline: AlertTimelineEntry[];
}

export interface AlertTimelineEntry {
  timestamp: string;
  action: string;
  actor: string;
  note?: string;
}

// --- Field Reports ---

export type ObservationType =
  | 'ROAD_BLOCKAGE'
  | 'GROUND_CRACK'
  | 'SEEPAGE'
  | 'ROCKFALL'
  | 'SLOPE_MOVEMENT'
  | 'DEBRIS_FLOW'
  | 'OTHER';

export type ReportSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'REJECTED'
  | 'RESOLVED';

export type SyncStatus = 'PENDING' | 'UPLOADING' | 'SYNCED' | 'FAILED';

export interface FieldReport {
  id: string;
  observationType: ObservationType;
  severity: ReportSeverity;
  location: [number, number]; // [lat, lng]
  locationName: string;
  timestamp: string;
  submittedBy: string;
  photos: string[];           // URLs or local references
  notes: string;
  verificationStatus: VerificationStatus;
  syncStatus: SyncStatus;
  verifiedBy?: string;
  verifiedAt?: string;
  reviewNotes?: string;
  zoneId?: string;
}

// --- Infrastructure ---

export interface Road {
  id: string;
  name: string;
  type: 'NH' | 'SH' | 'DISTRICT' | 'LOCAL';
  coordinates: [number, number][];
  criticality: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface Building {
  id: string;
  name: string;
  type: 'HOSPITAL' | 'SCHOOL' | 'GOVERNMENT' | 'RESIDENTIAL' | 'COMMERCIAL' | 'SHELTER';
  location: [number, number];
  capacity?: number;
  isCritical: boolean;
}

export interface LandslideMarker {
  id: string;
  location: [number, number];
  date: string;
  type: string;
  severity: string;
  description: string;
  isHistorical: boolean;
}

// --- Data Status ---

export type DataSourceState = 'LIVE' | 'REPLAYED' | 'SIMULATED' | 'PLANNED' | 'UNAVAILABLE';

export interface DataSourceStatus {
  source: string;
  state: DataSourceState;
  lastUpdate: string;
  freshness: 'FRESH' | 'STALE' | 'OUTDATED';
  confidence: ConfidenceLevel;
}

// --- Response Priority ---

export interface ResponsePriorityItem {
  rank: number;
  zoneId: string;
  zoneName: string;
  hazardLevel: RiskCategory;
  hazardScore: number;
  exposureScore: number;
  infrastructureScore: number;
  overallPriority: number;
  rationale: string;
  criticalAssets: string[];
  recommendedActions: string[];
}

// --- Historical Event ---

export interface HistoricalEvent {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  frames: ReplayFrame[];
}
