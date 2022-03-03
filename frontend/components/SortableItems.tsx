import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Item } from '../utils/types';

type Props = {
    data: Item[];
    renderComponent: any;
    onDragEnd: (items: Item[]) => void;
}
type ItemProps = Item & {component: any, ref: React.Ref<HTMLDivElement>};
type ItemContextType = {
    elementRefs: React.Ref<HTMLDivElement>[];
    items: Item[];
    swapItems: (draggedIndex: number, enteredIndex: number) => void;
    onDragStart: (startIndex: number) => void;
    onDragEnd: () => void;
}
type SortableContextType = {
    toggleDragging: () => void;
    enableDragging: () => void;
    disableDragging: () => void;
    isEnabled: boolean;
}

// Sortable context - allowing to disable/enable dragging
const SortableContext = React.createContext({} as SortableContextType);
export const useSortable = () => React.useContext(SortableContext);
const SortableProvider: React.FC = ({ children }) => {
    const [disabled, setDisabled] = useState(false);

    const toggleDragging = () => setDisabled(!disabled);
    const enableDragging = () => setDisabled(false);
    const disableDragging = () => setDisabled(true);

    const value = {
        toggleDragging,
        enableDragging,
        disableDragging,
        isEnabled: !disabled
    }
    return(
        <SortableContext.Provider value={value}>
            {children}
        </SortableContext.Provider>
    )
}

// Item context - allowing items to directly interactive with the context state
const ItemContext = React.createContext({} as ItemContextType);
const useItems = () => React.useContext(ItemContext);
const ItemProvider: React.FC<{items: Item[], onDragEnd: (items: Item[]) => void}> = ({ children, items: _items, onDragEnd: _onDragEnd }) => {
    const itemElements = _items.map(() => React.createRef<HTMLDivElement>());
    const [items, setItems] = useState(_items);
    const itemRef = useRef(items);

    // If item data changes
    useEffect(() => {
        setItems(_items);
        itemRef.current = _items;
    }, [_items]);
    
    // Handling swapping of item indices
    const swapItems = (draggedIndex: number, enteredIndex: number) => {
        if(draggedIndex === enteredIndex) return;
        
        const draggedItem = itemRef.current.find(item => item.order === draggedIndex);
        const enteredItem = itemRef.current.find(item => item.order === enteredIndex);
        if(!draggedItem || !enteredItem) return;

        draggedItem.order = enteredIndex;
        enteredItem.order = draggedIndex;
    }
    const onDragEnd = () => {
        // Updating UI
        const newItems = [...itemRef.current.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))];
        setItems(newItems);

        // Restoring styles to initial styles
        itemElements.forEach(item => {
            if(!item.current) return;
            const style = item.current.style;
            style.transition = '';
            style.transform = '';
            style.zIndex = '';
        })

        // Providing parent with new values
        _onDragEnd(newItems)
    }
    const onDragStart = (startIndex: number) => {
        itemElements.forEach(element => {
            const el = element.current;
            if(!el) return;

            // Checking if item is being dragged
            const dragged = el.getAttribute('dragging');

            // Adding initial styles
            el.style.transition = 'transform .3s';
            el.style.zIndex = dragged ? "1" : "2";

            // Adding position attributes to all items
            // This is based on their index and the item being dragged's index
            const order = parseInt(el.getAttribute('data-order') || '');
            if(order > startIndex) {
                el.setAttribute('data-position', 'below');
            } else {
                el.setAttribute('data-position', 'above');
            }
        })
    }

    const value = {
        elementRefs: itemElements,
        items,
        swapItems,
        onDragEnd,
        onDragStart
    }
    return(
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    )
}
export const SortableItems: React.FC<Props> = (props) => {
    const { data, renderComponent, onDragEnd } = props;

    return(
        <SortableProvider>
            <ItemProvider items={data} onDragEnd={onDragEnd}>
                <Items component={renderComponent} />
            </ItemProvider>
        </SortableProvider>
    )
}
const Items: React.FC<{component: any}> = ({ component }) => {
    const { items, elementRefs } = useItems();

    return(
        <>
        {items.map((item, key) => {
            return(
                <SortableItem 
                    {...item} 
                    component={component}
                    ref={elementRefs[key]}
                    key={item.id} 
                />
            )
        })}
        </>
    )
}
const SortableItem = React.forwardRef<HTMLDivElement, ItemProps>((item, forwardRef) => {
    const { swapItems, onDragEnd: _onDragEnd, onDragStart: _onDragStart } = useItems();
    const { isEnabled } = useSortable();
    const ref = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const initialMousePos = useRef({ x: 0, y: 0 });
    const initialTop = useRef(0);

    // Allowing both ref and forwardRef
    useImperativeHandle(forwardRef, () => ref.current as HTMLDivElement);

    const onDragStart = (e: React.DragEvent) => {
        // Removing dragging shadow
        e.dataTransfer.setDragImage(e.target as HTMLDivElement, window.outerWidth, window.outerHeight);

        if(!ref.current) return;

        // Updating dragging properties
        dragging.current = true;
        ref.current.setAttribute('dragging', "true");

        // Setting initial values
        initialTop.current = ref.current.getBoundingClientRect().top;
        initialMousePos.current = { x: e.pageX, y: e.pageY - initialTop.current };

        _onDragStart(item.order);
    }
    const onDragEnd = (e: React.DragEvent) => {
        if(!ref.current) return;

        // Resetting inittial values
        dragging.current = false;
        ref.current.removeAttribute('dragging');

        _onDragEnd();
    }
    const onDragEnter = (e: React.DragEvent) => {
        // Getting current order of item being entered
        const enteredItem = e.currentTarget as HTMLDivElement;
        const enteredIndex = parseInt(enteredItem.getAttribute('data-order') || '');
        
        // Getting the item being dragged's position
        const draggedItem = document.querySelector('[dragging]');
        const draggedIndex = parseInt(draggedItem?.getAttribute('data-order') || '');

        // Swapping items in context
        swapItems(draggedIndex, enteredIndex);

        // Updating attributes
        enteredItem.setAttribute('data-order', draggedIndex.toString());
        draggedItem?.setAttribute('data-order', enteredIndex.toString());

        // If dragged element enters itself, don't animate
        if(enteredIndex === draggedIndex) return;

        // Animating item based on position relative to dragged element
        const position = enteredItem.getAttribute('data-position') as 'above' | 'below';
        if(position === 'below') {
            if(draggedIndex > enteredIndex) {
                enteredItem.style.transform = `translateY(0)`;
            } else {
                enteredItem.style.transform = `translateY(-74px)`;
            }
        } else {
            if(draggedIndex > enteredIndex) {
                enteredItem.style.transform = `translateY(74px)`;
            } else {
                enteredItem.style.transform = `translateY(0)`;
            }
        }
    }
    const onDrag = (e: React.DragEvent) => {
        if(!ref.current) return;

        // Moving dragged element to be relative to mouse position
        const diff = e.pageY - initialTop.current - initialMousePos.current.y;
        ref.current.style.transition = `none`;
        ref.current.style.transform = `translateY(${diff}px)`;
    }

    return(
        <div 
            onDrag={onDrag}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragEnter={onDragEnter}
            data-order={item.order}
            draggable={isEnabled}
            ref={ref}
        >
            {<item.component {...item} />}
        </div>
    )
});