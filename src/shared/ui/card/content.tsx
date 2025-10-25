export interface ContentProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export function Content({ children }: ContentProps) {
  return <div className="flex-1 min-w-0">{children}</div>;
}
