import { useState, useEffect } from 'react';
import { UnstyledButton, Checkbox, Text } from '@mantine/core';
import classes from './Term.module.css';

export default function Term({title, description, valueRef}) {
  const [value, onChange] = useState(false);

  useEffect(() => {
    valueRef.current = value;
  }, [value])
  return (
    <UnstyledButton onClick={() => onChange(!value)} className={classes.button}>
      <Checkbox
        checked={value}
        onChange={() => {}}
        tabIndex={-1}
        size="md"
        mr="xl"
        styles={{ input: { cursor: 'pointer' } }}
        aria-hidden
      />

      <div>
        <Text fw={500} mb={7} lh={1}>
          {title}
        </Text>
        <Text fz="sm" c="dimmed">
          {description}
        </Text>
      </div>
    </UnstyledButton>
  );
}