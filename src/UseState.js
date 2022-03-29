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

  const onConfirm = () => {
    setState({ ...state, loading: false, confirmed: true, error: false });
  };

  const onError = () => {
    setState({ ...state, loading: false, error: true });
  };

  const onWrite = (event) => {
    setState({ ...state, value: event.target.value });
  };

  const onCheck = () => {
    console.log(state);

    setState({ ...state, loading: true });
  };

  const onDelete = () => {
    setState({ ...state, deleted: true });
  };

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false, value: "" });
  };

  React.useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
            onWrite(event);
          }}
        />
        <button
          onClick={() => {
            onCheck();
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
            onDelete();
          }}
        >
          Si, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
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
            onReset();
          }}
        >
          Recuperar Use State
        </button>
      </React.Fragment>
    );
  }
}

export { UseState };
