import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import InputPlayer from "./InputPlayer.jsx";
import Documento from "./Documento.jsx";
import {Usuarios} from "../api/usuarios.js"
import "../../client/main.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.onEnterPlayer = this.onEnterPlayer.bind(this);

        this.width = 800;
        this.height= 500;
        this.positionX = 0;
        this.positionY = 20;
        this.array = [];
    }

    onEnterPlayer(nombre) {
        console.log(nombre);

        let datos = Usuarios.find({}).fetch();
        let ultimaPosicion = datos[datos.length-1];

        if(ultimaPosicion === undefined){
            this.positionX = 10;
        }

        if(ultimaPosicion != undefined){
            this.positionX = this.positionX + (ultimaPosicion.nombre.length*8) + 10;

            if(this.positionX+nombre.length > this.width-(ultimaPosicion.nombre.length*8)) {
                this.positionY = this.positionY + 20;
                this.positionX = 10;
                this.contador = 0;
            }
        }


        let usuario = {
            nombre: nombre,
            x:this.positionX,
            y:this.positionY
        }

        usuario._id = Usuarios.insert(usuario);
        

        this.setState({
            currentUsuario: usuario
        });
    }

    render() {
        return (
            <div className="padre">
                <div className="hijo">
                    <h2 id="centro">ImagiNote</h2>
                    <InputPlayer onClick = {this.onEnterPlayer}></InputPlayer>
                    <Documento width={this.width} height={this.height} usuarios={this.props.usuarios}></Documento>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    usuarios: PropTypes.array.isRequired
};

export default createContainer(() => {
    return {
        usuarios: Usuarios.find({}).fetch()
    }
}, App);