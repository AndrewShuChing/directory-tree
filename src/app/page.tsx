'use client';

import { Button, Card, Container, Textarea, Grid, rem} from '@mantine/core'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { getOutputText } from '@/app/actions/directories'

export default function Home() {
  const [inputTextAreaValue, setInputTextAreaValue]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [outputTextAreaValue, setOutputTextAreaValue]: [string, Dispatch<SetStateAction<string>>] = useState('');

  const handleButtonClick = async () => {
    const outputText = await getOutputText(inputTextAreaValue);
    setOutputTextAreaValue(outputText);
  }

  return (
    <Container size={800} my={50}>
      <Card shadow='sm' p='lg' radius='md' withBorder>
        <Grid justify="center" align="stretch">
          <Grid.Col span={6} style={{ minHeight: rem(280) }}>
            <Textarea
            id="inputTextArea"
            value={inputTextAreaValue} 
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputTextAreaValue(e.target.value)}
            label="Input"
            placeholder="Input placeholder"
            autosize
            minRows={10}
            maxRows={10}
            />
          </Grid.Col>
          <Grid.Col span={6} style={{ minHeight: rem(280) }}>
            <Textarea
            id="outputTextArea"
            value={outputTextAreaValue} 
            label="Output"
            placeholder="Input placeholder"
            autosize
            minRows={10}
            maxRows={10}
            readOnly
            />  
          </Grid.Col>
          <Grid.Col span={4}>
            <Button id="submitBtn"variant="filled" fullWidth onClick={handleButtonClick}>
              Submit
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  )
}