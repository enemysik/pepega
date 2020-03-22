import React from 'react';
import cn from 'classnames';
import './node.css';

export default class Node extends React.Component<INodeProps, INodeState> {
  constructor(props: INodeProps) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed,
    };
  }
  toggleCollapse = () => {
    this.props.onCollapseChange(this.state.collapsed);
    this.setState({collapsed: !this.state.collapsed});
  }
  selectNode = () => {
    this.props.clicked(this.props.id);
  }
  render() {
    const hasChildren = (this.props.children as []).length > 0;
    const labelClass = cn({'caret': hasChildren}, {'caret-down': !this.state.collapsed});
    const children = !this.state.collapsed ? <ul>{this.props.children}</ul> : null;
    return (<li>
      <span className={labelClass} onClick={this.toggleCollapse}></span>
      <span onClick={this.selectNode}>{this.props.label} </span>
      <input type="checkbox" checked={this.props.checked} onChange={() => { }} />
      {children}
    </li >);
  }
}
interface INodeProps {
  label: string;
  id: number;
  checked: boolean;
  clicked: (id: number) => void;
  onCollapseChange: (value: boolean) => void;
  collapsed: boolean;
}
interface INodeState {
  collapsed: boolean;
}
