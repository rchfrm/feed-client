import Section from '@/landing/Section'
import terms from '@/landing/copy/legal/terms.md'
import MarkdownText from '@/elements/MarkdownText'

export default function TermsPage() {
  return (
    <Section>
      <h1>Terms of Service</h1>
      <MarkdownText markdown={terms} />
    </Section>
  )
}
