import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { useSortable } from './SortableItems';

type SortableItemProps = {
    index: number;
    item: any;
    component: FunctionComponent<any>;
    ref: React.RefObject<HTMLDivElement>;
}
export const SortableItem: React.FC<SortableItemProps> = React.memo(React.forwardRef<HTMLDivElement, SortableItemProps>(({ component: Component, index, item }, forwardRef) => {
    const { changeIndex, draggable } = useSortable();
    const ref = useRef<HTMLDivElement>(null);
    const [beingDragged, setBeingDragged] = useState(false);
    const dragging = useRef(false);
    const initialPosition = useRef({ initialLeft: 0, initialTop: 0, fixedInitialTop: 0, fixedInitialLeft: 0 });
    const prevPosition = useRef({ top: 0, left: 0  });
    const initialMousePos = useRef({ mouseLeft: 0, mouseTop: 0 });
    const dimensions = useRef({ width: 0, height: 0 });

    // Allowing both ref and forwardRef
    React.useImperativeHandle(forwardRef, () => ref.current as HTMLDivElement);

    const handleDragEnd = useCallback((e: DragEvent) => {
        if(!ref.current) return;

        // Updating dragging state
        dragging.current = false;
        setBeingDragged(false);
        
        // Restoring initial values
        initialPosition.current = { initialLeft: 0, initialTop: 0, fixedInitialTop: 0, fixedInitialLeft: 0 };
        initialMousePos.current = { mouseLeft: 0, mouseTop: 0 };
        prevPosition.current = { top: 0, left: 0 };
        ref.current.style.pointerEvents = '';
        ref.current.style.transform = '';
    }, []);
    const handleDragStart = useCallback((e: DragEvent) => {
        if(!ref.current) return;

        // Updating dragging state
        dragging.current = true;
        setBeingDragged(true);

        // Getting drag event positional values
        const { x, y } = e;
        const { left, top } = ref.current.getBoundingClientRect();

        // Determining mouse position relative to dragged div
        const mouseLeft = x - left;
        const mouseTop = y - top;

        initialMousePos.current = { mouseLeft, mouseTop };
        initialPosition.current = { initialLeft: x, initialTop: y, fixedInitialTop: top, fixedInitialLeft: left };
    }, [draggable]);
    const handleDrag = useCallback((e: DragEvent) => {
        if(!ref.current) return;

        // Getting initial positional values
        const { mouseLeft, mouseTop } = initialMousePos.current;
        const { height } = dimensions.current;
        const { initialTop, initialLeft, fixedInitialTop, fixedInitialLeft } = initialPosition.current;

        // Getting drag event positional values
        const { x, y } = e;
        const { left, top } = ref.current.getBoundingClientRect();

        // Determining translate values
        let newTop = y - initialTop;
        let newLeft = x - initialLeft;

        // Making sure item doesn't exceed viewport
        if(newTop < -fixedInitialTop) {
            newTop = prevPosition.current.top;
        }
        if(Math.abs(newLeft) > fixedInitialLeft) {
            newLeft = prevPosition.current.left;
        }
        prevPosition.current = { top: newTop, left: newLeft };

        // Setting translate values
        ref.current.style.transform = `translateY(${newTop}px) translateX(${newLeft}px)`;
        ref.current.style.pointerEvents = 'none';
    }, [draggable]);
    const handleDragEnter = useCallback(() => {
        if(dragging.current) return;

        // Fetching dragged element
        const draggedElement = document.querySelector('[data-dragging=true]');
        const draggedElementIndex = parseInt(draggedElement?.getAttribute('data-order') || '');
        if(!draggedElement) return;
        
        // Getting current item index
        const currentIndex = parseInt(ref.current?.getAttribute('data-order') || '');
        if(currentIndex === null) return;

        // Updating dragged element index
        changeIndex(draggedElementIndex, currentIndex);
    }, []);

    // Initial setup
    useEffect(() => {
        if(!ref.current || !draggable) return;

        // Setting up drag event handlers
        ref.current.addEventListener('dragstart', handleDragStart);
        ref.current.addEventListener('drag', handleDrag);
        ref.current.addEventListener('dragenter', handleDragEnter);
        document.addEventListener('dragend', handleDragEnd);
        
        // Getting item dimensions
        const { width, height } = ref.current.getBoundingClientRect();
        dimensions.current = { width, height };

        return () => {
            if(!ref.current) return;
            ref.current.removeEventListener('dragstart', handleDragStart);
            ref.current.removeEventListener('drag', handleDrag);
            ref.current.removeEventListener('dragenter', handleDragEnter);
        }
    }, [draggable]);

    return(
        <div 
            ref={ref} 
            draggable={draggable}
            data-dragging={beingDragged}
            data-order={item.order}
            data-item-id={item.id}
        >
            <Component {...item} />
        </div>
    )
}));
SortableItem.displayName = 'SortableItem';