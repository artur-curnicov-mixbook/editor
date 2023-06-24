import { useDraggable } from '@dnd-kit/core';

import { useEffect, useRef, useState } from 'react';

export const Draggable = (props: Props): JSX.Element => {
  const draggableRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (draggableRef.current) {
      const boundingClientRect = draggableRef.current.getBoundingClientRect();
      setPosition({
        x: boundingClientRect.x,
        y: boundingClientRect.y
      });
    }
  }, [draggableRef]);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      type: props.name,
      initialX: position.x,
      initialY: position.y
    }
  });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : {};

  return (
    <div ref={setNodeRef} style={{ ...style }} {...listeners} {...attributes}>
      <div ref={draggableRef}>{props.children}</div>
    </div>
  );
};

interface Props {
  id: string;
  name: string;
  children: React.ReactNode;
}
