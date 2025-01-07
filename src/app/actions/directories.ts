'use server';
import TreeNode from '../utils/TreeNode';

const root = new TreeNode('Root');

/**
 * Creates a directory at the specified path.
 * 
 * @param {string} path The path of the directory to be added.
 * @returns {boolean} `true` if the directory was created successfully, `false` if any directory in the path doesn't exist or the end of the path is reached without createing a directory.
 */
function createDirectory(path: string): boolean {
    const directories = path.split('/');
    let parent = root;

    for (let i = 0; i < directories.length; i++) {
        const currentDir = directories[i];
        const existingChild = parent.getChild(currentDir);

        if (i === directories.length - 1 && !parent.isChildOfParent(currentDir)) {
            parent.addChild(new TreeNode(currentDir));
            return true;
        }

        if (!existingChild) {
            return false;
        }

        parent = existingChild;
    }

    return false;
}

/**
 * Moves a directory from one location to another.
 * 
 * @param {string} childPath The path of the directory to be moved.
 * @param {string} destinationPath The path of the destination directory where the child will be moved.
 * @returns {boolean} `true` if the directory was moved successfully, `false` if parent, child, or destination directories don't exist or the destination is a desendent of the directory being moved.
 */
function moveDirectory(childPath: string, destinationPath: string): boolean {
    const child = root.getChildFromPath(childPath);
    const destination = root.getChildFromPath(destinationPath);
    const parentPath = childPath.slice(0, childPath.lastIndexOf('/'));
    const parent = childPath.includes('/') ? root.getChildFromPath(parentPath) : root;

    if (parent && child && destination && !root.isDescendant(destination, child)) {
        parent.moveChildTo(destination, child);
        return true;
    }

    return false;
}

/**
 * Deletes a directory at the specified path.
 * 
 * @param {string} path The path of the directory to be deleted.
 * @returns {boolean} `true` if the directory was deleted successfully, `false` if the directory or parent doesn't exist.
 */
function deleteDirectory(path: string): boolean {
    const child = root.getChildFromPath(path);
    const parentPath = path.slice(0, path.lastIndexOf('/'));
    const parent = path.includes('/') ? root.getChildFromPath(parentPath) : root;

    if (parent && child) {
        parent.removeChild(child);
        return true;
    }

    return false;
}

/**
 * Processes a list of commands and returns the output based on the actions.
 * 
 * @param {string} inputText The list of commands to be run
 * @returns {string} A string containing the results of all the processed commands.
 */
export async function getOutputText(inputText: string): Promise<string> {
    root.clear();
    const lines = inputText.split('\n').map(line => line.trim());
    let outputText = '';

    for (const line of lines) {
        const [action, ...args] = line.split(' ').map(arg => arg.trim().toLowerCase());
        outputText += line + '\n';
        switch (action) {
            // createDirectory and moveDirectory return booleans similar to deleteDirectory. This could be used to output error text.
            case 'create':
                createDirectory(args[0]);
                break;
            case 'move':
                moveDirectory(args[0], args[1]);
                break;
            case 'delete':
                const isSuccess = deleteDirectory(args[0]);
                if (!isSuccess) {
                    outputText += 'Cannot delete ' + args[0] + ' - ' + root.getMissingDirectory(args[0]) + ' does not exist\n'
                }
                break;
            case 'list':
                outputText += root.toString();
                break; 
            default:
                //Could add to outputText here to notify of unrecognized commands.
                break;
        }
    }

    return outputText;
}
