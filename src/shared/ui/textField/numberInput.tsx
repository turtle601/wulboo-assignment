import { forwardRef, useRef, useImperativeHandle } from 'react';
import { cn } from '~/src/shared/utils/style';

export const FORMATTED_NUMBER_REGEX = /^-?(\d+|\d{1,4}(,\d{1,4})*)(\.\d+)?$/;

export const isFormattedNumber = (value: string) => {
  return FORMATTED_NUMBER_REGEX.test(value) && value !== '-' && value !== '';
};

export const formatNumber = (value: string) => {
  if (isFormattedNumber(value)) {
    return value.replace(/,/g, '');
  }

  return value;
};

interface NumberInputProps
  extends Omit<React.ComponentProps<'input'>, 'type' | 'onChange'> {
  isError?: boolean;
  step: number;
  defaultValue: number;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    { isError = false, className, step = 1, defaultValue, onChange, ...props },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return inputRef.current!;
    });

    const handleStepUp = () => {
      if (inputRef.current) {
        if (isFormattedNumber(inputRef.current.value)) {
          inputRef.current.value = Intl.NumberFormat('ko-KR').format(
            Number(formatNumber(inputRef.current.value)) + step
          );
        }

        inputRef.current.focus();
      }
    };

    const handleStepDown = () => {
      if (inputRef.current) {
        if (isFormattedNumber(inputRef.current.value)) {
          inputRef.current.value = Intl.NumberFormat('ko-KR').format(
            Number(formatNumber(inputRef.current.value)) - step
          );
        }

        inputRef.current.focus();
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (inputRef.current) {
        if (isFormattedNumber(value)) {
          inputRef.current.value = Intl.NumberFormat('ko-KR').format(
            Number(formatNumber(value))
          );
        }
      }

      onChange?.(event);
    };

    return (
      <div className="relative w-full">
        <style jsx>{`
          .number-input-custom::-webkit-inner-spin-button,
          .number-input-custom::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
            display: none;
          }
          .number-input-custom {
            -moz-appearance: textfield;
          }
        `}</style>

        <input
          type="text"
          defaultValue={Intl.NumberFormat('ko-KR').format(defaultValue)}
          aria-invalid={isError}
          className={cn(
            'number-input-custom',
            'flex rounded-lg w-full bg-white py-4 font-normal border border-solid border-gray-300 mb-2 h-[60px] px-5 pr-14 text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 transition-all',
            isError &&
              'border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-200',
            className
          )}
          ref={inputRef}
          onChange={handleChange}
          {...props}
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col mb-2 pointer-events-none">
          <button
            type="button"
            className="h-[26px] w-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-200 active:bg-gray-200 active:scale-95 cursor-pointer pointer-events-auto"
            onClick={handleStepUp}
            disabled={props.disabled}
            tabIndex={-1}
            aria-label="증가"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
          <button
            type="button"
            className="h-[26px] w-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:bg-transparent disabled:hover:border-gray-200 active:bg-gray-200 active:scale-95 cursor-pointer pointer-events-auto"
            onClick={handleStepDown}
            disabled={props.disabled}
            tabIndex={-1}
            aria-label="감소"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

NumberInput.displayName = 'TextField.NumberInput';
