import React from 'react';
import TodoItem from './TodoItem';
import {useContext} from 'react';
import Context from '../contexts/Context';
import ControlContext from '../contexts/ControlContext';

const TodoList = () => {
    const contextArr = useContext(Context);
    const controlContext = useContext(ControlContext);

    const list =contextArr.map((obj) => {
        let todoComponent = <TodoItem 
                                key={obj.id} check={obj.check} todo={obj.todo} id={obj.id}
                                toggleCheck={obj.toggleCheck} closedtodo={obj.closedtodo}
                            />
        if (controlContext.all) {
            return todoComponent
        } else if (controlContext.active) {
            if (obj.check) {
                return todoComponent
            } else return null 
        } else if (controlContext.completed) {
            if (!obj.check) {
                return todoComponent
            } else return null
        } else {
            return todoComponent
        }
    })

    return (
        <>
            {list}
        </>
    )
}

export default TodoList