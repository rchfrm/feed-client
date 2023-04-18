import Section from '@/landing/Section'
import cookiePolicy from '@/landing/copy/legal/cookies.md'
import MarkdownText from '@/elements/MarkdownText'

export default function CookiePolicyPage() {
  return (
    <Section>
      <h1>Cookie Policy</h1>
      <MarkdownText markdown={cookiePolicy} />
    </Section>
  )
}
