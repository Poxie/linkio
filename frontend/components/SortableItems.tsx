import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';

type SortableContextType = {
    changeIndex: (currentIndex: number, newIndex: number) => void;
    enableDragging: () => void;
    disableDragging: () => void;
    draggable: boolean;
}
const SortableContext = React.createContext({} as SortableContextType);
export const useSortable = () => React.useContext(SortableContext);

export type SortableItemsProps = {
    items: any[];
    component: FunctionComponent<any>;
    onDragEnd: (items: any[]) => void;
    spacing?: string | number;
}
export const SortableItems: React.FC<SortableItemsProps> = ({ items, component, onDragEnd, spacing='var(--spacing-primary)' }) => {
    const refs = useRef<React.RefObject<HTMLDivElement>[]>([]);
    const tempItems = useRef(items.map(item => ({...item})));
    const [currentItems, setCurrentItems] = useState(items.map(item => ({...item})));
    const [draggable, setDraggable] = useState(true);

    const changeIndex: SortableContextType['changeIndex'] = (currentIndex, newIndex) => {
        updateElementOrder(currentIndex, newIndex);
    }
    const updateElementOrder = useCallback((prevIndex: number, draggedIndex: number) => {
        refs.current.forEach(ref => {
            if(!ref.current || ref.current.getAttribute('data-dragging') === "true") return;

            // Getting dimensions
            const { height } = ref.current.getBoundingClientRect();

            // Getting self-order
            const currentIndex = parseInt(ref.current.getAttribute('data-order') || '');
            if(currentIndex === null) return;

            // Getting item relation to dragged item
            const draggedItemIsAbove = prevIndex < currentIndex;
            const draggedItemEnteredMe = draggedIndex === currentIndex;

            // Making sure only affected items go through process
            if(draggedItemIsAbove && !draggedItemEnteredMe && !(draggedIndex >= currentIndex)) return;
            if(!draggedItemIsAbove && !draggedItemEnteredMe && !(draggedIndex <= currentIndex)) return;

            // Defining translation threshholds
            const isAnimated = ref.current.getAttribute('style')?.indexOf('transform') !== -1 && ref.current.getAttribute('style')?.indexOf('transform') !== undefined;
            const translateUp = isAnimated ? '' : `translateY(calc(${-height}px - ${spacing}))`;
            const translateDown = isAnimated ? '' : `translateY(calc(${height}px + ${spacing}))`;

            // Determining translation values based on relations
            const shouldTranslateUp = draggedItemIsAbove && draggedItemEnteredMe || draggedItemIsAbove && !draggedItemEnteredMe;
            const shouldTranslateDown = !draggedItemIsAbove && draggedItemEnteredMe || !draggedItemIsAbove && !draggedItemEnteredMe;
            if(shouldTranslateUp) {
                ref.current.style.transform = translateUp;
            } else if(shouldTranslateDown) {
                ref.current.style.transform = translateDown;
            }

            // Updating my order attribute
            let newIndex = 0;
            if(shouldTranslateUp) {
                newIndex = currentIndex - 1
            } else if(shouldTranslateDown) {
                newIndex = currentIndex + 1
            }
            ref.current.setAttribute('data-order', newIndex.toString());

            // Updating dragged item order
            if(draggedItemEnteredMe) {
                document.querySelector('[data-dragging=true]')?.setAttribute('data-order', currentIndex.toString());
            }
        })
    }, [refs]);
    const handleDragEnd = useCallback(() => {
        // Updating tempItems ref with orders
        refs.current.forEach(ref => {
            if(!ref.current) return;
            const id = ref.current.getAttribute('data-item-id');
            const order = parseInt(ref.current.getAttribute('data-order') || "");
            tempItems.current.find(item => item.id === id).order = order;
        })

        // If no change, return
        if(JSON.stringify(tempItems.current) === JSON.stringify(items)) return;
        
        // Else update
        setCurrentItems([...tempItems.current].sort((a,b) => a.order - b.order));
        onDragEnd([...tempItems.current].sort((a,b) => a.order - b.order));
        
        // Resetting transform style
        refs.current.forEach(ref => {
            if(!ref.current) return;
            ref.current.style.transform = '';
        })
    }, [items, onDragEnd, tempItems.current]);

    useEffect(() => {
        // Updating tempItems on items array change
        if(JSON.stringify(tempItems.current) !== JSON.stringify(items)) {
            tempItems.current = items.map(item => ({...item})).sort((a,b) => a.order - b.order);
            setCurrentItems(items.map(item => ({...item})).sort((a,b) => a.order - b.order));
        }

        document.addEventListener('dragend', handleDragEnd);

        return () => document.removeEventListener('dragend', handleDragEnd);
    }, [items]);

    // Fetching reference for sortable item
    const getReference = useCallback((index: number) => {
        // Checks if reference exist
        if(refs.current[index]) return refs.current[index];

        // Else create new
        const ref = React.createRef<HTMLDivElement>();
        refs.current.push(ref);
        return ref;
    }, []);

    // Updating if items are draggable
    const disableDragging = useCallback(() => setDraggable(false), [setDraggable]);
    const enableDragging = useCallback(() => setDraggable(true), [setDraggable]);

    const value = {
        changeIndex,
        disableDragging,
        enableDragging,
        draggable
    }

    return(
        <SortableContext.Provider value={value}>
            {currentItems.map((item, index) => <SortableItem item={item} component={component} index={index} ref={getReference(index)} key={item.id} />)}
        </SortableContext.Provider>
    )
}

type SortableItemProps = {
    index: number;
    item: any;
    component: FunctionComponent<any>;
    ref: React.RefObject<HTMLDivElement>;
}
const SortableItem: React.FC<SortableItemProps> = React.memo(React.forwardRef<HTMLDivElement, SortableItemProps>(({ component: Component, index, item }, forwardRef) => {
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