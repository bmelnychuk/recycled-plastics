import { Color } from '@rp/core';

const shade = '5';

export const CompanyColors: Record<Color, string> = {
  amber: `var(--amber-${shade})`,
  blue: `var(--blue-${shade})`,
  bronze: `var(--bronze-${shade})`,
  brown: `var(--brown-${shade})`,
  crimson: `var(--crimson-${shade})`,
  cyan: `var(--cyan-${shade})`,
  gold: `var(--gold-${shade})`,
  grass: `var(--grass-${shade})`,
  gray: `var(--gray-${shade})`,
  green: `var(--green-${shade})`,
  indigo: `var(--indigo-${shade})`,
  iris: `var(--iris-${shade})`,
  jade: `var(--jade-${shade})`,
  lime: `var(--lime-${shade})`,
  mint: `var(--mint-${shade})`,
  olive: `var(--olive-${shade})`,
  orange: `var(--orange-${shade})`,
  pink: `var(--pink-${shade})`,
  plum: `var(--plum-${shade})`,
  purple: `var(--purple-${shade})`,
  red: `var(--red-${shade})`,
  ruby: `var(--ruby-${shade})`,
  sand: `var(--sand-${shade})`,
  sky: `var(--sky-${shade})`,
  slate: `var(--slate-${shade})`,
  teal: `var(--teal-${shade})`,
  tomato: `var(--tomato-${shade})`,
  violet: `var(--violet-${shade})`,
  yellow: `var(--yellow-${shade})`,
};

export const getColorValue = (color?: Color) =>
  color ? CompanyColors[color] : 'indigo';
