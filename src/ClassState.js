import React from "react";
import { Loading } from "./Loading";
import { Error } from "./Error";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            error: false,
            loading: false,
            value: ''
        };
    }

    componentDidUpdate() {
        if (this.state.loading) {
            setTimeout(() => {
                if (this.state.value === SECURITY_CODE) {
                    this.setState({loading: false, error: false, value: ''});
                } else {
                    this.setState({loading: false, error: true, value: ''});
                }
            }, 2000);
        }
    }

    render() {
        return (
            <div>
                <h2>Eliminar ClassState</h2>
                <p>Por favor, escribe el código de seguridad</p>
                {this.state.loading && <Loading />}
                {(this.state.error && !this.state.loading) && <Error />}
                <input 
                    placeholder="Código de seguridad"
                    value={this.state.value}
                    onChange={(e) => {
                        this.setState({value: e.target.value});
                    }}></input>
                <button onClick={() => this.setState({loading: true})}>Comprobar</button>
            </div>
        );
    }
}

export { ClassState }