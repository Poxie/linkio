import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Item } from '../utils/types';

type SortableContextType = {
    toggleDragging: () => void;
    enableDragging: () => void;
    disableDragging: () => void;
    isEnabled: boolean;
}
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

type Props = {
    data: Item[];
    renderComponent: any;
    onDrop: (items: Item[]) => void;
}

export const SortableItems: React.FC<Props> = ({ data, renderComponent: Component, onDrop: _onDrop }) => {
    const [items, setItems] = useState(data as (Item & {order: number})[]);
    const itemsRef = useRef(items);
    const [refs, setRefs] = useState(items.map(key => React.createRef<HTMLDivElement>()));
    const initialDirection = useRef<boolean>(false);

    // If data change, display changes
    useEffect(() => {
        setItems(orderItems(data));
    }, [data]);
    
    // Function to create new order or order items by orderproperty
    const orderItems = (items: any[]) => {
        const newItems = [...items.sort((a,b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))];
        
        return newItems;
    }

    // Ordering items on mount
    useEffect(() => {
        const ordered = orderItems(data);
        setItems(ordered);
        itemsRef.current = ordered;
    }, []);

    // Updating order
    const updateOrder = (currentIndex: number, newIndex: number) => {
        if(currentIndex === newIndex) return;

        // Updating order for affected items
        let newItems: any[] = [];
        itemsRef.current.forEach(item => {
            const newItem: any = {};
            Object.keys(item).forEach(key => {
                newItem[key] = item[key as keyof typeof item];
            })
            
            if(item.order === currentIndex) {
                newItem.order = newIndex;
            }
            if(item.order === newIndex) {
                newItem.order = currentIndex;
            }
            
            newItems.push(newItem);
        })
        itemsRef.current = orderItems(newItems);
        
        // Updating attributes
        const currentRef = refs.find(ref => parseInt(ref.current?.getAttribute('data-order') || '') === currentIndex);
        const newRef = refs.find(ref => parseInt(ref.current?.getAttribute('data-order') || '') === newIndex);
        currentRef?.current?.setAttribute('data-order', newIndex.toString());
        newRef?.current?.setAttribute('data-order', currentIndex.toString());
    }

    // Things to do on item drop
    const onDrop = () => {
        // Updating view with new values
        setItems([...itemsRef.current]);
        _onDrop && _onDrop(itemsRef.current);

        // Resetting items on drop
        refs.forEach((ref, key) => {
            if(!ref.current) return;

            ref.current.style.transition = 'none';
            ref.current.style.transform = 'none';
            ref.current.style.zIndex = "unset";
            setDirection(null, key);
        })
        initialDirection.current = false;
    }

    // Handling drag start
    const onDragStart = (index: number) => {
        // Adding initial styles and attributes
        refs.forEach((ref, key) => {
            if(!ref.current) return;
            ref.current.setAttribute('data-initial-order', key.toString());
            ref.current.style.zIndex = "2";
        })
    }
    
    // Setting attributes for directions to animate items
    const setDirection = (direction: 'up' | 'down' | null, index: number) => {
        const ref = refs[index];
        if(!ref.current) return;

        if(!direction) {
            return ref.current.removeAttribute('data-direction')
        }
        ref.current.setAttribute('data-direction', direction);
    }

    return(
        <SortableProvider>
            {items.map((item, key) => {
                return(
                    <SortableItem 
                        data={item} 
                        component={Component} 
                        order={item.order}
                        updateOrder={updateOrder}
                        onDrop={onDrop}
                        onDragStart={onDragStart}
                        ref={refs[key]}
                        key={item.id}
                    />
                )
            })}
        </SortableProvider>
    )
}

