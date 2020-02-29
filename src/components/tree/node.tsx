import React from 'react';
import cn from 'classnames';
import './node.css';

export default class Node extends React.Component<INodeProps, INodeState> {
  constructor(props: INodeProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }
  toggleCollapse = (e: React.MouseEvent<HTMLSpanElement>) => {
    this.setState({ collapsed: !this.state.collapsed });
  }
  selectNode = (e: React.MouseEvent<HTMLSpanElement>) => {
    this.props.setSelectedNode(this.props.id);
  }
  render() {
    const labelClass = cn({ 'caret': this.props.hasChildren }, { 'caret-down': !this.state.collapsed });
    return (<li>
      <span className={labelClass} onClick={this.toggleCollapse}></span>
      <span onClick={this.selectNode}>{this.props.label} </span>
      <input type="checkbox" checked={this.props.checked} />
      <ul className={cn({ 'collapsed': this.state.collapsed })}> {this.props.children}</ul>
    </li >);
  }
}
interface INodeProps {
  label: string;
  id: number;
  hasChildren: boolean;
  checked: boolean;
  setSelectedNode: (id: number) => void;
}
interface INodeState {
  collapsed: boolean;
}