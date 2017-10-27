import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import InputPlayer from "./InputPlayer.jsx";
import Documento from "./Documento.jsx";
import {Usuarios} from "../api/tasks.js"
import "../../client/main.css";
import AccountsUIWrapper from "./AccountsUser.jsx";

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

        let datos = Usuarios.find({}).fetch();
        let ultimaPosicion = datos[datos.length-1];
        var repetido= 0;
        console.log(datos);
        console.log(datos.length);
        for (var i = 0; i <= datos.length-1 && repetido===0; i++) {

            var a = JSON.stringify(datos[i]);
            var c = JSON.parse(a);
            console.log(c);
            var d = c['nombre'].toLowerCase();
            console.log(d);
            if(d.localeCompare(nombre.toLowerCase())===0){
                repetido =1;
            }
            
        }
        if(repetido ===0){
             if(ultimaPosicion === undefined){
            this.positionX = 10;
        }

        if(ultimaPosicion != undefined){
            this.positionX = ultimaPosicion.x + 20 + ultimaPosicion.nombre.length*8;
            this.positionY = ultimaPosicion.y;


            if(this.positionX+nombre.length > this.width-(ultimaPosicion.nombre.length*8)) {
                this.positionX = 10;
                this.positionY = ultimaPosicion.y + 20;
                this.contador = 0;
            }
        }

        let usuario = {
            nombre: nombre,
            x:this.positionX,
            y:this.positionY
        }

        //usuario._id = Usuarios.insert(usuario);
        Meteor.call('tasks.insert', usuario.nombre, usuario.x, usuario.y);

        this.setState({
            currentUsuario: usuario
        });

        }
        else
        {
            alert('Palabra insertada por otro usuario');
        }
       
    }

    render() {
        return (
           
            <div className="padre">

                <div>
                </div>

             <div>
             <div></div>
                <AccountsUIWrapper/>
            </div>

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
    Meteor.subscribe('tasks');
    return {
        usuarios: Usuarios.find({}).fetch()
    }
}, App);