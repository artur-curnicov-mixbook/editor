import { useDraggable } from '@dnd-kit/core';

import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ItemType } from '../../domain/ItemType';

export interface DraggableData {
  type: ItemType;
  initialX: number;
  initialY: number;
}

export function Draggable(props: Props): JSX.Element {
  const { id, name, children } = props;
  const draggableRef = useRef<HTMLElement>();

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const { current: draggableElement } = draggableRef;

    if (!draggableElement) return;

    const boundingClientRect = draggableElement.getBoundingClientRect();

    setPosition({
      x: boundingClientRect.x,
      y: boundingClientRect.y
    });
  }, []);

  const data = useMemo<DraggableData>(
    () => ({
      type: name,
      initialX: position.x,
      initialY: position.y
    }),
    [name, position]
  );

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, data });

  const style: CSSProperties | undefined = useMemo(
    () =>
      transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined,
    [transform]
  );

  const setRootRef = useCallback((element: HTMLElement | null) => {
    setNodeRef(element);
    draggableRef.current = element ?? undefined;
  }, []);

  return (
    <div ref={setRootRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}

interface Props {
  id: string;
  name: ItemType;
  children: React.ReactNode;
}
