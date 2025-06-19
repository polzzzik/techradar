import { useState } from 'react';
import Filter from './Filter';
import AddTechnology from './AddTechnology';
import { Button } from '@admiral-ds/react-ui';

const ManageGroup = (): React.ReactNode => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);

  const closeAddForm = () => setAddFormVisible(false);
  const closeFilter = () => setFilterVisible(false);

  return (
    <>
      <div className="flex gap-4">
        <Button
          title="Открыть фильтры"
          onClick={() => setFilterVisible(true)}
          dimension="m"
          className="text-main hover:text-blue-500"
          disabled={filterVisible}
        >
          Фильтры
        </Button>
        <Button
          dimension="m"
          className="text-positive hover:text-green-500"
          disabled={addFormVisible}
          onClick={() => setAddFormVisible(true)}
        >
          Добавить
        </Button>
      </div>
      {addFormVisible && <AddTechnology closeFunction={closeAddForm} />}

      {filterVisible && <Filter closeFunction={closeFilter} />}
    </>
  );
};

export default ManageGroup;
