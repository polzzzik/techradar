import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { WithMiddlewareProps } from './WithMiddleware.interface';

export const WithStore = ({ children }: WithMiddlewareProps) => (
  <Provider store={store}>{children}</Provider>
);
