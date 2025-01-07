'use server';
import { TreeNode } from '../utils/TreeNode';

let root = new TreeNode('Root');

const createDirectory = (path: string) => {
    const directories = path.split('/');
    let parent = root;

    for (let i = 0; i < directories.length; i++) {
        const existingChild = parent.getChild(directories[i]);

        if (i == directories.length - 1  && !parent.isChildOfParent(directories[i])) {
            const child = new TreeNode(directories[i]);
            parent.addChild(child);
        }

        if (!existingChild) {
            return;
        }

        parent = existingChild;
    };
}

const moveDirectory = (childPath: string, destinationPath: string) => {
    const directories = childPath.split('/');
    let parentPath = null;
    directories.pop();
    parentPath = directories.join('/');
    const parent = parentPath ? root.getChildFromPath(parentPath) : root;
    const child = root.getChildFromPath(childPath);
    const destination = root.getChildFromPath(destinationPath);

    if(parent && child && destination && !root.isDescendant(destination, child)){
        parent.moveChildTo(destination, child);
    }
}

const deleteDirectory = (path: string) => {
    const child = root.getChildFromPath(path);
    const directories = path.split('/');
    let parentPath = null;
    directories.pop();
    parentPath = directories.join('/');
    const parent = parentPath ? root.getChildFromPath(parentPath) : root;

    if(child && parent) {
        parent.removeChild
        return true;
    } else {
        return false;
    }
}


export async function getOutputText(inputText: string) {
    root.clear();

    const lines = inputText.split('\n');
    let outputText = '';

    lines.forEach(line => {
        line = line.trim();
        const command = line.split(' ');
        const action = command[0].trim().toLocaleLowerCase();

        switch (action) {
            case 'create':
                //createDirectory could be modified to return a boolean to display an error message on failure
                createDirectory(command[1]);
                outputText += line + '\n';
                break;
            case 'move':
                moveDirectory(command[1], command[2])
                outputText += line + '\n';
                break;
            case 'delete':
                let isSuccess = deleteDirectory(command[1]);
                outputText += line + '\n';
                outputText += isSuccess ? '': 'Cannot delete ' + command[1] + ' - ' + root.getMissingDirectory(command[1]) + ' does not exist\n';
                break;
            case 'list':
                outputText += command + '\n';
                outputText += root.toString();
                break;
            default:
                break;
        }
    });

    return outputText;
}

