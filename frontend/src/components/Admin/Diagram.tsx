import React from 'react';

interface DiagramProps {
  adopt: number;
  trial: number;
  assess: number;
  hold: number;
  backlog: number;
}

const Diagram = ({
  adopt,
  trial,
  assess,
  hold,
  backlog,
}: DiagramProps): React.ReactNode => {
  const totalSum = adopt + trial + assess + hold + backlog;

  return (
    <div className="mt-10 p-4 borer rounded-md shadow-sm">
      <section className="flex flex-row gap-16 items-end">
        <div
          className="p-2 w-24"
          style={{
            height: `${Math.floor(500 / totalSum) * adopt}px`,
            backgroundColor: 'blue',
          }}
        ></div>{' '}
        <div
          className="p-2 w-24"
          style={{
            height: `${Math.floor(500 / totalSum) * trial}px`,
            backgroundColor: 'green',
          }}
        ></div>
        <div
          className="p-2 w-24"
          style={{
            height: `${Math.floor(500 / totalSum) * assess}px`,
            backgroundColor: 'yellow',
          }}
        ></div>
        <div
          className="p-2 w-24"
          style={{
            height: `${Math.floor(500 / totalSum) * hold}px`,
            backgroundColor: 'red',
          }}
        ></div>
        <div
          className="p-2 w-24"
          style={{
            height: `${Math.floor(500 / totalSum) * backlog}px`,
            backgroundColor: 'gray',
          }}
        ></div>
      </section>
      <section className="flex flex-row gap-8">
        <p className="w-32 text-md text-left">
          ADOPT <strong>({adopt})</strong>
        </p>
        <p className="w-32 text-md text-left">
          TRIAL <strong>({trial})</strong>
        </p>
        <p className="w-32 text-md text-left">
          ASSESS <strong>({assess})</strong>
        </p>
        <p className="w-32 text-md text-left">
          HOLD <strong>({hold})</strong>
        </p>
        <p className="w-32 text-md text-left">
          BACKLOG <strong>({backlog})</strong>
        </p>
      </section>
    </div>
  );
};

export default Diagram;
