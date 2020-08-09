import * as stubs from './stubs'
import configurationVault from '../../src/utils/configurationVault'
import getContacts from '../../src/utils/getContacts'

jest.mock('../../src/utils/configurationVault')

describe('getContacts', () => {
  it('should get from configuration vault', () => {
    configurationVault.getContacts.mockReturnValue(stubs.configContacts)

    expect(getContacts()).toStrictEqual(stubs.parsedContacts)
  })

  it('should return empty array if config is empty', () => {
    configurationVault.getContacts.mockReturnValue('')

    expect(getContacts()).toStrictEqual([])
  })
})
