export interface ITreeNode {
  id: number;
  checked?: boolean;
  children: ITreeNode[];
}
