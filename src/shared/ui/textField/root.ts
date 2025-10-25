'use client';

import { Input } from './input';
import { Label } from './label';
import { ErrorMessage } from './errorMessage';
import { NumberInput } from './numberInput';

export const TextField = {
  label: Label,
  input: Input,
  errorMessage: ErrorMessage,
  numberInput: NumberInput,
} as const;
