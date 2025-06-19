interface ListViewProps {
  category: string;
  rings: { name: string; items: { id: number; name: string }[] }[];
}

const ListView = (props: ListViewProps) => {
  return <div>{props.category}</div>;
};

export default ListView;
