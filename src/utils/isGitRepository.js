// @flow
import { execa } from 'execa'

const isGitRepository = async (): Promise<boolean> => {
    try {
        await execa('git', ['rev-parse', '--is-inside-work-tree'])
        return true
    } catch (_) {
        return false
    }
}

export default isGitRepository
