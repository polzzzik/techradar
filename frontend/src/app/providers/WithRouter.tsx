import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { WithMiddlewareProps } from './WithMiddleware.interface';

export const WithRouter = ({ children }: WithMiddlewareProps) => (
  <BrowserRouter>
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <p className="text-6xl font-light text-black dark:text-white">Загрузка...</p>
        </div>
      }
    >
      {children}
    </Suspense>
  </BrowserRouter>
);
