import React from "react";
import { Loading } from "./Loading";
import { Error } from "./Error";

const SECURITY_CODE = 'paradigma';

function UseState() {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState('');
    const [confirmed, setConfirmed] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);

    const initialState = {
        error: false,
        loading: false,
        value: '',
        confirmed: false,
        deleted: false
    }

    const onError = () => {
        setError(true);
        setValue('');
        setLoading(false);
    };

    const onConfirm = () => {
        setValue('');
        setConfirmed(true);
        setLoading(false);
    };

    const onWrite = (newValue) => {
        setValue(newValue);
    };

    const onDelete = () => {
        setDeleted(true);
    };

    const onCancel = () => {
        setConfirmed(false);
        setDeleted(false);
        setError(false);
    };

    const onCheck = () => {
        setLoading(true);
    };

    React.useEffect(() => {
        if (loading) {
            setTimeout(() => {
                value === SECURITY_CODE ? onConfirm() : onError();
            }, 2000);
        }
    }, [loading]);

    if (!deleted && !confirmed) {
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Por favor, escribe el código de seguridad</p>
    
                {(error && !loading) && <Error />}
                {loading && <Loading />}
                
                <input 
                    placeholder="Código de seguridad"
                    value={value}
                    onChange={(e) => {
                        onWrite(e.target.value);
                    }}
                ></input>
                <button onClick={() => onCheck()}>Comprobar</button>
            </div>
        );
    } else if (!deleted && !!confirmed) {
        return (
            <div>
                <p>¿Seguro que deseas eliminar?</p>
                <button onClick={() => onDelete()}>
                    Si, eliminar
                </button>
                <button onClick={() => onCancel()}>
                    No, cancelar
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <p>¡Eliminado con éxito!</p>
                <button onClick={() => onCancel()}>
                    Resetear
                </button>
            </div>
        );
    }

    const reducerObject = (state) => ({
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
            value: ''
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

    const reducer = (state, action) => {
        if (reducerObject(state)[action.type]) {
            return reducerObject(state)[action.type];
        } else {
            return state;
        }
    }
}

export { UseState } 