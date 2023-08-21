import React, { Component } from "react";

class AlwaysMobileProps extends Component {
    render () {
        return(
            <div>
                <p>
                    Hey there, {this.props.name} from {this.props.place}! Glad you are joining us at Always Mobile!
                </p>
            </div>
        );
    }
}
export default AlwaysMobileProps;