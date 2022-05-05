import { Tree } from 'primereact/tree';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MenuListItem from './MenuListItem';


export default function MenuList() {
    const [nodes, setNodes] = useState(null)
    const { menu_navigation } = useSelector(state => state.menuReducer)

    useEffect(() => {
        if (menu_navigation) {
            setNodes(menu_navigation)
        }
    }, [menu_navigation])

    return (
        <div className='flex flex-col'>
            <Tree value={nodes} nodeTemplate={MenuListItem} onDragDrop={event => setNodes(event.value)} />
        </div>
    )
}

