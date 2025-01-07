import TreeNode from '../src/app/utils/TreeNode';

const createTestTree = () => {
  const root = new TreeNode('Root');
  const child1 = new TreeNode('Child1');
  const child2 = new TreeNode('Child2');
  const child3 = new TreeNode('Child3');
  root.addChild(child1);
  root.addChild(child2);
  root.addChild(child3);
  return { root, child1, child2, child3 };
};

describe('TreeNode', () => {
  it('should add a child to the tree node', () => {
    const { root } = createTestTree();
    const newChild = new TreeNode('NewChild');
    
    root.addChild(newChild);
    expect(root.children).toContain(newChild);
  });

  it('should remove a child from the tree node', () => {
    const { root, child1 } = createTestTree();
    
    root.removeChild(child1);
    expect(root.children).not.toContain(child1);
  });

  it('should move a child from one parent to another', () => {
    const { root, child1, child2 } = createTestTree();
    
    root.moveChildTo(child1, child2);
    expect(root.children).not.toContain(child2);
    expect(child1.children).toContain(child2);
  });

  it('should clear all children from the tree node', () => {
    const { root } = createTestTree();
    
    root.clear();
    expect(root.children).toHaveLength(0);
  });

  it('should return true if a node is a descendant of another node', () => {
    const { root, child1 } = createTestTree();
    
    expect(root.isDescendant(root, child1)).toBe(true);
    expect(root.isDescendant(child1, root)).toBe(false);
  });

  it('should return true if a node is a child of the current node', () => {
    const { root } = createTestTree();
    
    expect(root.isChildOfParent('Child1')).toBe(true);
    expect(root.isChildOfParent('NonExistentChild')).toBe(false);
  });

  it('should return a specific child node by value', () => {
    const { root, child1 } = createTestTree();
    
    const foundChild = root.getChild('Child1');
    expect(foundChild).toBe(child1);
    
    const notFoundChild = root.getChild('NonExistentChild');
    expect(notFoundChild).toBeNull();
  });

  it('should return the child node from a given path', () => {
    const { root, child1 } = createTestTree();
    
    const foundChild = root.getChildFromPath('Child1');
    expect(foundChild).toBe(child1);
    
    const notFoundChild = root.getChildFromPath('NonExistentChild');
    expect(notFoundChild).toBeNull();
  });

  it('should return the first missing directory in a path', () => {
    const { root } = createTestTree();
    
    const missingDirectory = root.getMissingDirectory('Child1/NonExistentChild');
    expect(missingDirectory).toBe('NonExistentChild');
    
    const noMissingDirectory = root.getMissingDirectory('Child1');
    expect(noMissingDirectory).toBeNull();
  });

  it('should return a string representation of the tree', () => {
    const { root } = createTestTree();
    const expectedOutputText = 
            'Child1\n' +
            'Child2\n' +
            'Child3\n'
        ;
    const outputText = root.toString();
    expect(outputText).toContain(expectedOutputText);
  });
});