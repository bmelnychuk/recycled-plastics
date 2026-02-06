import { v4, v5 } from 'uuid';

const NAMESPACE = 'e6a2db23-1691-449d-9167-ce90c3c6c1dd';

export const newUuid = (seed?: string): string =>
  seed ? v5(seed, NAMESPACE) : v4();
