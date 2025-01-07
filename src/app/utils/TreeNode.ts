/**
 * Represents a tree node data stucture
 * Provides methods to manage and interact with the tree structure.
 */

export default class TreeNode {
    value: string;
    children: TreeNode[];

    constructor(value: string) {
        this.value = value;
        this.children = [];
    }

     /**
     * Adds a child node to the current node.
     * 
     * @param {TreeNode} child The child node to add.
     */

    addChild(child: TreeNode): void {
        this.children.push(child);
    }

    /**
     * Removes a child node from the current node.
     * 
     * @param {TreeNode} child The child node to remove.
     */

    removeChild(child: TreeNode): void {
        this.children = this.children.filter(c => c !== child);
    }

     /**
     * Moves a child node from the current node to a new parent node.
     * 
     * @param {TreeNode} newParent The new parent node to move the child to.
     * @param {TreeNode} child The child node to move.
     */
    moveChildTo(newParent: TreeNode, child: TreeNode): void {
        this.removeChild(child);
        newParent.addChild(child);
    }

    /**
     * Clears all children from the current node.
     */
    clear(): void {
        this.children = [];
    }

    /**
     * Checks if a node is a descendant of the given ancestor node.
     * 
     * @param {TreeNode} ancestor The ancestor node to check.
     * @param {TreeNode} node The node to check for as a descendant.
     * @returns {boolean} `true` if the node is a descendant of the ancestor; otherwise, `false`.
     */
    isDescendant(ancestor: TreeNode, node: TreeNode): boolean {
        if (ancestor === node) return true;
        for (const child of ancestor.children) {
            if (this.isDescendant(child, node)) {
                return true;
            }
        }

        return false;
    }

     /**
     * Checks if a specific child exists from the current node.
     * 
     * @param {string} value The value of the child node to check for.
     * @returns {boolean} `true` if the child exists; otherwise, `false`.
     */
    isChildOfParent(value: string): boolean {
        return this.children.some(c => c.value === value);
    }

    /**
     * Retrieves a child node from the current node by its value.
     * 
     * @param {string} value The value of the child node to find.
     * @returns {TreeNode | null} The child node if found, otherwise `null`.
     */
    getChild(value: string): TreeNode | null {
        const child = this.children.find(child => child.value === value);

        return child || null;
    }

    /**
     * Retrieves a node from a specified path.
     * 
     * @param {string} path The path to the node, where each directory is separated by '/'.
     * @returns {TreeNode | null} The final node in the path if it exists, otherwise `null`.
     */
    getChildFromPath(path: string): TreeNode | null {
        const directories = path.split('/');
        let child: TreeNode | null = this;

        for (const directory of directories) {
            child = child.getChild(directory);
            if (!child) {
                return null;
            }
        }

        return child;
    }

    /**
     * Checks if a directory in the given path is missing from the current node.
     * 
     * @param {string} path The path to check for the missing directory.
     * @returns {string | null} The first missing directory if found, otherwise `null`.
     */
    getMissingDirectory(path: string): string | null {
        const directories = path.split('/');
        let currentChild: TreeNode = this;

        for (const directory of directories) {
            const child = currentChild.getChild(directory);
            if (!child) {
                return directory;
            }
            currentChild = child;
        }

        return null;
    }

    /**
     * Converts the tree starting from this node to a string representation.
     * 
     * @param {number} indentLevel The level of indentation for formatting.
     * @returns {string} A string representing the tree structure, with child nodes indented.
     */
    toString(indentLevel: number = 0): string {
        let result = '';
        const sortedChildren = this.children.sort((a, b) => a.value.localeCompare(b.value));

        sortedChildren.forEach(child => {
            result += '  '.repeat(indentLevel) + child.value + '\n' + child.toString(indentLevel + 1);
        });

        return result;
    }
}
