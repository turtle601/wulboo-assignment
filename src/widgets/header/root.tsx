import { Wrapper } from './wrapper';
import { Logo } from './logo';
import { Menu } from './menu';

export function Header() {
  return (
    <Wrapper>
      <Logo />
      <Menu />
    </Wrapper>
  );
}
