import { useDroppable } from '@dnd-kit/core';

export const Droppable = (props: Props): JSX.Element => {
  const { setNodeRef } = useDroppable({ id: 'droppable' });

  return (
    <div ref={setNodeRef} className="working-area" data-testid="workingarea">
      {props.children}
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}
