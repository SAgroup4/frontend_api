'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import {
  LoginContainer,
  LoginBox,
  BackgroundCircles,
  BackgroundAnimation,
  FormContainer
} from './loginStyles';

const VerifySuccess = () => {
  const router = useRouter();

  return (
    <BackgroundAnimation>
      <LoginContainer>
        <LoginBox>
          <BackgroundCircles className="bg">
            <span></span>
            <span></span>
            <span></span>
          </BackgroundCircles>

          <FormContainer>
            <Typography
              variant="h4"
              sx={{ fontSize: '24px', fontWeight: 'bold', mb: 3, textAlign: 'center' }}
            >
              驗證信已寄出
            </Typography>

            <Typography
              sx={{ mb: 3, textAlign: 'center', color: 'rgba(0, 0, 0, 0.7)' }}
            >
              我們已將驗證信寄到您提供的學校信箱，請點擊信中的連結完成驗證。
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push('/login')}
              >
                返回登入頁面
              </Button>
            </Box>
          </FormContainer>
        </LoginBox>
      </LoginContainer>
    </BackgroundAnimation>
  );
};

export default VerifySuccess;
