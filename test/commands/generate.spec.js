import inquirer from 'inquirer'
import { execa } from 'execa'
import * as stubs from './stubs'
import getGeneratedMessage from '@utils/getGeneratedMessage'
import generate from '@commands/generate'
import withClient from '@commands/commit/withClient'

jest.mock('@utils/getGeneratedMessage')
jest.mock('@commands/commit/withClient')

describe.only('generate command', () => {
  const originalEnv = process.env

  beforeAll(() => {
    execa.mockReturnValue({ stdout: stubs.diffResult })
    getGeneratedMessage.mockResolvedValue(stubs.generatedMessage)
    withClient.mockResolvedValue(Promise.resolve())
    inquirer.prompt.mockReturnValue(Promise.resolve(stubs.confirmMessageAnswer))
    process.env = {
      ...originalEnv,
      OPENAI_API_KEY: stubs.apiKey
    }
    generate({})
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('should call withClient', () => {
    expect(withClient).toHaveBeenCalledWith({
      title: stubs.generatedMessage.title,
      gitmoji: stubs.generatedMessage.gitmoji,
      message: ''
    })
  })
})
