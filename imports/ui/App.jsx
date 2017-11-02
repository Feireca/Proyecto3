import React, {Component} from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import InputPlayer from "./InputPlayer.jsx";
import InvitatePlayer from "./InvitarUsuario.jsx";
import Documento from "./Documento.jsx";
import {Meteor} from "meteor/meteor";
import {Usuarios} from "../api/tasks.js"
import "../../client/main.css";
import AccountsUIWrapper from "./AccountsUser.jsx";

class App extends Component {
    constructor(props) {
        super(props);

        this.onEnterPlayer = this.onEnterPlayer.bind(this);
        this.invitarUsuario = this.invitarUsuario.bind(this);
        this.verificarUsuarioEsInvitado = this.verificarUsuarioEsInvitado.bind(this);

        this.width = 800;
        this.height= 500;
        this.positionX = 0;
        this.positionY = 20;
        this.array = [];
        this.invitado = 0;        
    }

    invitarUsuario(nombreNew){
        alert(nombreNew);
        this.array[this.invitado]=nombreNew;        
        this.invitado = this.invitado+1;
        console.log(this.array);
            }
    onEnterPlayer(nombre) {
        if(nombre.length<16){
            let datos = Usuarios.find({ username: Meteor.user().profile.name }).fetch();    
            let ultimaPosicion = datos[datos.length-1];
            var repetido= 0;
            console.log(datos);
            
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
                y:this.positionY,
                userName: Meteor.user().profile.name,
                owner: Meteor.user()._id,
                invitado: this.array[this.invitado-1]
            }

            //usuario._id = Usuarios.insert(usuario);

            Meteor.call('tasks.insert', Meteor.user().profile.name, Meteor.user()._id, usuario.nombre, usuario.x, usuario.y, usuario.invitado);

            this.setState({
                currentUsuario: usuario
            });

            }
            else
            {
                alert('Palabra insertada por otro usuario');
            }
        }      
        else{
            alert('La palabra supera el máximo permitido');
        }
    }

    verificarUsuarioEsInvitado(username, callback){
        let resp = 0;
        console.log(this.array);
            console.log(username);
        for (let i = 0 ; i<this.array.length && resp<=0 ; i++) {

            if(username.localeCompare(this.array[i])===0)
                resp++;
        }
    }

    render() {
        if(Meteor.user()!==null){
            return(
            <div className="padre">
                <div className="hijo">
                    <h2 id="centro">ImagiNote</h2>
                    <h4 className="colorletra">Instrucciones:</h4>
                    <h5 className="colorletra">1. Autenticarse como usuario usando una cuenta Google.</h5>
                    <h5 className="colorletra">2. Si no hay un usuario escribiendo una palabra, escribir una palabra y empezar las notas colaborativas, tener en cuenta que no se puede repetir palabras.</h5>
                    <h5 className="colorletra">3. El máximo permitido por palabra es de 15 caracteres</h5>
                    <AccountsUIWrapper/>
                   
                           <div>
                            <InputPlayer onClick={this.onEnterPlayer}></InputPlayer>
                            <InvitatePlayer onClick ={this.invitarUsuario}></InvitatePlayer>
                            <Documento width={this.width} height={this.height}
                                       usuarios={this.props.invitados !==null?
                                        this.props.invitados:
                                        this.props.usuarios}></Documento>
                        </div> 

                   
                </div>
            </div>);
             
        }else{
              return (

            <div className="padre">
                <div className="hijo">
                    <h2 id="centro">ImagiNote</h2>
                    <h4 className="colorletra">Instrucciones:</h4>
                    <h5 className="colorletra">1. Autenticarse como usuario usando una cuenta Google.</h5>
                    <h5 className="colorletra">2. Si no hay un usuario escribiendo una palabra, escribir una palabra y empezar las notas colaborativas, tener en cuenta que no se puede repetir palabras.</h5>
                    <h5 className="colorletra">3. El máximo permitido por palabra es de 15 caracteres</h5>
                    <AccountsUIWrapper/>
                     </div>
            </div>);
        }

       
    }
}

App.propTypes = {
    usuarios: PropTypes.array.isRequired
};

if(Meteor.user()){
    Meteor.subscribe('myuser');
}

export default AppContainer = createContainer((props) => {
    Meteor.subscribe('tasks');
    return {
        usuarios: Usuarios.find({ owner: Meteor.userId()}).fetch(),
        invitados : Usuarios.find({ invitado: "Andrés Verdugo"}).fetch()
    }
}, App);