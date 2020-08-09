// @flow
import configurationVault from './configurationVault'

const getContacts = (): string[] => {
  const contactsText = configurationVault.getContacts().trim()
  let contacts = []
  if (contactsText.length > 0) {
    contacts = contactsText.split('\n')
  }
  return contacts
}

export default getContacts
