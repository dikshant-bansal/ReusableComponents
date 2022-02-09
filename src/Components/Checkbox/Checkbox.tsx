import React from 'react';
import './Checkbox.scss';

export interface Props {
  isDisabled: boolean;
  isChecked: boolean;
  customStyle?: string;
  onChangeFunc: () => void;
}

const Checkbox: React.FC<Props> = ({ isDisabled, isChecked, customStyle = '', onChangeFunc }) => {
  return (
    <React.Fragment>
      <input
        type="checkbox"
        className={customStyle + ' pp_checkbox ' + (isDisabled ? 'disabledCheckbox' : 'enabledCheckbox')}
        disabled={isDisabled}
        checked={isDisabled ? false : isChecked}
        onChange={event => {
          event.stopPropagation();
          onChangeFunc();
        }}
      />
    </React.Fragment>
  );
};

export default Checkbox;
