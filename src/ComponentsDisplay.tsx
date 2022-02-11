import React, { useState } from "react";
import { CheckBox, DropDown } from './Components/index'

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
            <DropDown
            dropdownList={[
                {value: '1', label:'Ram'},
                {value: '2', label:'Shyaam'},
                {value: '3', label:'Gopal'}
            ]}
            dropdownFunction={
                (value, label) => console.log(value, label)
            }
            />
        </div>
    )
}

export default ComponentsDisplay;