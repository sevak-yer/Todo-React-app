import React from 'react';
import TodoList from './TodoList';
import Context from '../contexts/Context.js';
import ControlContext from '../contexts/ControlContext.js';

class App extends React.Component {
    constructor(props) {
        super(props);

       this.state = {
            value: '',
            arr:[],
            control:{}
        }

        this.id = -1;

        this.controlButtons=this.controlButtons.bind(this)
        this.all=this.all.bind(this)
        this.active=this.active.bind(this)
        this.completed=this.completed.bind(this)
        this.clearCompleted=this.clearCompleted.bind(this)

        this.closedtodo = (todo) => {
            let arr = this.state.arr
            arr.forEach((obj) => {
                if (todo===obj.todo) { 
                    arr.splice(arr.indexOf(obj),1)
                } 
            });
            this.setState({arr:arr})
        };

        this.toggleCheck = (id) => {
            let arr = this.state.arr
            arr.forEach((obj)=> {
                if (obj.id===id) {
                    if (obj.check) {
                        obj.check=false
                    } else {
                        obj.check=true
                    }
                }
            })
            this.setState({arr:arr}) 
        }
    }
 
    handleChange(event) {
        this.setState({value: event.target.value})
    } 

    handleSubmit(event) {
        event.preventDefault();
        this.id++
        const obj = {
                id: this.id,
                check:true,
                todo:this.state.value,
                toggleCheck: this.toggleCheck,
                closedtodo: this.closedtodo
            }

        let updated = this.state.arr
        updated.push(obj)
        this.setState({arr:updated})

        this.setState({value:''})
    } 

    all () {
        const control={
            all:true,
            active:false,
            completed:false
        };
        this.setState({control:control})
    }

    active () {
        const control={
            all:false,
            active:true,
            completed:false
        };
        this.setState({control:control})
    }

    completed () {
        const control={
            all:false,
            active:false,
            completed:true
        };
        this.setState({control:control})
    }

    clearCompleted () {
        let arr = this.state.arr
        for (let i = 0;i<arr.length;i++) {
            if (!arr[i].check) {
                arr.splice(i,1);
                i=i-1
            }
        }
        this.setState({arr:arr})
    }

    controlButtons() {
        let left = 0;

        const arr = this.state.arr;
        arr.forEach((obj)=> {
            if (obj.check) {
                left++
            }
        })

        let itemLeft='';
        if (left===1) {
            itemLeft='1 item left'
        } else if (left>1) {
            itemLeft=`${left} items left`
        } else {
            itemLeft=`0 item left`
        }
        
        if (this.state.arr.length!==0) {
            return (
                <li className="list-group-item" style={{fontSize:'13px',
                 display:'inline-block', color:'#717171'}}>
                    <p style={{marginRight:'30px',marginTop:'0px',marginBottom:'0px', display:'inline-block'}}><i>{itemLeft}</i></p>
                    <button onClick={this.all} style={{marginRight:'12px',marginTop:'0px',marginBottom:'0px', display:'inline-block'}}><i>All</i></button>
                    <button onClick={this.active} style={{marginRight:'12px',marginTop:'0px',marginBottom:'0px', display:'inline-block'}}><i>Active</i></button>
                    <button onClick={this.completed} style={{marginRight:'50px',marginTop:'0px',marginBottom:'0px', display:'inline-block'}}><i>completed</i></button>
                    <button onClick={this.clearCompleted} style={{marginTop:'0px',marginBottom:'0px', display:'inline-block'}}><i>clear completed</i></button>
                </li>
            )
        } else {
            return null
        }
    }
    

    render () {
        return (
        <div className="position-absolute top-50 start-50 translate-middle" >
            <h1 className="display-3" style={{border:'0px solid', outline:'none', color:'#868686', marginLeft:'150px', width:"300px"}}>Todos</h1>
            <ul className="list-group">
                <li className="list-group-item fs-5">
                    <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                        <input style={{border:'0px solid', outline:'none', 
                            color:'#868686', marginLeft:'34px', width:"360px"}}
                            value={this.state.value}
                            onChange={(e)=>{this.handleChange(e)}}
                        >
                        </input>
                    </form>
                </li>
                <ControlContext.Provider value={this.state.control}>
                    <Context.Provider value={this.state.arr}>
                            <TodoList/>
                    </Context.Provider>
                </ControlContext.Provider>
                <this.controlButtons/>
            </ul>
        </div>
        )
    }
}

export default App;