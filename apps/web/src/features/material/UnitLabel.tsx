import { Unit } from '@rp/core';
import { FC } from 'react';

const unitLabels: Record<Unit, string> = {
  PERCENT: '%',
  GRAMS_PER_CUBIC_CENTIMETER: 'g/cm³',
  KG_PER_CUBIC_METER: 'kg/m³',
};

export const UnitLabel: FC<{ unit: Unit }> = ({ unit }) => {
  return unitLabels[unit];
};
