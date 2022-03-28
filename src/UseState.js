import React from "react";
import { Loading } from "./components/Loading";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  console.log(state);

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          //setLoading(false);
          setState({ ...state, loading: false, confirmed: true });
          if (!!state.error) {
            //setError(false);
            setState({ ...state, error: false });
          }
        } else {
          //setLoading(false);
          //setError(true);
          setState({ ...state, loading: false, error: true });
        }
      }, 3000);
    }
  }, [state.loading]);

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
            //setValue(event.target.value);
            setState({ ...state, value: event.target.value });
          }}
        />
        <button
          onClick={() => {
            //setLoading(true);
            setState({ ...state, loading: true });
          }}
          type="button"
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <React.Fragment>
        <h2>Eliminar Use State {name}</h2>
        <p>¿Está seguro que desea eliminar Use State?</p>
        <button
          onClick={() => {
            setState({ ...state, deleted: true });
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            setState({ ...state, confirmed: false, value: "" });
          }}
        >
          No, volver
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminado con exito</h2>
        <button
          onClick={() => {
            setState({ ...state, deleted: false, confirmed: false, value: "" });
          }}
        >
          Recuperar Use State
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
