import Section from '@/landing/Section'
import privacyPolicy from '@/landing/copy/legal/privacy.md'
import MarkdownText from '@/elements/MarkdownText'

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <h1>Privacy Policy</h1>
      <MarkdownText markdown={privacyPolicy} />
    </Section>
  )
}
