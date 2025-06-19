import { useEffect, useState } from 'react';
import {
  Button,
  InputField,
  SelectField,
  Option,
  TextField,
  Spinner,
} from '@admiral-ds/react-ui';
import { RINGS } from '@/constants/rings';
import {
  useArchiveTechnologyMutation,
  useGetTechnologyByIdQuery,
  useUpdateTechnologyMutation,
} from '@/redux/api/technologies.api';
import Diagram from './Diagram';
import { useNavigate } from 'react-router-dom';

interface DetailTechnology {
  technologyId: number;
}

const DetailTechnology = ({ technologyId }: DetailTechnology) => {
  const [technologyName, setTechnologyName] = useState('');
  const [technologyRing, setTechnologyRing] = useState('');
  const [technologyDescription, setTechnologyDescription] = useState('');

  const [poll, setPoll] = useState({
    adopt: 0,
    trial: 0,
    assess: 0,
    hold: 0,
    backlog: 0,
  });

  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetTechnologyByIdQuery(technologyId);

  const [archiveTechnology] = useArchiveTechnologyMutation();
  const [updateTechnology] = useUpdateTechnologyMutation();

  const handleArchive = async () => {
    try {
      await archiveTechnology(technologyId);
      navigate('/admin');
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTechnology({
        id: technologyId,
        title: technologyName,
        ring: technologyRing,
        description: technologyDescription,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (data && !isError) {
      setTechnologyName(data.title || '');
      setTechnologyRing(data.ring || '');
      setTechnologyDescription(data.description || '');
      setPoll(data.poll || { adopt: 0, trial: 0, assess: 0, hold: 0, backlog: 0 });
    }
  }, [data, isError]);

  if (isLoading) {
    return <Spinner dimension="l" />;
  }

  if (isError) {
    return <p className="text-red-500">Ошибка при загрузке данных технологии.</p>;
  }

  return (
    <>
      <form
        className="bg-white border-b relative border rounded-lg p-2 my-4"
        onSubmit={handleUpdate}
      >
        <span className="p-2 text-xl">Обновить технологию</span>
        <section className="flex flex-wrap mt-4 gap-4 flex-col sm:flex-row">
          <InputField
            status={undefined}
            id="technologyName"
            extraText="Ошибка ввода"
            displayClearIcon
            className="w-56"
            value={technologyName}
            label="Название технологии"
            onChange={(e) => setTechnologyName(e.target.value)}
            placeholder="Название технологии"
          />
          <SelectField
            className="min-w-40"
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
          <SelectField
            className="min-w-40"
            label="Секция"
            value={data?.quadrant}
            placeholder="Кольцо"
            disabled
          />
          <SelectField
            className="min-w-40"
            label="Категория"
            value={data?.category}
            placeholder="Кольцо"
            disabled
          />
        </section>

        <TextField
          className="mt-4"
          label="Краткое описание технологии"
          placeholder="Описание"
          value={technologyDescription}
          onChange={(e) => setTechnologyDescription(e.target.value)}
        />
        <div className="flex gap-4">
          <Button
            type="submit"
            dimension="m"
            className="text-positive hover:text-green-400 mt-4"
          >
            Обновить
          </Button>
          <Button
            type="button"
            dimension="m"
            appearance="secondary"
            onClick={handleArchive}
            className="text-positive hover:text-green-400 mt-4"
          >
            Архивировать
          </Button>
        </div>
      </form>
      <section className="mt-5 max-h-20">
        <Diagram
          adopt={poll.adopt || 0}
          trial={poll.trial || 0}
          assess={poll.assess || 0}
          hold={poll.hold || 0}
          backlog={poll.backlog || 0}
        />
      </section>
    </>
  );
};

export default DetailTechnology;
