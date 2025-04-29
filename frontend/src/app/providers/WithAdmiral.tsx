import { ThemeProvider } from 'styled-components';
import { LIGHT_THEME, FontsVTBGroup, DropdownProvider } from '@admiral-ds/react-ui';
import { WithMiddlewareProps } from './WithMiddleware.interface';

export const WithAdmiral = ({ children }: WithMiddlewareProps) => (
  <ThemeProvider theme={LIGHT_THEME}>
    <DropdownProvider>
      <FontsVTBGroup />
      {children}
    </DropdownProvider>
  </ThemeProvider>
);
