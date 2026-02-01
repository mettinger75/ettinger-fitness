export const EQUIPMENT_OPTIONS = [
  'Barbell',
  'Dumbbells',
  'Kettlebell',
  'Pull-Up Bar',
  'Resistance Bands',
  'Jump Rope',
  'Box / Step',
  'Medicine Ball',
  'Rings',
  'Rower',
  'Bike / Assault Bike',
  'Sled',
  'Sandbag',
  'TRX / Suspension',
  'Bench',
  'Bodyweight Only',
] as const;

export type Equipment = (typeof EQUIPMENT_OPTIONS)[number];
