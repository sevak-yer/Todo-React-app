import React from 'react';

const TodoItem = (props) => {

    const closed = () => {
        props.closedtodo(props.todo)
    }

    const helper = () => {
        return props.check ? { 
            color:'#717171', display:'inline-block', marginBottom:'4px', marginLeft:'20px'} : 
            {textDecoration:'line-through', color:'#CACACA', display:'inline-block',
            marginBottom:'4px', marginLeft:'20px'}}

    return (
        <li className="list-group-item" style={{display:'inline-block'}}>
            <input className="form-check-input" type="checkbox" id="flexCheckDefault"
                style={{float:'left', marginBottom:'7px', marginTop:'9px'}} 

                onClick={() => {
                    props.toggleCheck(props.id)
                }}>

            </input>

            <p className="fs-5" style={helper()}>
                {props.todo}
            </p>

            <button type="button" className="btn-close btn-sm" aria-label="Close" 
                style={{float:'right',marginBottom:'7px', marginTop:'6.5px'}} onClick={closed}>
            </button>
        </li>
    )
}

export default TodoItem; 