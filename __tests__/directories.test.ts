import { getOutputText } from '../src/app/actions/directories'
import TreeNode from '../src/app/utils/TreeNode';

const root = new TreeNode('Root');

const resetRoot = () => {
    root.clear();
};

describe('getOutputText', () => {
    beforeEach(() => {
        resetRoot();
    });

    it('should create directories and child directories', async () => {
        const inputText = `
            CREATE fruits
            LIST
            CREATE grains
            CREATE fruits/strawberries
            LIST
        `;

        const expectedOutputText = 
            'CREATE fruits\n' +
            'LIST\n' +
            'fruits\n' +
            'CREATE grains\n' +
            'CREATE fruits/strawberries\n' +
            'LIST\n' +
            'fruits\n' +
            '  strawberries\n' +
            'grains\n'
        ;

        const outputText = await getOutputText(inputText);
        expect(outputText).toMatch(expectedOutputText);
    });

    it('should move directory and children to new parent directory', async () => {
        const inputText = `
            CREATE food
            CREATE fruits
            CREATE grains
            CREATE fruits/strawberries
            LIST
            MOVE fruits food
            MOVE grains food
            LIST
        `;

        const expectedOutputText = 
            'CREATE food\n' +
            'CREATE fruits\n' +
            'CREATE grains\n' +
            'CREATE fruits/strawberries\n' +
            'LIST\n' +
            'food\n' +
            'fruits\n' +
            '  strawberries\n' +
            'grains\n' +
            'MOVE fruits food\n' +
            'MOVE grains food\n' +
            'LIST\n' +
            'food\n' +
            '  fruits\n' +
            '    strawberries\n' +
            '  grains\n'
        ;

        const outputText = await getOutputText(inputText);
        expect(outputText).toMatch(expectedOutputText);
    });

    it('should delete directories and children', async () => {
        const inputText = `
            CREATE fruits
            CREATE grains
            CREATE fruits/strawberries
            LIST
            DELETE fruits
            LIST
        `;

        const expectedOutputText = 
            'CREATE fruits\n' +
            'CREATE grains\n' +
            'CREATE fruits/strawberries\n' +
            'LIST\n' +
            'fruits\n' +
            '  strawberries\n' +
            'grains\n' +
            'DELETE fruits\n' +
            'LIST\n' +
            'grains\n'
        ;

        const outputText = await getOutputText(inputText);
        expect(outputText).toMatch(expectedOutputText);
    });

    it('should display warning if cannot delete directory', async () => {
        const inputText = `
            CREATE grains
            LIST
            DELETE fruits
            LIST
        `;

        const expectedOutputText = 
            'CREATE grains\n' +
            'LIST\n' +
            'grains\n' +
            'DELETE fruits\n' +
            'Cannot delete fruits - fruits does not exist\n' +
            'LIST\n' +
            'grains\n'
        ;

        const outputText = await getOutputText(inputText);
        expect(outputText).toMatch(expectedOutputText);
    });

    it('should handle unrecognized commands gracefully', async () => {
        const inputText = `
            unrecognized command
            unrecognized command 2
            LIST
        `;

        const expectedOutputText = 
            'unrecognized command\n' +
            'unrecognized command 2\n' +
            'LIST\n'
        ;

        const outputText = await getOutputText(inputText);
        expect(outputText).toContain(expectedOutputText);
    });
});