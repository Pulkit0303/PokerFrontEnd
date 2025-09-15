import { useMemo } from 'react';
import { useSignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  const { signUp } = useSignUp();

  const handleSocialSignUp = async (strategy) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/dashboard',
        redirectUrlComplete: '/dashboard'
      });
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  // Memoize the card pattern to prevent re-renders
  const cardPattern = useMemo(() => 
    Array.from({ length: 24 }).map((_, i) => (
      <div key={i} className="flex items-center justify-center text-[#070707] text-lg opacity-40">
        {i % 4 === 0 && '♠'}
        {i % 4 === 1 && '♥'}
        {i % 4 === 2 && '♦'}
        {i % 4 === 3 && '♣'}
      </div>
    )), []
  );

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-4">
      <div className="w-full max-w-72 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Part */}
        <div className="bg-[#414141] py-24 px-5 relative">
          {/* Card Shapes Pattern */}
          <div className="absolute inset-2 overflow-hidden">
            <div className="grid grid-cols-6 grid-rows-4 gap-3 p-3 h-full">
              {cardPattern}
            </div>
          </div>
  
        </div>
        
        {/* Bottom Part */}
        <div className="bg-[#070707] py-16 px-4">
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#414141] text-center" style={{fontFamily: 'SF Pro Rounded, ui-rounded, system-ui, sans-serif'}}>PokerLedger</h1>
            <p className="text-[#B0B0B0] text-sm text-center" style={{fontFamily: 'SF Pro Rounded, ui-rounded, system-ui, sans-serif'}}>Let The Tracking Begin!</p>
            
            {/* Social Login Buttons */}
            <div className="flex flex-col space-y-3 items-center">
              {/* Apple */}
              <button 
                onClick={() => handleSocialSignUp('oauth_apple')}
                className="flex items-center justify-center py-3 px-6 bg-[#414141] hover:bg-gray-500 rounded-xl transition-colors duration-150 w-3/4"
              >
                <img src="/apple.svg" alt="Apple" className="w-6 h-6 text-white" />
              </button>

              {/* Google */}
              <button 
                onClick={() => handleSocialSignUp('oauth_google')}
                className="flex items-center justify-center py-3 px-6 bg-[#414141] hover:bg-gray-500 rounded-xl transition-colors duration-150 w-3/4"
              >
                <img src="/google.svg" alt="Google" className="w-6 h-6" />
              </button>

              {/* X/Twitter */}
              <button 
                onClick={() => handleSocialSignUp('oauth_x')}
                className="flex items-center justify-center py-3 px-6 bg-[#414141] hover:bg-gray-500 rounded-xl transition-colors duration-150 w-3/4"
              >
                <img src="/x.svg" alt="X" className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Sign in link */}
            <div className="text-center">
              <p className="text-gray-300 text-sm" style={{fontFamily: 'SF Pro Rounded, ui-rounded, system-ui, sans-serif'}}>
                Already Tracking?{' '}
                <a href="/sign-in" className="text-[#414141] hover:text-blue-300 font-bold" style={{fontFamily: 'SF Pro Rounded, ui-rounded, system-ui, sans-serif'}}>
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignUpPage;
