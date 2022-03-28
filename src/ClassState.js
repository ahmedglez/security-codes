import React from "react";
import { Loading } from "./components/Loading";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }
  /* 
    componentDidMount() {
      console.log("componentDidMount");
    } */

  componentDidUpdate() {
    console.log("Actualizacion");
    if (!!this.state.loading) {
      setTimeout(() => {
        if (this.state.value === SECURITY_CODE) {
          this.setState({ loading: false, error: false });
        } else {
          this.setState({ loading: false, error: true });
        }
      }, 3000);
    }
  }

  render() {
    console.log(this.state.value);

    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad</p>
        {this.state.error && !this.state.loading && (
          <p>Error: El codigo es incorrecto</p>
        )}
        {this.state.loading && <Loading />}
        <input
          type="text"
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button
          onClick={() => {
            this.setState({ loading: true });
          }}
          type="button"
        >
          Comprobar
        </button>
      </div>
    );
  }
}

export { ClassState };
