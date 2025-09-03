"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Check, X, Stethoscope, Shield, BookOpen, Users } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false
  });

  const validatePassword = (password: string) => {
    setPasswordStrength({
      hasLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === "password") {
      validatePassword(value);
    }
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);
    
    return (
      formData.name.trim().length >= 2 &&
      emailRegex.test(formData.email) &&
      isPasswordStrong &&
      formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      });

      if (error?.code) {
        const errorMap: Record<string, string> = {
          USER_ALREADY_EXISTS: "An account with this email already exists. Please login instead."
        };
        toast.error(errorMap[error.code] || "Registration failed. Please try again.");
        return;
      }

      toast.success("Account created successfully! Please check your email to verify your account.");
      router.push("/login?registered=true");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-sm transition-colors ${met ? 'text-green-600' : 'text-gray-400'}`}>
      {met ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 text-white px-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Zenethe</h1>
                <p className="text-blue-200 text-lg">AI Companion for Doctors</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Join thousands of healthcare professionals</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Experience evidence-based medical assistance powered by ICMR and WHO publications. 
              Make informed clinical decisions with AI that understands healthcare.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-white font-medium">HIPAA Compliant</h3>
                  <p className="text-blue-200 text-sm">Your patient data is always secure</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Evidence-Based</h3>
                  <p className="text-blue-200 text-sm">Powered by ICMR & WHO guidelines</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-200" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Trusted by Doctors</h3>
                  <p className="text-blue-200 text-sm">Used by medical professionals worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Registration Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center pb-8">
              <div className="lg:hidden flex items-center justify-center gap-3 mb-4">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Zenethe</h1>
                  <p className="text-blue-600 text-sm">AI Companion for Doctors</p>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
              <CardDescription className="text-gray-600">
                Join the future of evidence-based medical practice
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Dr. John Smith"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="doctor@hospital.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      autoComplete="off"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  
                  {formData.password && (
                    <div className="mt-3 space-y-2">
                      <PasswordRequirement met={passwordStrength.hasLength} text="At least 8 characters" />
                      <PasswordRequirement met={passwordStrength.hasUpper} text="One uppercase letter" />
                      <PasswordRequirement met={passwordStrength.hasLower} text="One lowercase letter" />
                      <PasswordRequirement met={passwordStrength.hasNumber} text="One number" />
                      <PasswordRequirement met={passwordStrength.hasSpecial} text="One special character" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      autoComplete="off"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <X className="h-4 w-4" />
                      Passwords do not match
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                  Privacy Policy
                </Link>
                {" "}for healthcare professionals.
              </div>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link 
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 font-medium underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}