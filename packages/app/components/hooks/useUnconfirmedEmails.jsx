const useUnconfirmedEmails = (user) => {
  const {
    email: authEmail,
    pending_email: pendingEmail,
    contact_email: contactEmail,
    pending_contact_email: pendingContactEmail,
    email_verified: emailVerified,
    contact_email_verified: contactEmailVerified,
  } = user

  const emailToVerify = pendingEmail || (!emailVerified && authEmail) || ''
  const contactEmailToVerify = pendingContactEmail || (!contactEmailVerified && contactEmail) || ''
  const uncomfirmedEmails = [
    { type: 'email', email: emailToVerify },
    { type: 'contactEmail', email: contactEmailToVerify },
  ].filter(({ email }) => email)

  return uncomfirmedEmails
}

export default useUnconfirmedEmails
