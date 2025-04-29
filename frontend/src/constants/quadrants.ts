export const QUADRANTS: string[] = [
  'Platform & infrastructure',
  'Languages & frameworks',
  'Data management',
  'Techniques & tools',
];

export const QUADRANTS_ID: string[] = [
  'platforminfrastructure',
  'languagesframeworks',
  'datamanagement',
  'techniquestools',
];

export type QuadrantType = (typeof QUADRANTS_ID)[number];
