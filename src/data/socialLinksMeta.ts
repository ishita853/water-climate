import type { ComponentType } from 'react'
import { GraduationCap } from 'lucide-react'
import LinkedinIcon from '../components/icons/LinkedinIcon'
import YoutubeIcon from '../components/icons/YoutubeIcon'

interface SocialMeta {
  label: string
  icon: ComponentType<{ className?: string; strokeWidth?: number }>
  color: string
  image?: string
}

export const socialLinksMeta: Record<string, SocialMeta> = {
  googleScholar: { label: 'Google Scholar', icon: GraduationCap, color: '#4285F4' },
  linkedin: { label: 'LinkedIn', icon: LinkedinIcon, color: '#0A66C2' },
  labLinkedin: {
    label: 'Water & Climate Lab',
    icon: LinkedinIcon,
    color: '#0A66C2',
    image: '/assets/images/lab.jpeg',
  },
  youtube: { label: 'YouTube', icon: YoutubeIcon, color: '#FF0000' },
}
