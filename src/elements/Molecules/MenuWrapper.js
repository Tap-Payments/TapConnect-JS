import React from 'react';
import { MenuList, MenuItem, TextField, Popover } from '@material-ui/core';

export default class MenuWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '302',
      width: '330',
      searchText: null,
      dropdownInfos: this.props.dropdownInfos,
    };
    this.onSearch = this.onSearch.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.setWidthHeight = this.setWidthHeight.bind(this);
  }

  setWidthHeight(props) {
    const row = document.getElementById(props.tapCardId);

    setTimeout(() => {
      const height = row.offsetHeight - 14;
      const width = props.dropDownRef.current
        ? props.dropDownRef.current.clientWidth > 330
          ? props.dropDownRef.current.clientWidth - 36
          : 294
        : this.state.width;

      if (this.state.height !== height) {
        this.setState({ height });
      }
      if (this.state.width !== width) {
        this.setState({ width });
      }
    }, 1);
  }

  componentWillReceiveProps(props) {
    this.setState({
      dropdownInfos: props.dropdownInfos,
    });
  }

  onSearch(event) {
    this.setState({
      searchText: event.target.value,
      dropdownInfos: this.props.filter(event.target.value),
    });
  }

  onEnter() {
    if (this.props.selectedMenuItemRef.current) this.props.selectedMenuItemRef.current.focus();
  }

  onEntered() {
    if (this.props.selectedMenuItemRef.current) this.props.selectedMenuItemRef.current.focus();
  }

  componentDidUpdate() {
    this.setWidthHeight(this.props);
  }

  render() {
    let props = this.props;

    return (
      <Popover
        id={props.tapDropdown}
        direction={props.direction}
        onEnter={this.onEnter}
        onEntered={this.onEntered}
        keepMounted={false}
        anchorOrigin={{
          vertical: 'center',
          horizontal: window.innerWidth <= '768' ? 'center' : props.direction === 'rtl' ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: window.innerWidth <= '768' ? 'center' : props.direction === 'rtl' ? 'left' : 'right',
        }}
        classes={{
          paper:
            window.innerWidth <= '768'
              ? props.classes.marginNone
              : props.direction === 'rtl'
              ? props.classes.marginEnd
              : props.classes.marginStart,
        }}
        anchorEl={props.reference.current}
        open={props.dropDownOpen}
        onClose={(e) => {
          if (this.state.dropdownInfos !== props.dropdownInfos) this.setState({ dropdownInfos: props.dropdownInfos });
          props.handleClose(e);
        }}
      >
        {
          <TextField
            type="text"
            dir={props.direction}
            placeholder={props.t(props.searchPlaceholder) + '...'}
            style={{ width: this.state.width }}
            onChange={this.onSearch}
            className={props.classes.searchBar}
          />
        }
        <MenuList
          autoFocus
          ref={props.dropDownRef}
          direction={props.direction}
          style={
            window.innerWidth <= '768'
              ? {
                  fontSize: window.innerWidth / props.maxTextLength + 'px',
                  outline: 'none',
                  minHeight: this.state.height,
                }
              : {
                  maxHeight: this.state.height,
                  minHeight: this.state.height,
                  minWidth: '330px',
                  outline: 'none',
                }
          }
        >
          {this.state.dropdownInfos !== undefined &&
            this.state.dropdownInfos &&
            this.state.dropdownInfos.map((item, index) => (
              <MenuItem
                key={index}
                ref={props.isSelected(item) ? props.selectedMenuItemRef : null}
                direction={props.direction}
                selected={props.isSelected(item)}
                style={
                  index === 0
                    ? {
                        paddingTop: props.showSearchBar ? '50px' : '0px',
                        textAlign: props.direction === 'rtl' ? 'end' : 'start',
                      }
                    : { textAlign: props.direction === 'rtl' ? 'end' : 'start' }
                }
                classes={{ root: props.classes.menuItem }}
                onClick={(event) => {
                  if (this.state.dropdownInfos !== props.dropdownInfos)
                    this.setState({ dropdownInfos: props.dropdownInfos });
                  props.handleClose(index, item, event);
                }}
              >
                {props.renderMenuItem(item)}
              </MenuItem>
            ))}
        </MenuList>
      </Popover>
    );
  }
}
