import React from 'react';

let contextArr = [
    {
        id: 0,
        check:false,
        todo:'initial todo',
        toggleTheme: () => {},
        closedtodo: () => {}
    }
]

const Context = React.createContext (contextArr);

export default Context;