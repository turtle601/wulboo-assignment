interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  return (
    <header className="flex justify-between items-center w-full border-b border-gray-200 pb-4">
      {children}
    </header>
  );
}
