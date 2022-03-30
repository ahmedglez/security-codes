/* EXISTEN 3 FORMAS DE CREAR UN REDUCER */

/* BASICA
const reducer = (state, action) => { 
} */

/* MAS OBVIA
const reducerIFELSE = (state, action) => {
  if (action.type === "ERROR") {
    return { ...state, error: true, loading: false };
  } else if (action.type === "CHECK") {
    return { ...state, loading: true };
  } else if (action.type === "CONFIRM") {
    return { ...state, loading: false, confirmed: true, error: false };
  } else if (action.type === "DELETE") {
    return { ...state, deleted: true };
  } else if (action.type === "RESET") {
    return { ...state, confirmed: false, deleted: false, value: "" };
  } else {
    return {
      ...initialState,
    };
  }
}; */

/* MAS POPULAR
const reducerSwitch = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return { ...state, error: true, loading: false };
    case "CHECK":
      return { ...state, loading: true };
    case "CONFIRM":
      return { ...state, loading: false, confirmed: true, error: false };
    case "DELETE":
      return { ...state, deleted: true };
    case "RESET":
      return { ...state, confirmed: false, deleted: false, value: "" };
    default:
      return { ...state };
  }
}; */

/* MAS EFICIENTE */

const reducerObject = (state) => {
  return {
    ERROR: { ...state, error: true, loading: false },
    CHECK: { ...state, loading: true },
    CONFIRM: { ...state, loading: false, confirmed: true, error: false },
    DELETE: { ...state, deleted: true },
    RESET: { ...state, confirmed: false, deleted: false, value: "" },
  };
};

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
};
