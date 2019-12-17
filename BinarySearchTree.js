class BinarySearchTree {
  constructor(key=null, value=null, parent=null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value){
    if (this.value === null){
      this.key = key;
      this.value = value;
    } else if (key <= this.key){
      if (this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  get(key){
    if (key === this.key){
      return this.value;
    } else if (key < this.key){
      this.left.get(key);
    } else if (key >= this.key){
      this.right.get(key);
    } else {
      return undefined;
    }
  }

  findMin(){
    if (this.left === null){
      return this.key;
    } else {
      return this.left.findMin();
    }
  }

  replaceWith(node){
    //if node to be replaced has a parent
    if (this.parent){
      //if this node is a left node
      if (this.parent.left === node){
        this.parent.left === node;
      //if this node is a right node
      } else if (this.parent.right === node){
        this.parent.right === node;
      } 
      //connect the 'new' node to the existing node's parent
      if (node){
        node.parent = this.parent;
      } 
    //if the node to be replaced is a root
    } else {
      if (node) {
        //update values
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        //replace with null === delete
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  delete(key){
    // there are three scenarios to remove:
    // a leaf (no children)
    // node with 1 child
    // node with 2 children
    if (key === this.key){
      if (key.left === null && key.right === null){
        this.replaceWith(null);
      } else if (key.left !== null && key.right === null){
        this.replaceWith(this.left);
      } else if (key.right !== null && key.left === null){
        this.replaceWith(this.right);
      } else {
        const successor = this.right.findMin();
        //we are updating values, so we don't need to update parent, left, or right! just key and value
        this.key = successor.key;
        this.value = successor.value;
        //we do want to remove the actual minimum node, though
        //will be a leaf with no children removal
        successor.remove(successor.key);
      }
    } 

  }
}

function layers(node){
  //base
  if (node === null){
    return -1;
  } else {
    let left = layers(node.left);
    let right = layers(node.right);
    if (right > left) {
      return right + 1;
    } else {
      return left + 1;
    }
  }
}

function height(node){
  return layers(node) + 1;
}

function isBST(node){
  if (node === null){
    return true;
  } else {
    if ((node.left !== null && node.left.key > node.left) || (node.right !== null && node.right.key <= node.key)){
      return false;
    } else {
      return isBST(node.left) && isBST(node.right);
    }
  }
}

function max(node){
  if (node.right === null){
    return node;
  } else {
    return max(node.right);
  }
}

function third(node){
  let maximum = max(node);
  let nextMax = 0;
  let nextnextMax = 0;
  if (maximum.left === null){
    nextMax = maximum.parent;
  } else {
    nextMax = max(maximum.left);
  }
  if (nextMax === null){
    return 'Less than 3 nodes';
  }
  if (nextMax.left === null && nextMax.right === null){
    nextnextMax = nextMax.parent.parent;
  } else if (nextMax.left === null) {
    nextnextMax = nextMax.parent;
  } else {
    nextnextMax = max(nextMax.left);
  }
  if (nextnextMax === null){
    return 'Less than 3 nodes';
  }
  return nextnextMax.key;
}

function thirdAlt(node){
  let alt = node;
  let maximum = max(node);
  alt.delete(maximum);
  let nextMax = max(node);
  alt.delete(nextMax);
  let thirdMax = max(alt);
  // alt.insert(nextMax);
  // alt.insert(thirdMax);
  return thirdMax;
}

function balance(node){
  if (node.left !== null && node.right !==null){
    return (height(node.left) === height(node.right)) || Math.abs(height(node.left) - height(node.right)) === 1;
  } else {
    return true;
  }
}

function isEqualBST(arr1, arr2){
  if (arr1.length !== arr2.length || arr1[0] !== arr2[0]){
    return false;
  } else if(arr1.length === 1 && arr2.length === 1 && arr1[0] === arr2[0]) {
    return true;
  } else {
    let check1 = arr1[0];
    let check2 = arr2[0];
    arr1.slice(1);
    arr2.slice(2);
    //why can't i do inclusive?
    let temp1left = arr1.filter(e => e < check1);
    let temp2left = arr2.filter(e => e < check2);
    let temp1right = arr1.filter(e => e > check1);
    let temp2right = arr2.filter(e => e > check2);
    return isEqualBST(temp1left, temp2left) === isEqualBST(temp1right, temp2right);
  }
}

function splitter(array, start=0, end=array.length-1){
  if (start > end){
    return;
  } else {
    let median = Math.ceil((end + start)/2);
    let tree = new BinarySearchTree(array[median]);
    // console.log('start index:', start);
    // console.log('median index:', median);
    // console.log('end index: ', end);
    tree.left = splitter(array, start, median - 1);
    tree.right = splitter(array, median + 1, end);
    return tree;
  }
}
function dump(tree, indent='') {
  if (tree) {
    dump(tree.right, indent + '    ');
    console.log(indent + tree.key); 
    dump(tree.left, indent + '    '); 
  }
}
function main() {
  let BST = new BinarySearchTree();
  BST.insert(3, 3);
  BST.insert(1, 1);
  BST.insert(4, 4);
  BST.insert(6, 6);
  BST.insert(9, 9);
  BST.insert(2, 2);
  BST.insert(5, 5);
  BST.insert(7, 7);

  // let output = splitter([3, 5, 7, 9, 11, 13, 15]);
  // dump(output);
  let arr1 = [3, 5, 4, 6, 1, 0, 2];
  let arr2 = [3, 1, 5, 2, 4, 6, 0];
  let arr3 = [3, 6, 5, 4, 1, 0, 2];
  console.log(isEqualBST(arr1, arr2));  
  console.log(isEqualBST(arr1, arr3));
  // console.log(balance(BST));
  // console.log(BST);
  // let BSTAlt = new BinarySearchTree();
  // BSTAlt.insert('E', 'E');
  // BSTAlt.insert('A', 'A');
  // BSTAlt.insert('S', 'S');
  // BSTAlt.insert('Y', 'Y');
  // BSTAlt.insert('Q', 'Q');
  // BSTAlt.insert('U', 'U');
  // BSTAlt.insert('E', 'E');
  // BSTAlt.insert('S', 'S');
  // BSTAlt.insert('T', 'T');
  // BSTAlt.insert('I', 'I');
  // BSTAlt.insert('O', 'O');
  // BSTAlt.insert('N', 'N');
  // console.log(BSTAlt);
  // console.log('height of BST is', height(BST));
  // console.log(isBST(BST));
  // console.log(third(BST));
  // console.log(thirdAlt(BST));
}

main();

// 
/* 
1. Draw a tree 
                 3
                / \
               1   4
                \   \
                 2   6
                    / \
                   5   9
                      /
                     7



                     E
                 /       \
                A         S
                 \      /   \
                  E    Q     Y
                      / \   /
                     U   S T 
                    /
                   I
                    \
                     O
                    /
                   N

2. Draw a tree
                 4
               /   \
              1     6
               \   / \
                2 5   9
                    / 
                   7   
               


                     I
                 /       \
                A         S
                 \      /   \
                  E    Q     Y
                      / \   /
                     U   S T 
                    /
                   I
                    \
                     O
                    /
                   N       
                     
4. It should return a sum of all values. 
*/
module.exports = BinarySearchTree;