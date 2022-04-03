/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './style.css';
import { Loading } from '../Loading/Loading';
import { Input_Component } from '../Input_Component';

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

/* To adapt it to your application, request the keyword to your server or define
 your own keyword and save it into this variable */
const SECURITY_CODE = 'paradigm';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onWrite = (event) => {
    dispatch({
      type: actionTypes.write,
      payload: event.target.value,
    });
    console.log(state.value);
  };

  React.useEffect(() => {
    console.log(state);
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          dispatch({ type: actionTypes.confirm });
        } else {
          dispatch({ type: actionTypes.error });
        }
      }, 3000);
    }
  }, [state.loading]);

  /* Initial State */
  if (!state.deleted && !state.confirmed) {
    return (
      <React.Fragment>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css'
          integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
          crossorigin='anonymous'
        ></link>
        <script
          src='https://code.jquery.com/jquery-3.2.1.slim.min.js'
          integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
          crossorigin='anonymous'
        ></script>
        <script
          src='https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js'
          integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'
          crossorigin='anonymous'
        ></script>
        <script
          src='https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js'
          integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl'
          crossorigin='anonymous'
        ></script>

        <div id='main' className='main-container container '>
          <div className='row justify-content-center'></div>
          <h2 className='col'>Delete {name}</h2>
          <p className='col '> Please, write the security code</p>

          {state.error && state.loading === false && (
            <p>Error: security code is incorrect</p>
          )}
          {state.loading && <Loading />}

          <div className='input-group mb-3'>
            <div className='input-group-prepend'></div>
            <Input_Component onWrite={onWrite} />
          </div>

          <button
            type='button'
            className='btn btn-danger col-7'
            onClick={() => {
              dispatch({ type: actionTypes.check });
            }}
          >
            Delete
          </button>
        </div>
      </React.Fragment>
    );
    /* Right Security Word but not deleted yet */
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <React.Fragment>
        <div id='main' className='container-fluid main-container '>
          <div className='row justify-content-center'></div>
          <h2 className='col'>Delete {name}</h2>
          <p className='col'> Are you sure you want to delete {name}?</p>

          {state.error && state.loading === false && (
            <p>Error: security code is incorrect</p>
          )}
          {state.loading && <Loading />}

          <div className='input-group mb-3'>
            <div className='input-group-prepend'></div>
          </div>

          <div className='button-container'>
            <button
              type='button'
              className='btn btn-danger '
              onClick={() => {
                dispatch({ type: actionTypes.delete });
              }}
            >
              Yes, delete
            </button>

            <button
              type='button'
              className='btn btn-outline-secondary  '
              onClick={() => {
                dispatch({ type: actionTypes.reset });
              }}
            >
              No, go back
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    /* Deleted and Confirmed */
    return (
      <React.Fragment>
        <div id='main' className='container-fluid main-container '>
          <div className='row justify-content-center'></div>

          <h3 className='col'> Do you want to recover {name}?</h3>

          {state.loading && <Loading />}

          <div className='button-container'>
            <button
              type='button'
              className='btn btn-outline-success'
              onClick={() => {
                dispatch({ type: actionTypes.reset });
              }}
            >
              Recover
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const reducerObject = (state, payload) => {
  return {
    [actionTypes.error]: { ...state, error: true, loading: false },
    [actionTypes.check]: { ...state, loading: true },
    [actionTypes.confirm]: {
      ...state,
      loading: false,
      confirmed: true,
      error: false,
    },
    [actionTypes.delete]: { ...state, deleted: true },
    [actionTypes.reset]: {
      ...state,
      confirmed: false,
      deleted: false,
      value: '',
    },
    [actionTypes.write]: { ...state, value: payload },
  };
};

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

const actionTypes = {
  error: 'ERROR',
  check: 'CHECK',
  confirm: 'CONFIRM',
  delete: 'DELETE',
  reset: 'RESET',
  write: 'WRITE',
};

export { UseReducer };
