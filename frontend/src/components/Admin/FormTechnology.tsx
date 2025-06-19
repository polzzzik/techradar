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
  closeFunction?: () => void;
  entity?: {
    name: string;
    category: string;
    ring: string;
    quadrant: string;
    description: string;
  };
}

const FormTechnology = ({
  closeFunction,
  entity,
}: AddTechnologyProps): React.ReactNode => {
  const [createTechnology] = useCreateTechnologyMutation();
  const [nameNewEntity, setNameNewEntity] = useState(entity?.name || '');
  const [categoryNewEntity, setCategoryNewEntity] = useState(entity?.category || '');
  const [ringNewEntity, setRingNewEntity] = useState(entity?.ring || '');
  const [quadrantNewEntity, setQuadrantNewEntity] = useState(entity?.quadrant || '');
  const [descriptionNewEntity, setDescriptionNewEntity] = useState(
    entity?.category || ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newEntity: CreateTechnology = {
        title: nameNewEntity,
        category: categoryNewEntity,
        ring: ringNewEntity,
        quadrant: quadrantNewEntity,
        description: descriptionNewEntity,
      };
      await createTechnology(newEntity).unwrap();
    } catch (error) {
      console.error('Ошибка при добавлении технологии:', error);
      alert('Произошла ошибка при добавлении технологии.');
    }
  };

  const resetForm = () => {
    setNameNewEntity('');
    setCategoryNewEntity('');
    setRingNewEntity('');
    setQuadrantNewEntity('');
    setDescriptionNewEntity('');
  };

  return (
    <form
      className="bg-white border-b relative border rounded-lg p-2 my-4"
      onSubmit={(e) => handleSubmit(e)}
      onReset={resetForm}
    >
      {closeFunction && (
        <Button
          title="Закрыть"
          onClick={() => closeFunction()}
          dimension="s"
          appearance="ghost"
        >
          <img src={xIcon} alt="X" />
        </Button>
      )}

      <span className="p-2 text-xl">
        {entity ? 'Обновить запись' : 'Добавить технологию'}
      </span>
      <section className="flex flex-wrap mt-4 gap-4 flex-col sm:flex-row">
        <InputField
          status={undefined}
          id="technologyName"
          extraText="Ошибка ввода"
          displayClearIcon
          className="w-56"
          required
          value={nameNewEntity}
          label="Название технологии"
          onChange={(e) => setNameNewEntity(e.target.value)}
          placeholder="Название технологии"
        />
        {/* Category */}
        <SelectField
          id="technologyCategory"
          className="min-w-40"
          required
          label="Категория"
          value={categoryNewEntity}
          onChange={(e) => setCategoryNewEntity(e.target.value)}
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
          required
          label="Кольцо"
          value={ringNewEntity}
          onChange={(e) => setRingNewEntity(e.target.value)}
          placeholder="Кольцо"
        >
          {RINGS.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </SelectField>
        {/* Quadrant */}
        <SelectField
          className="min-w-56"
          required
          label="Секция"
          value={quadrantNewEntity}
          onChange={(e) => setQuadrantNewEntity(e.target.value)}
          placeholder="Секция"
        >
          {QUADRANTS.map((option, index) => (
            <Option key={option} value={QUADRANTS_ID[index]}>
              {option}
            </Option>
          ))}
        </SelectField>
      </section>

      <TextField
        className="mt-4"
        label="Краткое описание технологии"
        placeholder="Описание"
        value={descriptionNewEntity}
        onChange={(e) => setDescriptionNewEntity(e.target.value)}
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

export default FormTechnology;
