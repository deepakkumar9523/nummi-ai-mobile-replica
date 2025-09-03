"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  LogOut, 
  MessageCircle, 
  BookOpen, 
  Users, 
  Activity,
  Stethoscope,
  Brain,
  FileText,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const { error } = await authClient.signOut();
      if (error?.code) {
        toast.error(error.code);
      } else {
        localStorage.removeItem("bearer_token");
        refetch();
        toast.success("Successfully signed out");
        router.push("/");
      }
    } catch (error) {
      toast.error("Failed to sign out");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const stats = [
    {
      title: "ICMR Publications",
      value: "2,500+",
      description: "Evidence-based medical guidelines",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "WHO References",
      value: "1,800+",
      description: "Global health recommendations",
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Medical Consultations",
      value: "50,000+",
      description: "AI-assisted diagnoses",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Healthcare Professionals",
      value: "12,000+",
      description: "Trusted by doctors nationwide",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Zenethe</h1>
                <p className="text-sm text-gray-600">AI Medical Companion</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Dr. {session.user.name}</p>
                <p className="text-xs text-gray-600">{session.user.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-2">
                    Welcome back, Dr. {session.user.name?.split(' ')[0]}!
                  </h2>
                  <p className="text-blue-100 text-lg mb-6">
                    Your AI-powered medical companion is ready to assist with evidence-based clinical decisions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      <Brain className="h-3 w-3 mr-1" />
                      AI-Powered
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Evidence-Based
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      <Activity className="h-3 w-3 mr-1" />
                      Clinical Support
                    </Badge>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-16 w-16 text-white" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Start Medical Consultation</h4>
                    <p className="text-sm text-gray-600">Begin an AI-assisted clinical discussion</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Start Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">Medical Resources</h4>
                    <p className="text-sm text-gray-600">Access ICMR & WHO publications</p>
                  </div>
                  <Button variant="outline">
                    Browse
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Zenethe Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <IconComponent className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <TrendingUp className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm font-medium text-gray-900">{stat.title}</p>
                      <p className="text-xs text-gray-600">{stat.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Medical Focus Areas */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Clinical Expertise Areas</h3>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Cardiology",
                  "Neurology", 
                  "Pediatrics",
                  "Oncology",
                  "Infectious Diseases",
                  "Emergency Medicine",
                  "Internal Medicine",
                  "Dermatology"
                ].map((specialty, index) => (
                  <div key={index} className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <p className="text-sm font-medium text-gray-900">{specialty}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evidence-Based Medicine Highlight */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Evidence-Based Medical Intelligence
              </h3>
              <p className="text-gray-600 mb-6">
                Zenethe integrates the latest ICMR guidelines and WHO recommendations to provide 
                you with evidence-based clinical support, ensuring your medical decisions are backed 
                by the most current and reliable medical literature.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge variant="outline" className="border-green-300 text-green-700">
                  ICMR Integrated
                </Badge>
                <Badge variant="outline" className="border-blue-300 text-blue-700">
                  WHO Compliant
                </Badge>
                <Badge variant="outline" className="border-purple-300 text-purple-700">
                  Peer Reviewed
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}