// Techradar.js
import Categories from '@/components/Categories';
import Error from '@/components/Error';
import { CATEGORIES } from '@/constants/categories';
import { useParams } from 'react-router-dom';

const Techradar = () => {
  const { techradarTag } = useParams();

  if (!CATEGORIES.includes(techradarTag || '')) {
    return <Error statusCode={404} message="Ресурс не найден" />;
  }

  return (
    <>
      <div>
        <Categories />
        <h1>Techradar Page</h1>
        <p>Текущий тег: {techradarTag}</p>
      </div>
    </>
  );
};

export default Techradar;
