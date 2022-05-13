import emojisLocal from "../../src/utils/emojisLocal";
import execa from "execa";
import * as stubs from "./stubs";
import pathExists from 'path-exists'
import fs from "fs";

jest.mock('path-exists');

describe('emojisLocal', () => {
    beforeAll(() => {
        execa.mockReturnValue({stdout: stubs.localProjectPath});
    })
    describe('isAvailable', () => {
        it('should return true when local file is present', async () => {
            pathExists.sync.mockReturnValue(true);

            expect(await emojisLocal.isAvailable()).toBe(true);
        });
        it('should return false when local file is not present', async () => {
            pathExists.sync.mockReturnValue(false);

            expect(await emojisLocal.isAvailable()).toBe(false);
        });
    });

    describe('getLocalPath', () => {
        it('should return project path with .gitmoji directory and gitmojis.json file', async () => {
            expect(await emojisLocal.getLocalPath()).toBe('project/.gitmoji/gitmojis.json');
        })
    });

    describe('getEmojis', () => {
        beforeAll(() => {
            fs.readFileSync.mockReturnValue(JSON.stringify(stubs.gitmojis))
        })

        it('should read and return emojis from the local file', async () => {
            const emojis = await emojisLocal.getEmojisLocal();

            expect(fs.readFileSync).toHaveBeenCalledWith('project/.gitmoji/gitmojis.json')
            expect(emojis).toEqual(stubs.gitmojis)
        })

        it('should return empty array when local file can not be parsed', async () => {
            fs.readFileSync.mockImplementation(() => {
                throw new Error("SOME_ERROR");
            });
            const emojis = await emojisLocal.getEmojisLocal();
            expect(fs.readFileSync).toHaveBeenCalledWith('project/.gitmoji/gitmojis.json')
            expect(emojis).toEqual([])
        });
    });
});
