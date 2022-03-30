/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Loading } from "./components/Loading";

const initialState = {
  value: "paradigma",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onWrite = (event) => {
    dispatch({ type: "WRITE" });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          dispatch({ type: "CONFIRM" });
        } else {
          dispatch({ type: "ERROR" });
        }
      }, 3000);
    }
  }, [state.loading]);

  /* Initial State */
  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad</p>

        {state.error && state.loading === false && (
          <p>Error: El código es incorrecto</p>
        )}
        {state.loading && <Loading />}
        <input
          type="text"
          placeholder="Código de seguridad"
          value={state.value}
           onChange={(event) => {
            dispatch({type:"WRITE", payload: event.target.value})
          }} 
        />
        <button
          onClick={() => {
            dispatch({ type: "CHECK" });
          }}
          type="button"
        >
          Comprobar
        </button>
      </div>
    );
    /* Right Security Word but not deleted yet */
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <React.Fragment>
        <h2>Eliminar Use State {name}</h2>
        <p>¿Está seguro que desea eliminar Use State?</p>
        <button
          onClick={() => {
            dispatch({ type: "DELETE" });
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
          }}
        >
          No, volver
        </button>
      </React.Fragment>
    );
  } else {
    /* Deleted and Confirmed */
    return (
      <React.Fragment>
        <h2>Eliminado con exito</h2>
        <button
          onClick={() => {
            dispatch({ type: "RESET" });
          }}
        >
          Recuperar Use State
        </button>
      </React.Fragment>
    );
  }
}

const reducerObject = (state, payload) => {
  return {
    "ERROR": { ...state, error: true, loading: false },
    "CHECK": { ...state, loading: true },
    "CONFIRM": { ...state, loading: false, confirmed: true, error: false },
    "DELETE": { ...state, deleted: true },
    "RESET": { ...state, confirmed: false, deleted: false, value: "" },
    "WRITE": {...state, value: payload},
  };
};

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
