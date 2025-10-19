import { createContext, useContext, useState } from 'react';

interface CheckboxGroupContextProps {
  activeIds: string[];
  name: string;
  toggleId: ((id: string) => void) | null;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextProps>({
  activeIds: [],
  name: '',
  toggleId: null,
});

export const useCheckboxGroup = () => {
  const context = useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error(
      'useCheckboxGroup must be used within a CheckboxGroupProvider'
    );
  }

  return context;
};

interface WrapperProps extends React.ComponentProps<'div'> {
  name: string;
  defaultActiveIds?: string[];
}

export const Wrapper = ({
  defaultActiveIds = [],
  children,
  className,
  name,
  ...props
}: WrapperProps) => {
  const [activeIds, setActiveIds] = useState<string[]>(defaultActiveIds);

  const toggleId = (id: string) => {
    setActiveIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id);
      }

      return [...prev, id];
    });
  };

  return (
    <CheckboxGroupContext.Provider
      value={{ activeIds, name, toggleId }}
    >
      <div role="group" className={className} {...props}>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};
