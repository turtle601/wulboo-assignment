import { createContext, useContext, useState } from 'react';

interface RadioGroupContextProps {
  activeId: string;
  name: string;
  onActiveChange: ((id: string) => void) | null;
}

const RadioGroupContext = createContext<RadioGroupContextProps>({
  activeId: '',
  name: '',
  onActiveChange: null,
});

export const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);

  if (!context) {
    throw new Error('useRadioGroup must be used within a RadioGroupProvider');
  }

  return context;
};

interface WrapperProps extends Omit<React.ComponentProps<'fieldset'>, 'name'> {
  defaultActiveId: string;
  name: string;
}

export const Wrapper = ({
  defaultActiveId,
  children,
  className,
  name,
  ...props
}: WrapperProps) => {
  const [activeId, setActiveId] = useState<string>(defaultActiveId);

  const handleActiveChange = (id: string) => {
    setActiveId(id);
  };

  return (
    <RadioGroupContext.Provider
      value={{ activeId, name, onActiveChange: handleActiveChange }}
    >
      <fieldset id="radio-group" name={name} className={className} {...props}>
        {children}
      </fieldset>
    </RadioGroupContext.Provider>
  );
};

Wrapper.displayName = 'RadioGroup.Wrapper';
