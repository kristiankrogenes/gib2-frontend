import React from 'react';
import Page from '../components/general/Page';
import { Container, Stack, Typography } from '@mui/material';
import About from '../components/About';

export default function AboutPage() {
  return (
    <Page title="About Us">
      <Container>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        ></Stack>
        <About />
      </Container>
    </Page>
  );
}
