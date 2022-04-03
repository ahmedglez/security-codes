import React from "react";

function Input_Component(props) {
return(
    <React.Fragment>
         <input
              type='text'
              class='form-control'
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              placeholder='Security Code'
              onChange={props.onWrite}
            />
    </React.Fragment>
)
}

export {Input_Component}