import execa from "execa";
import * as stubs from "./stubs";
import getAbsoluteProjectPath from "../../src/utils/getAbsoluteProjectPath";

describe('getAbsoluteProjectPath', function () {
    beforeAll(() => {
        execa.mockReturnValue({ stdout: stubs.localProjectPath })
    })
    it('should return current project path', async () => {
        expect(await getAbsoluteProjectPath()).toBe(stubs.localProjectPath);
    });
});
