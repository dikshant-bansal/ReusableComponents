import React from 'react';
import './DropDown.scss';
import { isTablet, isMobile, isIPad13, isIPhone13 } from 'react-device-detect';
interface ListObject {
  value: string;
  label: string;
}
interface Props {
  dropdownList: ListObject[];
  dropdownFunction: (value: string, label: string) => void;
  customStyle?: string;
  customServedbyLabel?: string;
  defaultSelected?: ListObject | undefined;
  disable?: boolean;
  showToolTip?: boolean | undefined;
  atp?: boolean;
}

interface State {
  selectedLabel: string;
  showlist: boolean;
  dropdownVisible: boolean;
}

class RGDropDown extends React.Component<Props, State> {
  dropList = React.createRef<HTMLDivElement>();

  scrollLabel = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      selectedLabel: this.props.defaultSelected
        ? this.props.defaultSelected.label
        : props.dropdownList[0].label,
      showlist: false,
      dropdownVisible: false,
    };
  }

  componentDidUpdate(prevProps: Props): void {
    if (
      JSON.stringify(prevProps.defaultSelected) !== JSON.stringify(this.props.defaultSelected) &&
      this.props.defaultSelected
    ) {
      this.setState({ selectedLabel: this.props.defaultSelected.label });
    }
  }

  selectedValue = (value: string, label: string, index: number): void => {
    this.setState({ selectedLabel: this.props.dropdownList[index].label }, () => {
      if (this.dropList.current) this.dropList.current.style.display = 'none';
    });

    this.props.dropdownFunction(value, label);

    if ((isTablet || isMobile || isIPad13 || isIPhone13) && this.scrollLabel.current) {
      this.scrollLabel.current.scrollTo(0, 0);
    }
  };

  showlist = (): void => {
    if (this.dropList.current) {
      this.dropList.current.style.display = 'block';
    }
  };

  render(): React.ReactNode {
    return (
      <div className={this.props.customStyle ? `rafael-kit ${this.props.customStyle}` : 'rafael-kit'}>
        <div id="RGDropDown">
          <div className="ServedBy">
            {this.props.customServedbyLabel ? this.props.customServedbyLabel : ''}
          </div>
          <div
            className={this.props.disable ? 'dropdown-container disabled' : 'dropdown-container'}
            onClick={(): void => {
              if (!this.props.disable) {
                this.setState({ dropdownVisible: !this.state.dropdownVisible }, () => {
                  if (this.state.dropdownVisible) this.showlist();
                  else if (this.dropList.current) this.dropList.current.style.display = 'none';
                });
              }
            }}
            onMouseLeave={(): void => {
              if (this.dropList.current) this.dropList.current.style.display = 'none';
              this.setState({ dropdownVisible: false });
              if ((isTablet || isMobile || isIPad13 || isIPhone13) && this.scrollLabel.current) {
                this.scrollLabel.current.scrollTo(0, 0);
              }
            }}
          >
            <div className="filtersDropDown">
              <div
                className={'dropdown-item'}
                onClick={(): void => {
                  if (!this.props.disable) {
                    this.setState({ dropdownVisible: !this.state.dropdownVisible }, () => {
                      if (this.state.dropdownVisible) this.showlist();
                      else if (this.dropList.current) this.dropList.current.style.display = 'none';
                    });
                  }
                  if ((isTablet || isMobile || isIPad13 || isIPhone13) && this.scrollLabel.current) {
                    this.scrollLabel.current.scrollTo(0, 0);
                  }
                }}
              >
                <div
                  className={
                    this.state.dropdownVisible && (isTablet || isMobile || isIPad13 || isIPhone13)
                      ? 'dd-label dd-label-h-scroll'
                      : 'dd-label'
                  }
                  ref={this.scrollLabel}
                >
                  {this.state.selectedLabel}
                </div>
                <div
                  className="select-arrow"
                  style={
                    this.props.atp
                      ? {}
                      : {
                          transform: this.state.dropdownVisible === true ? 'rotate(180deg)' : 'rotate(0deg)',
                        }
                  }
                ></div>
              </div>
            </div>

            {this.state.dropdownVisible ? (
              <div
                className="sublink-container"
                ref={this.dropList}
                // style={{ display: this.dropList.current ? 'block' : 'none' }}
              >
                {this.props.dropdownList.map((item: ListObject, index: number) => {
                  return (
                    <div
                      key={index}
                      className="dropdown-link"
                      onClick={(): void => this.selectedValue(item.value, item.label, index)}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}
            {!this.state.dropdownVisible && this.props.showToolTip ? (
              <div className="tooltip-wrapper">
                <span className="playerTooltip">
                  <span className="tooltipText">{this.state.selectedLabel}</span>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default RGDropDown;
