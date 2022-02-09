import React, { useState } from "react";
import { CheckBox } from './Components/index'

const ComponentsDisplay = () => {
    const [checkbox, setcheckbox] = useState(false);

    return (
        <div className="CmponentsDisplay">
            <CheckBox
                isDisabled={false}
                isChecked={checkbox}
                onChangeFunc={() => {
                    console.log('Checkbox OnChange Function')
                    setcheckbox(!checkbox)
                }}
            />
        </div>
    )
}

export default ComponentsDisplay;