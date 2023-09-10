import { text } from 'd3';
import { useEffect, useState } from 'react';
import { assert } from '../util';

const LEFT = 0;
const RIGHT = 1;
interface LeafNode {
  char: string;
  bits: string;
}
interface BranchNode {
  char: null;
  bits: null;
}
export type Node = LeafNode | BranchNode;

export class TreeNode {
  value: Node;
  descendants: Array<TreeNode>;
  isInvisible: boolean; // will be used to create an inviable root for separate trees
  parent?: TreeNode; // if undefined, root
  count: number; // Frequency of node

  constructor(value: Node, isInvisible: boolean, count: number) {
    this.value = value;
    this.descendants = [];
    this.isInvisible = isInvisible;
    this.parent = undefined;
    this.count = count;
  }

  get left() {
    return this.descendants[LEFT];
  }

  set left(node: TreeNode) {
    this.descendants[LEFT] = node;
    if (node) {
      node.parent = this;
    }
  }

  get right() {
    return this.descendants[RIGHT];
  }

  set right(node: TreeNode) {
    this.descendants[RIGHT] = node;
    if (node) {
      node.parent = this;
    }
  }
}
interface Char {
  char: string;
  count: number;
}
export function createTree(text: string) {
  // count the freqs of chars with a hashmaps
  const charFreqs = new Map<string, number>();
  for (let i = 0; i < text.length; i++) {
    let letter = text[i];
    // using nullish coalescing operator ?? 
    charFreqs.set(letter, (charFreqs.get(letter) ?? 0) + 1);
  }

  // sort them in an array
  const charArray = [...charFreqs].map(([char, count]) => ({ char, count }));
  charArray.sort((a, b) => a.count - b.count);  

  // make an array of nodes
  const nodeArray = new Array<TreeNode>();
  const branchNode: Node = { char: null, bits: null };
  charArray.forEach((ch) => {
    // Create new treeNode with count and char
    let tempNode: Node = { char: ch.char, bits: '' };
    let node = new TreeNode(tempNode, false, ch.count);
    // node.left = root;
    // node.right = root;
    // append it to the nodeArray
    nodeArray.push(node);
  });

  // build a tree from the nodes
  // while (nodeArray.length > 1) {
  //   // I think this does it but I don't have a good way to display it
  //   let tempCount = nodeArray[0].count + nodeArray[1].count; // Compound the first 2 nodes
  //   let temp = new TreeNode(branchNode, false, tempCount); // Create a new middle node
  //   temp.left = nodeArray[0]; // Point to the left node
  //   temp.right = nodeArray[1]; // Point to the right node
  //   nodeArray.splice(0, 2); // Remove first 2 nodes from array
  //   let index = nodeArray.findIndex((element) => {
  //     return element.count >= tempCount;
  //   });
  //   nodeArray.splice(index, 0, temp); // Add temp node to start of array
  // }
  while (nodeArray.length > 1) {
    const tempCount = nodeArray[0].count + nodeArray[1].count;
    const temp = new TreeNode(branchNode, false, tempCount);
    temp.left = nodeArray[0];
    temp.right = nodeArray[1];
    nodeArray.splice(0, 2);
  
    let insertIndex = 0;
    let low = 0;
    let high = nodeArray.length - 1;
    // For an array that has been sorted, we can use binary search.
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (nodeArray[mid].count < tempCount) {
        low = mid + 1;
        insertIndex = low;
      } else if (nodeArray[mid].count > tempCount) {
        high = mid - 1;
        insertIndex = mid;
      } else {
        insertIndex = mid;
        break;
      }
    }
  }

  return nodeArray[0];
}

export function useHuffmanTree(text: string): TreeNode {
  const [tree, setTree] = useState<TreeNode>(() => {
    return createTree(text);
  });

  useEffect(() => {
    setTree(createTree(text));
  }, [text]);

  return tree;
}

export type BitString = Readonly<(0 | 1)[]>;

export type CompressedHuffmanData = {
  char: string;
  idx: number;
  bits: BitString;
}[];

export function genenrateCompressedData(
  text: string,
  tree: TreeNode | undefined,
): CompressedHuffmanData {
  const lookupTable: Partial<Record<string, BitString>> = {};

  // build the lookup table
  (function r(node: TreeNode | undefined, bits: BitString) {
    if (node === undefined) return;
    if (node.value.char !== null) {
      lookupTable[node.value.char] = bits;
    }
    r(node.left, [...bits, 0]);
    r(node.right, [...bits, 1]);
  })(tree, []);
  
  let ans = [...text].map((char, idx) => {
    const bits = lookupTable[char];
    // 如果不成立就会抛出一个错误
    assert(
      bits !== undefined,
      'compression failed - text contained characters not present in tree',
    );
    return { char, idx, bits };
  })
  return ans;
}

export function useHuffmanCompressedData(
  text: string,
  tree: TreeNode,
): CompressedHuffmanData {
  const [val, setVal] = useState<CompressedHuffmanData>(() =>
    genenrateCompressedData(text, tree),
  );

  useEffect(() => {
    setVal(genenrateCompressedData(text, tree));
  }, [/*text, */ tree]);

  return val;
}
