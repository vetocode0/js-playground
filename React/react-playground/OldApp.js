import React from "react";
import AlwaysMobileProps from "./Props/AlwaysMobileProps";

import AlwaysMobileProps from "./Props/AlwaysMobileProps";

class App extends React.Component {
    render() {
        return (
            <div>
                <AlwaysMobileProps name="Guest 1" place="Atlanta, GA" />
                <AlwaysMobileProps name="Honorable Guest 2" place="Wakanda, GA" /> 
            </div>
        )
    }
}

export default App;