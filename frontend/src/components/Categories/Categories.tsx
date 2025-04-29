import { CATEGORIES } from '@/constants/categories';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <section className="flex gap-4 py-4 items-center flex-wrap">
      {CATEGORIES.map((elem) => (
        <Link
          className="text-md text-main hover:text-blue-500 active:text-gray-700"
          to={`/${elem}`}
          key={elem}
        >
          {elem}
        </Link>
      ))}
    </section>
  );
};

export default Categories;
