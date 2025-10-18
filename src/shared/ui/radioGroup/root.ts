'use client';

import { Label } from './label';
import { Wrapper } from './wrapper';
import { Option } from './option';

export const RadioGroup = {
  Wrapper: Wrapper,
  Option: Option,
  Label: Label,
} as const;
