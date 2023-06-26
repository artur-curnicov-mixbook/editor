import { useDroppable } from '@dnd-kit/core';

interface Props {
  children: React.ReactNode;
}

export function Droppable(props: Props): JSX.Element {
  const { children } = props;

  const { setNodeRef } = useDroppable({ id: 'droppable' });

  return (
    <div ref={setNodeRef} className="working-area" data-testid="workingarea">
      {children}
    </div>
  );
}
