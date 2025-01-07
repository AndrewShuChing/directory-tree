export class TreeNode {
    value: string;
    children: TreeNode[];

    constructor(value: string) {
        this.value = value;
        this.children = [];
    }

    addChild(child: TreeNode): void {
        this.children.push(child);
    }

    removeChild(child: TreeNode): void {
        this.children = this.children.filter(c => c !== child);
    }

    moveChildTo(newParent: TreeNode, child: TreeNode) {
        this.removeChild(child);
        newParent.addChild(child);
    }

    isDescendant(ancestor: TreeNode, node: TreeNode): boolean {
        if (ancestor === node) return true;
        for (let child of ancestor.children) {
            if (this.isDescendant(child, node)) {
                return true;
            }
        }

        return false;
    }

    isChildOfParent(child: string): boolean {
        return this.children.some(c => c.value === child);
    }

    getChild(value: string): TreeNode | null {
        const child = this.children.find(child => child.value === value);

        return child || null;
    }

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

    toString(indentLevel: number = 0): string {
        let result = '';
        const sortedChildren = this.children.sort((a, b) => a.value.localeCompare(b.value));

        sortedChildren.forEach(child => {
            result += '  '.repeat(indentLevel) + child.value + '\n' + child.toString(indentLevel + 1);
        });

        return result;
    }

    clear(): void {
        this.children = [];
    }
}