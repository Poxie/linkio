import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import { SortableItem } from './SortableItem';

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
SortableItem.displayName = 'SortableItem';