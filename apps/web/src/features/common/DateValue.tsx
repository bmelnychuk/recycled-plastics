'use client';

import { FC } from 'react';
import { format } from 'date-fns';

export const DateValue: FC<{ date: Date | string }> = ({ date }) => {
  return <>{format(date, 'dd/MM/yyyy')}</>;
};
