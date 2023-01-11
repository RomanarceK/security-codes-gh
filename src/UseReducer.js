import React from "react";
import { Loading } from "./Loading";
import { Error } from "./Error";

const SECURITY_CODE = 'paradigma';

function UseReducer() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    
    // actionCreator
    const onCancel = () => {
        dispatch({type: 'CANCEL'});
    }

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                state.value === SECURITY_CODE ? dispatch({type: 'CONFIRM'}) : dispatch({type: 'ERROR'});
            }, 2000);
        }
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar UseReducer</h2>
                <p>Por favor, escribe el código de seguridad</p>
    
                {(state.error && !state.loading) && <Error />}
                {state.loading && <Loading />}
                
                <input 
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(e) => {
                        dispatch({type: 'WRITE', payload: e.target.value})
                    }}
                ></input>
                <button onClick={() => dispatch({type: 'CHECK'})}>Comprobar</button>
            </div>
        );
    } else if (!state.deleted && !!state.confirmed) {
        return (
            <div>
                <p>¿Seguro que deseas eliminar?</p>
                <button onClick={() => dispatch({type: 'DELETE'})}>
                    Si, eliminar
                </button> 
                {/* Utilizamos actionCreators para abstraer el llamado al dispatch */}
                <button onClick={onCancel}> 
                    No, cancelar
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <p>¡Eliminado con éxito!</p>
                <button onClick={onCancel}>
                    Resetear
                </button>
            </div>
        );
    }
}

const initialState = {
    error: false,
    loading: false,
    value: '',
    confirmed: false,
    deleted: false
};

const reducerObject = (state, payload) => ({
    'ERROR': {
        ...state,
        error: true,
        value: '',
        loading: false
    },
    'CHECK': {
        ...state,
        loading: true
    },
    'CANCEL': {
        ...state,
        confirmed: false,
        deleted: false,
        error: false 
    },
    'WRITE': {
        ...state,
        value: payload
    },
    'DELETE': {
        ...state,
        deleted: true
    },
    'CONFIRM': {
        ...state,
        confirmed: true,
        value: '',
        loading: false
    }
});

//Los reducers también pueden crearse con condicionales if o switch, sin necesidad de crear un reducerObject
const reducer = (state, action) => { 
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

export { UseReducer } 