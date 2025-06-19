import { ReactNode, useCallback, useEffect, useState } from 'react';
import xIcon from '@assets/icons/x.svg';
import { CATEGORIES } from '@/constants/categories';
import { RINGS } from '@/constants/rings';
import debounce from 'lodash.debounce';
import { FilterOptions } from '@/types/FilterOption.interface';
import { useDispatch } from 'react-redux';
import { setFilter, setFilterNameParam } from '@/redux/slices/filterSlice';
import { Button, InputField, SelectField, Option } from '@admiral-ds/react-ui';
import { QUADRANTS } from '@/constants/quadrants';

interface FilterProps {
  closeFunction: () => void;
}

const Filter = ({ closeFunction }: FilterProps): ReactNode => {
  const [nameParam, setnameParam] = useState('');
  const [categoryParam, setcategoryParam] = useState('');
  const [ringParam, setringParam] = useState('');
  const [quadrantParam, setQuadrantParam] = useState('');

  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setFilterNameParam(value));
    }, 700),
    []
  );

  const handleChangeFilter = () => {
    const newFilterOptions: FilterOptions = {
      ring: ringParam !== '' ? ringParam : undefined,
      category: categoryParam !== '' ? categoryParam : undefined,
      title: ringParam !== '' ? ringParam : undefined,
      quadrant: quadrantParam !== '' ? quadrantParam : undefined,
    };
    dispatch(setFilter(newFilterOptions));
  };

  const resetFilters = () => {
    setnameParam('');
    setcategoryParam('');
    setringParam('');
    setQuadrantParam('');
  };

  useEffect(() => {
    handleChangeFilter();
  }, [categoryParam, ringParam, quadrantParam]);

  return (
    <div className="bg-white border-b relative border rounded-lg p-2 my-4">
      <Button
        title="Закрыть"
        onClick={() => closeFunction()}
        dimension="s"
        appearance="ghost"
      >
        <img src={xIcon} alt="X" />
      </Button>
      <span className="p-2 text-xl">Фильтры</span>
      <section className="flex flex-wrap mt-4 gap-4 flex-col sm:flex-row">
        <InputField
          status={undefined}
          id="technologyName"
          displayClearIcon
          className="w-56"
          label="Название технологии"
          value={nameParam}
          onChange={(e) => {
            updateSearchValue(e.target.value);
            setnameParam(e.target.value);
          }}
          placeholder="Название технологии"
        />
        {/* Category */}
        <SelectField
          id="technologyCategory"
          className="min-w-40"
          label="Категория"
          value={categoryParam}
          onChange={(e) => setcategoryParam(e.target.value)}
          placeholder="Категория"
        >
          {CATEGORIES.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </SelectField>
        {/* Ring */}
        <SelectField
          className="min-w-40"
          label="Кольцо"
          value={ringParam}
          onChange={(e) => setringParam(e.target.value)}
          placeholder="Кольцо"
        >
          {RINGS.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </SelectField>
        <SelectField
          className="min-w-40"
          label="Секция"
          value={quadrantParam}
          onChange={(e) => setQuadrantParam(e.target.value)}
          placeholder="Секция"
        >
          {QUADRANTS.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </SelectField>
      </section>
      <section className="mt-4 flex gap-4">
        <Button onClick={resetFilters} dimension="m" appearance="danger">
          Сбросить
        </Button>
      </section>
    </div>
  );
};

export default Filter;
