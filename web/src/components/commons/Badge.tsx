import { Badge as UIBadge, BadgeProps } from '@mantine/core'

type Props = BadgeProps & {}

export default function Badge({ children, ...Props}: Props) {
  return (
    <UIBadge {...Props}>{children}</UIBadge>
  )
}