type ItemProps = {
    component: any;
    data: any;
    order: number;
    updateOrder: (currentIndex: number, newIndex: number) => void;
    onDragStart: (index: number) => void;
    onDrop: () => void;
    ref: React.Ref<HTMLDivElement>
}
const SortableItem: React.FC<ItemProps> = React.forwardRef<HTMLDivElement, ItemProps>(({ component: Component, data, order: _order, updateOrder, onDrop, onDragStart: _onDragStart }, forwardRef) => {
    const { isEnabled } = useSortable();
    const [diff, setDiff] = useState(0);
    const isDragging = useRef(false);
    const initialTop = useRef(0);
    const initialMousePos = useRef({ x: 0, y: 0 });
    const order = useRef(_order);
    const ref = useRef<HTMLDivElement>(null);

    // Being able to use both forwardRef and useRef
    useImperativeHandle(forwardRef, () => ref.current as HTMLDivElement);

    // Updating order on _order property change
    useEffect(() => {
        if(!ref.current) return;

        order.current = _order;
        initialTop.current = ref.current.getBoundingClientRect().top || 0;
    }, [_order]);

    // Initial event listener handling
    useEffect(() => {
        if(!ref.current) return;

        ref.current.addEventListener('dragstart', onDragStart);
        ref.current.addEventListener('dragend', onDragEnd);
        ref.current.addEventListener('dragenter', onDragEnter);

        return () => {
            if(!ref.current) return;
            ref.current.removeEventListener('dragstart', onDragStart);
            ref.current.removeEventListener('dragend', onDragEnd);
            ref.current.removeEventListener('dragenter', onDragEnter);
        }
    }, []);

    // Handling drag
    const onDrag = (e: DragEvent) => {
        // Determining position of item
        let diff = e.y - initialTop.current - initialMousePos.current.y;
        if(e.y === 0) diff = 0;
        setDiff(diff);

        // Setting different zIndex for active item
        if(!ref.current) return;
        ref.current.style.zIndex = "1";
    }

    // Handling drag start
    const onDragStart = (e: DragEvent) => {
        if(!ref.current) return;
        
        // Updating dragging element attributes
        isDragging.current = true;
        ref.current.style.cursor = 'grabbing';
        ref.current?.setAttribute('dragging', 'true');
        _onDragStart(order.current);

        // @ts-ignore: making sure 'drag shadow' is out of picture
        e.dataTransfer?.setDragImage(e.target, window.outerWidth, window.outerHeight);
        document.addEventListener('drag', onDrag);

        // Defining initial mouse position
        initialMousePos.current = {
            y: e.y - initialTop.current,
            x: e.x
        };
    }

    // Handling drag end
    const onDragEnd = (e: DragEvent) => {
        // Resetting properties
        if(!ref.current) return;
        document.removeEventListener('drag', onDrag);
        ref.current?.removeAttribute('dragging');
        isDragging.current = false;
        onDrop();
    }

    // Handling drag enter
    const onDragEnter = (e: DragEvent) => {
        // If item is being dragged, return
        if(isDragging.current || !ref.current) return;

        // Else set translation animation

        const myOrder = parseInt(ref.current.getAttribute('data-order') || '');
        const myInitialIndex = parseInt(ref.current.getAttribute('data-initial-order') || '');

        const fromElement = document.querySelector('[dragging="true"]');
        const fromIndex = parseInt(fromElement?.getAttribute('data-order') || '');
        const fromInitialIndex = parseInt(fromElement?.getAttribute('data-initial-order') || '');
        updateOrder(myOrder, fromIndex);

        ref.current.style.transition = 'transform .3s';

        const isUp = fromInitialIndex > myInitialIndex;
        if(myOrder >= fromIndex) {
            ref.current.style.transform = `translateY(${isUp ? 0 : '-74px'})`;
        } else {
            ref.current.style.transform = `translateY(${isUp ? '74px' : 0})`;
        }
    }

    return(
        <div 
            style={{ 
                transform: diff ? `translateY(${diff}px)` : 'unset', 
                userSelect: isEnabled ? 'none' : 'unset',
                cursor: isEnabled ? 'grab' : 'unset'
            }}
            data-order={_order}
            tabIndex={0}
            draggable={isEnabled}
            ref={ref}
        >
            <Component {...data} />
        </div>
    )
});