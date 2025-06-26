import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBack: () => void;
  onSuccess?: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onBack, 
  onSuccess 
}) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@')) return;

    try {
      setIsLoading(true);
      const { error } = await resetPassword(email);
      
      if (!error) {
        setEmailSent(true);
        
        // Auto redirect after 5 seconds
        setTimeout(() => {
          onSuccess?.();
        }, 5000);
      }
    } catch (error) {
      console.error('Error in forgot password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmailValid = email.includes('@') && email.length > 5;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Fond géométrique subtil */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="forgotGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#f3f4f6', stopOpacity:0.4}} />
              <stop offset="100%" style={{stopColor:'#e5e7eb', stopOpacity:0.2}} />
            </linearGradient>
          </defs>
          
          <circle cx="300" cy="200" r="20" fill="url(#forgotGrad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; 30,35; 0,0" dur="7s" repeatCount="indefinite" />
          </circle>
          <circle cx="800" cy="300" r="25" fill="url(#forgotGrad1)">
            <animateTransform attributeName="transform" type="translate" values="0,0; -25,30; 0,0" dur="8s" repeatCount="indefinite" />
          </circle>
          <rect x="150" y="400" width="30" height="30" fill="url(#forgotGrad1)" rx="4">
            <animateTransform attributeName="transform" type="rotate" values="0 165 415; 25 165 415; 0 165 415" dur="9s" repeatCount="indefinite" />
          </rect>
          <rect x="900" y="150" width="35" height="35" fill="url(#forgotGrad1)" rx="5">
            <animateTransform attributeName="transform" type="rotate" values="0 917 167; -20 917 167; 0 917 167" dur="10s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto w-full">
          
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Reset Password</h1>
                <p className="text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Form Card */}
              <div className="group relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white border-2 border-indigo-200 rounded-3xl p-8 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg">
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Icon */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-xl mb-4">
                        <Mail className="h-8 w-8 text-indigo-600" />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <Label htmlFor="reset-email" className="text-lg font-medium text-gray-900 block mb-2">
                        Email Address
                      </Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 text-lg border-2 border-gray-200 focus:border-indigo-500 rounded-xl"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={!isEmailValid || isLoading}
                      className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                        isEmailValid && !isLoading
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-indigo-500/25' 
                          : 'bg-gray-300 cursor-not-allowed text-gray-500'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending Reset Link...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Back Button */}
              <Button
                variant="outline"
                onClick={onBack}
                className="w-full border-2 border-gray-300 hover:border-gray-500 text-gray-700"
                disabled={isLoading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </>
          ) : (
            // Success State
            <div className="text-center">
              <div className="group relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <div className="relative bg-white border-2 border-green-200 rounded-3xl p-8 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
                  
                  {/* Success Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  
                  {/* Success Message */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We've sent a password reset link to{' '}
                    <span className="font-semibold text-gray-900">{email}</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Click the link in the email to reset your password. If you don't see it, check your spam folder.
                  </p>
                  
                  {/* Auto redirect message */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-sm text-blue-700">
                      Redirecting you back to sign in page in a few seconds...
                    </p>
                  </div>
                </div>
              </div>

              {/* Manual Back Button */}
              <Button
                variant="outline"
                onClick={onBack}
                className="border-2 border-gray-300 hover:border-gray-500 text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;