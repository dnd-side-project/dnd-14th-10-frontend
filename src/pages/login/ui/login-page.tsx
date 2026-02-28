import { cn } from '@/lib/utils';
import GojkLogo from '@/shared/ui/icons/GojkLogo.svg?react';
import GoogleLogo from '@/shared/ui/icons/GoogleLogo.svg?react';
import KakaoLogo from '@/shared/ui/icons/KakaoLogo.svg?react';
import NaverLogo from '@/shared/ui/icons/NaverLogo.svg?react';

// 카카오 OAuth 설정
const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = `${window.location.origin}/oauth/kakao/callback`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code`;

interface SocialButtonProps {
  provider: 'kakao' | 'google' | 'naver';
  onClick: () => void;
}

const SOCIAL_CONFIG = {
  kakao: {
    label: '카카오톡으로 시작하기',
    bgColor: 'bg-[#FAE301]',
    textColor: 'text-black',
    Icon: KakaoLogo,
  },
  google: {
    label: 'Google로 시작하기',
    bgColor: 'bg-gray-100',
    textColor: 'text-[#212121]',
    Icon: GoogleLogo,
  },
  naver: {
    label: 'NAVER로 시작하기',
    bgColor: 'bg-[#00CA5B]',
    textColor: 'text-white',
    Icon: NaverLogo,
  },
} as const;

function SocialButton({ provider, onClick }: SocialButtonProps) {
  const config = SOCIAL_CONFIG[provider];
  const { label, bgColor, textColor, Icon } = config;

  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex h-[52px] w-full items-center justify-center gap-4 rounded-lg',
        'text-body1 font-medium',
        bgColor,
        textColor,
      )}
    >
      <Icon className='h-5 w-5' />
      <span>{label}</span>
    </button>
  );
}

export default function LoginPage() {
  const handleSocialLogin = (provider: 'kakao' | 'google' | 'naver') => {
    console.log(`${provider} 로그인 클릭`);

    // 카카오 로그인: 카카오 인증 페이지로 리다이렉트
    if (provider === 'kakao') {
      window.location.href = KAKAO_AUTH_URL;
      return;
    }

    // TODO: 구글, 네이버 로그인 구현
    console.log(`${provider} 로그인은 아직 구현되지 않았습니다.`);
  };

  return (
    <div className='flex min-h-dvh flex-col items-center bg-white px-5'>
      {/* 로고 섹션 */}
      <div className='mt-[183px] flex flex-col items-center'>
        <GojkLogo className='h-[57px] w-[160px]' />
        <h1 className='text-primary-700 mt-5 text-[32px] font-bold'>고작</h1>
        <p className='text-body1 mt-5 text-center font-medium text-[#5a5a5a]'>
          반가워요!
          <br />
          당신의 작업 공간을 찾아보아요.
        </p>
      </div>

      {/* 소셜 로그인 버튼 */}
      <div className='mt-auto mb-[100px] flex w-full flex-col gap-4'>
        <SocialButton provider='kakao' onClick={() => handleSocialLogin('kakao')} />
        {/* <SocialButton provider='google' onClick={() => handleSocialLogin('google')} />
        <SocialButton provider='naver' onClick={() => handleSocialLogin('naver')} /> */}
      </div>
    </div>
  );
}
