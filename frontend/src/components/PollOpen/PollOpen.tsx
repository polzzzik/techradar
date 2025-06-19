import { useState } from 'react';
import {
  useGetTechnologiesQuery,
  usePollTechnologyMutation,
} from '@/redux/api/technologies.api';
import { SelectField, Spinner, Option, Button } from '@admiral-ds/react-ui';
import { FilterOptions } from '@/types/FilterOption.interface';
import { ShortTechnology } from '@/models/ShortTechnology.interface';
import { RINGS } from '@/constants/rings';

const PollOpen = (): React.ReactNode => {
  const [pollTechnology] = usePollTechnologyMutation();

  const filterParam: FilterOptions = {};

  const { isLoading, data, isError } = useGetTechnologiesQuery({
    sort: { param: 'name', order: 'asc' },
    filters: filterParam,
  });

  const [technologyName, setTechnologyName] = useState('');
  const [technologyRing, setTechnologyRing] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await pollTechnology({ name: technologyName, ring: technologyRing }).unwrap();
    } catch (error) {
      console.error('Ошибка при голосовании:', error);
    }
  };

  if (isLoading) {
    return <Spinner dimension="l" />;
  }

  if (isError) {
    return <p className="text-negative">Ошибка</p>;
  }

  return (
    <form
      className="bg-white border-b relative border rounded-lg p-2 my-4"
      onSubmit={handleSubmit}
    >
      <span className="p-2 text-xl">Опрос</span>
      <section className="flex flex-wrap my-4 gap-4 flex-col sm:flex-row">
        <SelectField
          className="min-w-64"
          required
          label="Название"
          value={technologyName}
          onChange={(e) => setTechnologyName(e.target.value)}
          placeholder="Название технологии"
        >
          {data?.map((tech: ShortTechnology) => (
            <Option key={tech.id} value={tech.title}>
              {tech.title}
            </Option>
          ))}
        </SelectField>
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
      </section>
      <Button type="submit" dimension="m">
        Проголосовать
      </Button>
    </form>
  );
};

export default PollOpen;
