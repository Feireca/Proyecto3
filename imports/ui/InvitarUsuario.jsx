import React, {Component} from "react";
import PropTypes from "prop-types";
import "../../client/main.css";

class InvitatePlayer extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.onClick(this.input.value);
    }

    render() {
        return (
            <div id="margentop">
                <input type="text" placeholder="Otro usuario" ref={(input) => this.input = input}/>
                <button id="btnOtherUser" onClick={this.onClick}> Invitar</button>
            </div>
        );
    }
}

InvitatePlayer.propTypes = {
    onClick : PropTypes.func.isRequired
};

export default InvitatePlayer;