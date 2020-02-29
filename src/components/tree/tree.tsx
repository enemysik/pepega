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
        setSelectedNode={this.setSelectedNode}
        hasChildren={node.children.length > 0}
        checked={Boolean(node.checked)}>{this.generateTree(node.children)}</Node>;
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

}
