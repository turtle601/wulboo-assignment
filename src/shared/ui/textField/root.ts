'use client';

import { Input } from './input';
import { Label } from './label';
import { ErrorMessage } from './errorMessage';

export const TextField = {
  label: Label,
  input: Input,
  errorMessage: ErrorMessage,
} as const;
