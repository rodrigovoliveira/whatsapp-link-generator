import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, useTheme, useMediaQuery, MobileStepper, Button } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import MessageIcon from '@mui/icons-material/Message';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { styled } from '@mui/material/styles';

const SwipeableViews = styled(Box)({
  display: 'flex',
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
  '& > div': {
    flexShrink: 0,
    width: '100%',
    transition: 'transform 0.35s ease-in-out',
  },
});

const instructions = [
  {
    icon: <PhoneIphoneIcon />,
    text: 'Digite o número com DDD e DDI (ex: +55 11 99999-0000)'
  },
  {
    icon: <MessageIcon />,
    text: 'Escreva a mensagem automática'
  },
  {
    icon: <LinkIcon />,
    text: 'Clique em "Gerar link gratuitamente"'
  },
  {
    icon: <ContentCopyIcon />,
    text: 'Copie o link ou leia o QR Code'
  },
  {
    icon: <ShareIcon />,
    text: 'Envie o link onde quiser'
  }
];

const InstructionCard: React.FC<{
  icon: React.ReactNode;
  text: string;
  index: number;
  isMobile: boolean;
}> = ({ icon, text, index, isMobile }) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      minHeight: isMobile ? '200px' : 'auto',
      bgcolor: 'background.paper',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4
      },
      mx: isMobile ? 'auto' : 0
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 48,
        borderRadius: '50%',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        mb: 2
      }}
    >
      {icon}
    </Box>
    
    <Typography
      variant="body1"
      align="center"
      sx={{
        position: 'relative',
        pl: 3,
        '&::before': {
          content: `"${index + 1}."`,
          position: 'absolute',
          left: 0,
          color: 'primary.main',
          fontWeight: 'bold'
        }
      }}
    >
      {text}
    </Typography>
  </Paper>
);

const QuickInstructions: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = instructions.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 4
        }}
      >
        Como funciona?
      </Typography>
      
      {isMobile ? (
        <Box sx={{ maxWidth: '100%', flexGrow: 1 }}>
          <SwipeableViews>
            <Box
              sx={{
                display: 'flex',
                transform: `translateX(-${activeStep * 100}%)`,
              }}
            >
              {instructions.map((instruction, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 1,
                    width: '100%',
                    flexShrink: 0,
                  }}
                >
                  <InstructionCard
                    icon={instruction.icon}
                    text={instruction.text}
                    index={index}
                    isMobile={true}
                  />
                </Box>
              ))}
            </Box>
          </SwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              maxWidth: 400,
              flexGrow: 1,
              margin: '0 auto',
              bgcolor: 'transparent'
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </Button>
            }
          />
        </Box>
      ) : (
        <Grid 
          container 
          spacing={3}
          sx={{ 
            width: '100%',
            margin: '0 auto'
          }}
        >
          {instructions.map((instruction, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={2.4} 
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'stretch'
              }}
            >
              <InstructionCard
                icon={instruction.icon}
                text={instruction.text}
                index={index}
                isMobile={false}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default QuickInstructions; 