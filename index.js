/**
 * Created by PhpStorm.
 * User: TJ 
 * Date: 20/01/19
 * Time: 02:30 PM
 */
 

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.less';

import { Icon, Button } from 'Components/UI';

class Select extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.options !== prevState.options) {
      return { options: nextProps.options };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: [],
      options: [],
      inputValue: '',
    };

    this.dropDown = this.dropDown.bind(this);
    this.selected = this.selected.bind(this);
    this.openDropdown = this.openDropdown.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.addSelected = this.addSelected.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.addOption = this.addOption.bind(this);

    this.containerRef = React.createRef();
  }

  /**
   * Add click event to register click outside of drodpown
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Remove click event to register click outside of drodpown
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Change inputValue in the state
   * @param {Event} event event from the input
   */
  onInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  /**
   * Transform options array to an object
   */
  getOptions() {
    const { options } = this.state;
    const optionObject = {};
    options.forEach((item) => {
      optionObject[item.id] = item.label;
    });
    return optionObject;
  }

  /**
   * Determines if placeholder should be displayed
   */
  getPlaceholder() {
    const { selected } = this.state;
    const { placeholder } = this.props;

    if (selected.length === 0) {
      return placeholder;
    }
    return '';
  }

  /**
   * add id of the selected item into selected list
   * @param {number} optionId
   */
  addSelected(optionId) {
    const { selected } = this.state;
    this.setState({ selected: [...selected, optionId], inputValue: '' });
  }

  /**
   * Change value of the selected item. Callback method is called if provided
   * @param {HemlEvent} event
   * @param {number} optionId
   */
  changeSelected(event, optionId) {
    event.stopPropagation();
    const { onChangeSelected } = this.props;
    const { options } = this.state;
    const { value } = event.target;

    const option = options.find(item => item.id === optionId);
    option.label = value.toUpperCase();
    const newOptions = options.filter(item => item.id !== optionId);
    this.setState({ options: [...newOptions, option] });
    onChangeSelected(optionId, event.target.value);
  }

  /**
   * Add new option to the options. Callback method is called if provided
   */
  addOption() {
    const { onAddNewItem } = this.props;
    const { inputValue, options } = this.state;
    if (!options.find(option => option.label === inputValue.toUpperCase())) {
      const id = Math.round(Math.random() * 1000);
      onAddNewItem(inputValue);
      options.push({ id, label: inputValue.toUpperCase() });
      this.setState({ inputValue: '' });
    }
  }

  /**
   * Check if click was outside dropdown element
   * @param {HtmlEvent} event
   */
  handleClickOutside(event) {
    const { open } = this.state;
    if (this.containerRef && this.containerRef.current && !this.containerRef.current.contains(event.target)) {
      if (open) {
        this.setState({ open: false });
      }
    }
  }

  /**
   * Remove id from selected list
   * @param {HtmlEvent} event
   * @param {} optionId
   */
  removeSelected(event, optionId) {
    event.stopPropagation();
    const { selected } = this.state;
    const filterSelected = selected.filter(item => item !== optionId);
    this.setState({ selected: filterSelected, inputValue: '' });
  }

  /**
   * Opens drodpwon if not already
   */
  openDropdown() {
    const { open } = this.state;
    if (!open) {
      this.setState({ open: true });
    }
  }

  /**
   * Displays dropdown
   */
  dropDown() {
    const { optionColor, onAddNewItem } = this.props;
    const { options, inputValue, selected } = this.state;
    const renderOptions = options
      .filter(
        option => option.label.toUpperCase().indexOf(inputValue.toUpperCase()) > -1 && !(selected.indexOf(option.id) > -1),
      )
      .map(option => (
        <li styleName="text-blue" onClick={() => this.addSelected(option.id)} key={`dropdown_${option.id}`}>
          {option.label}
        </li>
      ));

    if (inputValue && onAddNewItem) {
      renderOptions.push(
        <li onClick={this.addOption} styleName="dropdown_last" key="dropdown_last">
          CREATE NEW
        </li>,
      );
    }

    return <ul styleName="select-dropdown">{renderOptions}</ul>;
  }

  /**
   * Renders selected items
   */
  selected() {
    const { selected } = this.state;
    const { itemColor } = this.props;
    const optionsObject = this.getOptions();
    if (selected.length > 0) {
      const renderSelected = selected.map(optionId => (
        <div styleName="selected-item text-blue with-background with-border" key={`selected_${optionId}`}>
          <input type="text" value={optionsObject[optionId]} onChange={event => this.changeSelected(event, optionId)} />
          <Button onClick={event => this.removeSelected(event, optionId)} transparent>
            <Icon name="close" size={12} />
          </Button>
        </div>
      ));
      return <Fragment>{renderSelected}</Fragment>;
    }

    return null;
  }

  render() {
    const { open, inputValue } = this.state;
    const { label } = this.props;

    return (
      <div ref={this.containerRef} styleName="select-container">
        {label && <span>{label}</span>}
        <div
          tabIndex="0"
          role="button"
          aria-pressed="false"
          onKeyDown={this.openDropdown}
          onClick={this.openDropdown}
          styleName="select-input-wrapper"
        >
          {this.selected()}
          <input
            placeholder={this.getPlaceholder()}
            type="text"
            onChange={this.onInputChange}
            value={inputValue}
            styleName="select"
          />
          {open && this.dropDown()}
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string,
  itemColor: PropTypes.func,
  optionColor: PropTypes.func,
  placeholder: PropTypes.string,
  onAddNewItem: PropTypes.func,
  onChangeSelected: PropTypes.func,
};

Select.defaultProps = {
  label: '',
  itemColor: () => '',
  optionColor: () => '',
  placeholder: '',
  onAddNewItem: () => null,
  onChangeSelected: () => null,
};

export default Select;
