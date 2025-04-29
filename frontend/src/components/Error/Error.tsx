import { Link } from 'react-router-dom';
import styles from './Error.module.scss';
import { ReactNode } from 'react';

interface ErrorProps {
  statusCode: number;
  message?: string;
}

const Error = ({ statusCode, message }: ErrorProps): ReactNode => {
  return (
    <div
      className={`p-4 md:p-10 bg-main text-white rounded-2xl min-h-72 md:min-h-96 flex flex-col w-auto justify-between box-border ${styles.error}`}
    >
      <h1 className="text-7xl">{statusCode}</h1>
      <p className="mb-3 text-xl py-5 mt-10 sm:mt-0 sm:text-2xl">
        {message || 'Что-то пошло не так'}
      </p>
      <Link
        className="bg-white py-3 px-6 rounded-full text-main text-lg mr-auto mt-auto"
        to={'/'}
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default Error;
