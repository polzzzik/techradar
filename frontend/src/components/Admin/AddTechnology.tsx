import { CATEGORIES } from '@/constants/categories';
import { RINGS } from '@/constants/rings';
import xIcon from '@assets/icons/x.svg';
import { useState } from 'react';
import { useCreateTechnologyMutation } from '@/redux/api/technologies.api';
import { CreateTechnology } from '@/models/CreateTechnology.interface';
import { QUADRANTS, QUADRANTS_ID } from '@/constants/quadrants';
import {
  InputField,
  SelectField,
  Option,
  TextField,
  Button,
} from '@admiral-ds/react-ui';

interface AddTechnologyProps {
  closeFunction: () => void;
}

const AddTechnology = ({ closeFunction }: AddTechnologyProps): React.ReactNode => {
  const [createTechnology] = useCreateTechnologyMutation();

  const [technologyName, setTechnologyName] = useState('');
  const [technologyCategory, setTechnologyCategory] = useState('');
  const [technologyRing, setTechnologyRing] = useState('');
  const [technologyQuadrant, setTechnologyQuadrant] = useState('');
  const [technologyDescription, setTechnologyDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTechnology: CreateTechnology = {
        title: technologyName,
        category: technologyCategory,
        ring: technologyRing,
        quadrant: technologyQuadrant,
        description: technologyDescription,
      };
      await createTechnology(newTechnology).unwrap();
    } catch (error) {
      console.error('Ошибка при добавлении технологии:', error);
      alert('Произошла ошибка при добавлении технологии.');
    }
  };

  const resetForm = () => {
    setTechnologyName('');
    setTechnologyCategory('');
    setTechnologyRing('');
    setTechnologyQuadrant('');
    setTechnologyDescription('');
  };

  return (
    <form
      className="bg-white border-b relative border rounded-lg p-2 my-4"
      onSubmit={handleSubmit}
      onReset={resetForm}
    >
      <Button title="Закрыть" onClick={closeFunction} dimension="s" appearance="ghost">
        <img src={xIcon} alt="X" />
      </Button>
      <span className="p-2 text-xl">Добавить технологию</span>
      <section className="flex flex-wrap mt-4 gap-4 flex-col sm:flex-row">
        <InputField
          status={undefined}
          id="technologyName"
          extraText="Ошибка ввода"
          displayClearIcon
          className="w-56"
          required
          value={technologyName}
          label="Название технологии"
          onChange={(e) => setTechnologyName(e.target.value)}
          placeholder="Название технологии"
        />
        {/* Category */}
        <SelectField
          id="technologyCategory"
          className="min-w-40"
          required
          label="Категория"
          value={technologyCategory}
          onChange={(e) => setTechnologyCategory(e.target.value)}
          placeholder="Категория"
        >
          {CATEGORIES.map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </SelectField>
        {/* Ring */}
        <SelectField
          className="min-w-40"
          required
          label="Кольцо"
          value={technologyRing}
          onChange={(e) => setTechnologyRing(e.target.value)}
          placeholder="Кольцо"
        >
          {RINGS.map((ring) => (
            <Option key={ring} value={ring}>
              {ring}
            </Option>
          ))}
        </SelectField>
        {/* Quadrant */}
        <SelectField
          className="min-w-56"
          required
          label="Секция"
          value={technologyQuadrant}
          onChange={(e) => setTechnologyQuadrant(e.target.value)}
          placeholder="Секция"
        >
          {QUADRANTS.map((quadrant, index) => (
            <Option key={quadrant} value={QUADRANTS_ID[index]}>
              {quadrant}
            </Option>
          ))}
        </SelectField>
      </section>

      <TextField
        className="mt-4"
        label="Краткое описание технологии"
        placeholder="Описание"
        value={technologyDescription}
        onChange={(e) => setTechnologyDescription(e.target.value)}
      />
      <section className="mt-4 flex gap-4">
        <Button type="submit" dimension="m" appearance="success">
          Добавить
        </Button>
        <Button type="reset" dimension="m" appearance="danger">
          Сбросить
        </Button>
      </section>
    </form>
  );
};

export default AddTechnology;
