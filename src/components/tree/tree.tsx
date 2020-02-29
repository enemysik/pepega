import React from 'react';
import Node from './node';
import './tree.css';

export default class Tree extends React.Component<ITreeProps> {
  setSelectedNode = (id: number) => {
    this.props.setSelectedNode(id);
    console.log(id);
  }
  generateTree(nodes: ITreeNode[]) {
    return nodes.map(node => {
      return <Node
        id={node.id}
        key={node.name}
        label={node.name}
        clicked={this.setSelectedNode}
        checked={this.props.selectedNodeId === node.id}>{this.generateTree(node.children)}</Node>;
    });
  }
  render() {
    return (<ul className={'tree'}>{this.generateTree(this.props.tree)}</ul>);
  }
}
export interface ITreeNode {
  id: number;
  checked: undefined | boolean;
  name: string;
  children: ITreeNode[];
}
interface ITreeProps {
  tree: ITreeNode[]
  setSelectedNode: (id: number) => void;
  selectedNodeId: number;

}
