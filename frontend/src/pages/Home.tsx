import Categories from '@/components/Categories';
import { PrintButton, PrintTableButton } from '@/components/Export';
import { ButtonGroup } from '@admiral-ds/react-ui';

const Home = () => {
  return (
    <div>
      <Categories />
      <ButtonGroup>
        <PrintButton />
        <PrintTableButton rings={[]} />
      </ButtonGroup>
    </div>
  );
};

export default Home;
