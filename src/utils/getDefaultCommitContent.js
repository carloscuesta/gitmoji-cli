// @flow
import fs from 'fs'

const getDefaultCommitContent = () => {
  try {
    const commitFilePath: string = process.argv[3]
    const commitFileContent: Array<string> = fs
      .readFileSync(commitFilePath)
      .toString()
      .split('\n')
    return {
      title: commitFileContent.length ? commitFileContent[0] : '',
      message: commitFileContent.length >= 3 ? commitFileContent[2] : ''
    }
  } catch (e) {
    return {
      title: '',
      message: ''
    }
  }
}

export default getDefaultCommitContent
