import React, { useMemo } from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

interface ButtonProps {
  title: string,
  subtitle: string,
  onPress: () => void
}

export const Button = ({
  title,
  subtitle,
  onPress
}: ButtonProps) => {

  const { colors } = useTheme();

  const containerStyle = useMemo(() => [styles.container, {
    backgroundColor: colors.border,
  }], [])

  return (
    <TouchableOpacity  onPress={onPress} style={containerStyle}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 6
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    textTransform: 'uppercase',
    opacity: 0.75
  }
})