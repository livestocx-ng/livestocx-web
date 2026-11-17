export type AnimalOption = {
  productId: string;
  name: string;
};

export type HealthRecordType = 'Shot' | 'Sickness' | 'Treatment';

export type HealthRecord = {
  id: string;
  productId: string;
  animalName: string;
  date: string;
  type: HealthRecordType;
  details: string;
  notes: string;
};

export type VeterinaryRecord = {
  id: string;
  productId: string;
  animalName: string;
  date: string;
  vetOrClinic: string;
  reason: string;
  whatWasDone: string;
  notes: string;
};

export type MonitoringCondition = 'Good' | 'Fair' | 'Poor';

export type MonitoringRecord = {
  id: string;
  productId: string;
  animalName: string;
  date: string;
  condition: MonitoringCondition;
  weightKg?: string;
  notes: string;
};

/** Example animals keyed by productId (same field as VendorProductInfo.productId) */
export const DUMMY_ANIMALS: AnimalOption[] = [
  { productId: 'k7m2p9xq', name: 'Brown Cow #12' },
  { productId: 'b4n8r1wt', name: 'White Goat #3' },
  { productId: 'f3h6s0vy', name: 'Black Ram #7' },
  { productId: 'a9c5d2zu', name: 'Layer Hen Batch A' },
];

/** Common diseases farmers can pick when logging sickness or visits */
export const COMMON_DISEASES = [
  'Foot and mouth disease',
  'Avian influenza',
  'Anthrax',
  'Newcastle disease',
  'Other',
] as const;

export type CommonDisease = (typeof COMMON_DISEASES)[number];

export const DUMMY_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'health-1',
    productId: 'k7m2p9xq',
    animalName: 'Brown Cow #12',
    date: '2026-10-12',
    type: 'Shot',
    details: 'Foot and mouth disease vaccine',
    notes: 'Given in the morning. Animal was calm.',
  },
  {
    id: 'health-2',
    productId: 'k7m2p9xq',
    animalName: 'Brown Cow #12',
    date: '2026-10-20',
    type: 'Sickness',
    details: 'Foot and mouth disease',
    notes: 'Blisters on mouth and feet. Kept away from other cattle.',
  },
  {
    id: 'health-3',
    productId: 'a9c5d2zu',
    animalName: 'Layer Hen Batch A',
    date: '2026-10-28',
    type: 'Sickness',
    details: 'Avian influenza',
    notes: 'Sudden drop in egg laying. Reported to local vet officer.',
  },
  {
    id: 'health-4',
    productId: 'a9c5d2zu',
    animalName: 'Layer Hen Batch A',
    date: '2026-11-08',
    type: 'Shot',
    details: 'Avian influenza vaccine',
    notes: 'Whole batch treated after outbreak nearby.',
  },
  {
    id: 'health-5',
    productId: 'b4n8r1wt',
    animalName: 'White Goat #3',
    date: '2026-11-02',
    type: 'Treatment',
    details: 'Foot and mouth disease care',
    notes: 'Soft feed and mouth rinse. Follow vet advice for 5 days.',
  },
];

export const DUMMY_VETERINARY_RECORDS: VeterinaryRecord[] = [
  {
    id: 'vet-1',
    productId: 'k7m2p9xq',
    animalName: 'Brown Cow #12',
    date: '2026-10-21',
    vetOrClinic: 'Dr. Adeyemi Clinic',
    reason: 'Foot and mouth disease',
    whatWasDone: 'Confirmed signs, advised isolation and supportive care',
    notes: 'Do not move cattle until cleared.',
  },
  {
    id: 'vet-2',
    productId: 'a9c5d2zu',
    animalName: 'Layer Hen Batch A',
    date: '2026-10-29',
    vetOrClinic: 'Farm Care Vet',
    reason: 'Avian influenza',
    whatWasDone: 'Sampled birds and advised strict biosecurity',
    notes: 'Limit visitors. Clean and disinfect coop daily.',
  },
  {
    id: 'vet-3',
    productId: 'b4n8r1wt',
    animalName: 'White Goat #3',
    date: '2026-11-03',
    vetOrClinic: 'Dr. Adeyemi Clinic',
    reason: 'Foot and mouth disease check',
    whatWasDone: 'Checked mouth and feet; mild signs only',
    notes: 'Watch for 1 week and call if worse.',
  },
];

export const DUMMY_MONITORING_RECORDS: MonitoringRecord[] = [
  {
    id: 'monitor-1',
    productId: 'k7m2p9xq',
    animalName: 'Brown Cow #12',
    date: '2026-10-05',
    condition: 'Good',
    weightKg: '320',
    notes: 'Eating well. No foot and mouth signs.',
  },
  {
    id: 'monitor-2',
    productId: 'k7m2p9xq',
    animalName: 'Brown Cow #12',
    date: '2026-10-22',
    condition: 'Poor',
    weightKg: '305',
    notes: 'Foot and mouth disease — eating less, sore mouth.',
  },
  {
    id: 'monitor-3',
    productId: 'a9c5d2zu',
    animalName: 'Layer Hen Batch A',
    date: '2026-10-30',
    condition: 'Poor',
    notes: 'Avian influenza watch — low activity, fewer eggs.',
  },
  {
    id: 'monitor-4',
    productId: 'a9c5d2zu',
    animalName: 'Layer Hen Batch A',
    date: '2026-11-10',
    condition: 'Fair',
    notes: 'Improving after avian influenza precautions.',
  },
  {
    id: 'monitor-5',
    productId: 'k7m2p9xq',
    animalName: 'Brown Cow #12',
    date: '2026-11-12',
    condition: 'Fair',
    weightKg: '312',
    notes: 'Recovering from foot and mouth disease. Appetite better.',
  },
];

export const HEALTH_RECORD_TYPE_OPTIONS: HealthRecordType[] = ['Shot', 'Sickness', 'Treatment'];

export const MONITORING_CONDITION_OPTIONS: MonitoringCondition[] = ['Good', 'Fair', 'Poor'];

export const DISEASE_SELECT_OPTIONS = COMMON_DISEASES.map((disease) => disease);

export function createRecordId(prefix: string) {
  return `${prefix}-${Date.now()}`;
}

export function animalSelectData(animals: AnimalOption[] = DUMMY_ANIMALS) {
  return animals.map((animal) => ({
    value: animal.productId,
    label: `${animal.name} (${animal.productId})`,
  }));
}
