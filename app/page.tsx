"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FloatingParticles } from "@/components/floating-particles";
import {
  Menu,
  X,
  MessageSquare,
  User,
  Award,
  Settings,
  Monitor,
  Globe,
  Star,
  Rocket,
  Shield,
  Target,
  Zap,
  Code,
  Cloud,
  Mail,
  Phone,
  MapPin,
  Send,
  ChevronDown,
  Clock,
  Heart,
  BookOpen,
  MessageCircle,
} from "lucide-react";

import { useRegistration } from "@/hooks/use-registration";
import { useContact } from "@/hooks/use-contact";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { AdminAccess } from "@/components/admin-access";

export default function CloudsDewLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardsVisible, setCardsVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(
    "mentorship"
  );
  const cardsRef = useRef<HTMLDivElement>(null);

  const { submitRegistration, isLoading: isRegistrationLoading } =
    useRegistration();
  const { submitContact, isLoading: isContactLoading } = useContact();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentRole: "",
    experienceLevel: "" as "beginner" | "intermediate" | "advanced",
    areasOfInterest: "",
    schedulePreference: "" as "weekdays" | "evenings" | "weekends" | "flexible",
    goalsExpectations: "",
    termsAccepted: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    const result = await submitRegistration({
      ...formData,
      programType: selectedProgram as "mentorship" | "bootcamp",
      experienceLevel: formData.experienceLevel || "beginner",
    });

    if (result.success) {
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        currentRole: "",
        experienceLevel: "" as "beginner" | "intermediate" | "advanced",
        areasOfInterest: "",
        schedulePreference: "" as
          | "weekdays"
          | "evenings"
          | "weekends"
          | "flexible",
        goalsExpectations: "",
        termsAccepted: false,
      });
      setSelectedProgram(null);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCardsVisible(true);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) {
        observer.unobserve(cardsRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleProgramSelect = (program: string) => {
    setSelectedProgram(program);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-emerald-950 relative overflow-hidden">
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-emerald-900/20"></div>

      {/* Floating Particles */}
      <FloatingParticles />

      <div className="relative z-10 text-white">
        {/* Section 1: Hero */}
        <section id="home" className="relative min-h-screen">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
              style={{
                transform: `translate(${mousePosition.x * 0.02}px, ${
                  mousePosition.y * 0.02
                }px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-green-500/20 to-teal-500/20 blur-3xl"
              style={{
                transform: `translate(${mousePosition.x * -0.01}px, ${
                  mousePosition.y * -0.01
                }px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          </div>

          {/* Flowing Lines Background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
              <path
                d="M0,400 Q300,200 600,400 T1200,400"
                stroke="url(#gradient1)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M0,500 Q400,300 800,500 T1200,500"
                stroke="url(#gradient2)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Header */}
          <header className="relative top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 lg:px-12">
            <div className="flex items-center space-x-3">
              <AdminAccess>
                <Image
                  src="/cloudsdew-header-logo.png"
                  alt="CloudsDew Tech"
                  width={800}
                  height={80}
                  className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto"
                />
              </AdminAccess>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </nav>
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Get Started
              </Button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </header>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-lg z-40 p-6">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-semibold w-fit"
                >
                  Get Started
                </Button>
              </nav>
            </div>
          )}

          {/* Hero Content */}
          <main className="relative z-10 px-6 lg:px-12 pt-12 lg:pt-24 flex items-center min-h-[80vh]">
            <div className="max-w-7xl mx-auto w-full text-center">
              {/* Premium Badge */}
              <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-green-500/30 rounded-full px-6 py-3 mb-8">
                <Star className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">
                  Premium Cloud Technology Training
                </span>
                <Star className="w-5 h-5 text-green-400" />
              </div>

              <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl lg:text-7xl font-bold leading-tight mb-8">
                  Advance Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                    Cloud Career
                  </span>{" "}
                  with Confidence
                </h1>

                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
                  Gain in-demand skills through expert-led training designed to
                  elevate your impact and drive technological innovation.
                </p>

                {/* Technology Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-6 py-3">
                    <Cloud className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">
                      MultiCloud Mastery
                    </span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-6 py-3">
                    <Code className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-medium">
                      DevOps Excellence
                    </span>
                  </div>
                  <div className="inline-flex items-center space-x-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-6 py-3">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 font-medium">
                      AI Innovation
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center items-center mb-16">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("contact")}
                    className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black font-semibold px-12 py-5 text-lg rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Start Your Journey
                  </Button>
                </div>

                {/* Technology Logo Icons - Animated Scrolling */}
                <div className="relative overflow-hidden w-full">
                  <div className="flex items-center space-x-12 animate-scroll">
                    {/* Jira */}
                    <div className="w-13 h-13 opacity-70 hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        className="w-full h-full object-contain"
                      >
                        <path fill="#e53935" d="M24 43L16 20 32 20z"></path>
                        <path fill="#ff7043" d="M24 43L42 20 32 20z"></path>
                        <path fill="#e53935" d="M37 5L42 20 32 20z"></path>
                        <path fill="#ffa726" d="M24 43L42 20 45 28z"></path>
                        <path fill="#ff7043" d="M24 43L6 20 16 20z"></path>
                        <path fill="#e53935" d="M11 5L6 20 16 20z"></path>
                        <path fill="#ffa726" d="M24 43L6 20 3 28z"></path>
                      </svg>
                    </div>

                    {/* Kubernetes */}
                    <Image
                      src="/logos/kubernetes.png"
                      alt="Kubernetes"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Terraform */}
                    <Image
                      src="/logos/terraform.png"
                      alt="Terraform"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Azure */}

                    {/* Trello */}
                    <Image
                      src="/logos/trello.png"
                      alt="Trello"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Katalon */}
                    <Image
                      src="/logos/google-cloud.png"
                      alt="Google"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Raygun */}
                    <Image
                      src="/logos/aws.png"
                      alt="aws"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Jenkins */}
                    <Image
                      src="/logos/jenkins.png"
                      alt="Jenkins"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Git */}
                    <Image
                      src="/logos/git.png"
                      alt="Git"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Ranorex */}
                    <Image
                      src="/logos/github.png"
                      alt="Githud"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    {/* Duplicate set for seamless loop */}

                    <Image
                      src="/logos/jira.png"
                      alt="Jira"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <Image
                      src="/logos/bitbucket.png"
                      alt="bitbucket"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/kubernetes.png"
                      alt="Kubernetes"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/ansible.png"
                      alt="ansible"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/azure.png"
                      alt="Azure"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <Image
                      src="/logos/gitlab.png"
                      alt="Gitlab"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <Image
                      src="/logos/docker.png"
                      alt="docker"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/trello.png"
                      alt="Trello"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/google-cloud.png"
                      alt="Google"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/aws.png"
                      alt="aws"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/jenkins.png"
                      alt="Jenkins"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/git.png"
                      alt="Git"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />

                    <Image
                      src="/logos/github.png"
                      alt="Github"
                      width={52}
                      height={52}
                      className="w-13 h-13 object-contain opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                <style jsx>{`
                  @keyframes scroll {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }

                  @keyframes scroll-companies {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }

                  @keyframes slideInUp {
                    0% {
                      opacity: 0;
                      transform: translateY(60px);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }

                  .animate-scroll {
                    animation: scroll 30s linear infinite;
                  }

                  .animate-scroll-companies {
                    animation: scroll-companies 30s linear infinite;
                  }

                  .card-animate {
                    opacity: 0;
                    transform: translateY(60px);
                    transition: all 0.6s ease-out;
                  }

                  .card-animate.visible {
                    opacity: 1;
                    transform: translateY(0);
                  }

                  .card-animate:nth-child(1) {
                    transition-delay: 0.1s;
                  }

                  .card-animate:nth-child(2) {
                    transition-delay: 0.2s;
                  }

                  .card-animate:nth-child(3) {
                    transition-delay: 0.3s;
                  }

                  .card-animate:nth-child(4) {
                    transition-delay: 0.4s;
                  }

                  .card-animate:nth-child(5) {
                    transition-delay: 0.5s;
                  }

                  .card-animate:nth-child(6) {
                    transition-delay: 0.6s;
                  }
                `}</style>
              </div>
            </div>
          </main>
        </section>

        {/* Section 2: Why Choose CloudsDew */}
        <section id="about" className="relative py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto text-center">
            {/* Excellence Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-green-500/30 rounded-full px-6 py-3 mb-8">
              <Star className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">
                World-Class Excellence
              </span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold mb-8">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                CloudsDew
              </span>
              ?
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-16 max-w-4xl mx-auto">
              We're not just another training company. We're fresh innovators
              passionate about transformation, committed to bridging the gap
              between where you are and where you want to be.
            </p>

            {/* Statistics Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-gray-700 hover:border-green-500/50 transition-all duration-300 bg-transparent">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
                    100+
                  </h3>
                  <p className="text-gray-300 font-medium">Hours of Content</p>
                </CardContent>
              </Card>

              <Card className="border-gray-700 hover:border-blue-500/50 transition-all duration-300 bg-transparent">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
                    24/7
                  </h3>
                  <p className="text-gray-300 font-medium">Passion Projects</p>
                </CardContent>
              </Card>

              <Card className="border-gray-700 hover:border-purple-500/50 transition-all duration-300 bg-transparent">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
                    12+
                  </h3>
                  <p className="text-gray-300 font-medium">Learning Paths</p>
                </CardContent>
              </Card>

              <Card className="border-gray-700 hover:border-pink-500/50 transition-all duration-300 bg-transparent">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-8 h-8 text-pink-400" />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2 text-white">
                    &lt;2h
                  </h3>
                  <p className="text-gray-300 font-medium">Response Time</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 3: Mission & Expertise */}
        <section className="relative py-24 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Side - Our Mission */}
              <div className="space-y-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-400" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    Our Mission
                  </h2>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    CloudsDew is an innovative tech company committed to
                    training IT and non-IT professionals on how to leverage
                    MultiCloud (AWS, Azure, GCP, OCI), DevOps, and AI
                    technologies to grow their personal brand, career, and drive
                    innovative solutions to business.
                  </p>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    We specialize in bridging the development and operations gap
                    through hands-on training covering the complete DevOps
                    lifecycle. From continuous integration and deployment to
                    infrastructure automation and monitoring.
                  </p>
                </div>

                {/* What Makes Us Unique Box */}
                <div className="bg-gray-900/50 border border-green-500/20 rounded-2xl p-6 mt-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400">
                      What Makes Us Unique
                    </h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    We are unique in our fresh perspective, innovative
                    curriculum, and personalized approach. Our training helps
                    professionals create seamless software delivery pipelines
                    that drive business agility and innovation.
                  </p>
                </div>
              </div>

              {/* Right Side - Our Expertise */}
              <div className="space-y-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-green-400" />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white">
                    Our Expertise
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-white">
                      MultiCloud Architecture & Migration
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-green-500/30 transition-colors">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-white">
                      Complete DevOps Lifecycle
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-blue-500/30 transition-colors">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-white">
                      AI Technology Integration
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition-colors">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-white">
                      Infrastructure as Code (IaC)
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-pink-500/30 transition-colors">
                    <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium text-white">
                      CI/CD Pipeline Optimization
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Our Excellence */}
        <section
          id="services"
          className="relative py-24 px-6 lg:px-12"
          ref={cardsRef}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* Premium Services Badge */}
              <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-green-500/30 rounded-full px-6 py-3 mb-8">
                <Star className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium">
                  Premium Services
                </span>
              </div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  Excellence
                </span>
              </h2>
              <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
                Comprehensive solutions to transform your career and drive
                business innovation through cutting-edge technology and
                world-class expert guidance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                className={`border-gray-700 hover:border-green-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
                      <User className="w-8 h-8 text-green-400" />
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                      Premium
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    1-to-1 Mentorship
                  </h3>
                  <p className="text-gray-300">
                    Personalized guidance from industry experts to accelerate
                    your career growth with premium support.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-blue-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                      <Award className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full font-medium">
                      Intensive
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Elite Bootcamps
                  </h3>
                  <p className="text-gray-300">
                    Intensive training programs designed to fast-track your
                    skills in weeks with hands-on projects.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-purple-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center">
                      <Cloud className="w-8 h-8 text-purple-400" />
                    </div>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full font-medium">
                      MultiCloud
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Cloud Migration
                  </h3>
                  <p className="text-gray-300">
                    Seamlessly transition your infrastructure to AWS, Azure, GCP
                    or OCI with zero downtime.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-pink-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center">
                      <Settings className="w-8 h-8 text-pink-400" />
                    </div>
                    <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full font-medium">
                      AI-Powered
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Automation Excellence
                  </h3>
                  <p className="text-gray-300">
                    Streamline your operations with intelligent automation
                    solutions and cutting-edge tools.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-red-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
                      <Shield className="w-8 h-8 text-red-400" />
                    </div>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full font-medium">
                      Enterprise
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Security & DevSecOps
                  </h3>
                  <p className="text-gray-300">
                    Implement robust security practices and DevSecOps
                    integration for enterprise-grade protection.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-orange-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-orange-400" />
                    </div>
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full font-medium">
                      Scalable
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Deployment Strategies
                  </h3>
                  <p className="text-gray-300">
                    Expert deployment strategies for scalable and reliable
                    applications with monitoring.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-yellow-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center">
                      <Code className="w-8 h-8 text-yellow-400" />
                    </div>
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-medium">
                      Modern
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Infrastructure as Code
                  </h3>
                  <p className="text-gray-300">
                    Build and manage infrastructure programmatically with best
                    practices and version control.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-teal-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center">
                      <Monitor className="w-8 h-8 text-teal-400" />
                    </div>
                    <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full font-medium">
                      Consistent
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Configuration Management
                  </h3>
                  <p className="text-gray-300">
                    Maintain consistent environments across your entire
                    infrastructure with automation.
                  </p>
                </CardContent>
              </Card>

              <Card
                className={`border-gray-700 hover:border-green-500/50 transition-all duration-300 bg-transparent card-animate ${
                  cardsVisible ? "visible" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
                      <Target className="w-8 h-8 text-green-400" />
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-medium">
                      Optimized
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    CI/CD Pipeline Design
                  </h3>
                  <p className="text-gray-300">
                    Design and optimize continuous integration and deployment
                    pipelines for maximum efficiency.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section 5: Ready for Transformation */}
        <section className="relative py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-900/50 border border-green-500/20 rounded-3xl p-12 lg:p-16">
              <div className="flex items-center justify-center space-x-2 mb-8">
                <Star className="w-6 h-6 text-green-400" />
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Ready for Transformation?
                </h2>
                <Star className="w-6 h-6 text-green-400" />
              </div>

              <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
                Ready to transform your career or business with our expert
                guidance? Let's discuss how we can help you achieve your goals
                and reach new heights.
              </p>

              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </section>

        {/* Section 6: Registration */}
        <section id="contact" className="relative py-24 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Join Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                  Programs
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Choose your path to success. Select a program below to begin
                your transformation journey with CloudsDew Tech.
              </p>
            </div>

            {/* Program Selection Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => handleProgramSelect("mentorship")}
                className={`px-8 py-4 rounded-lg transition-all duration-300 ${
                  selectedProgram === "mentorship"
                    ? "bg-gradient-to-r from-green-500 to-cyan-500 text-black"
                    : "bg-gray-900/50 border border-gray-700 text-white hover:border-green-500/50"
                }`}
              >
                <User className="mr-2" size={20} />
                1-to-1 Mentorship
                {selectedProgram === "mentorship" && (
                  <ChevronDown className="ml-2" size={16} />
                )}
              </Button>

              <Button
                size="lg"
                onClick={() => handleProgramSelect("bootcamp")}
                className={`px-8 py-4 rounded-lg transition-all duration-300 ${
                  selectedProgram === "bootcamp"
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gray-900/50 border border-gray-700 text-white hover:border-blue-500/50"
                }`}
              >
                <Award className="mr-2" size={20} />
                Bootcamp
                {selectedProgram === "bootcamp" && (
                  <ChevronDown className="ml-2" size={16} />
                )}
              </Button>
            </div>

            {/* Registration Form */}
            {selectedProgram && (
              <div className="max-w-2xl mx-auto">
                <form
                  onSubmit={handleRegistrationSubmit}
                  className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedProgram === "mentorship"
                        ? "1-to-1 Mentorship"
                        : "Bootcamp"}{" "}
                      Registration
                    </h3>
                    <p className="text-gray-300">
                      {selectedProgram === "mentorship"
                        ? "Get personalized guidance from industry experts"
                        : "Join our intensive training program"}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <Input
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <Input
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Role
                      </label>
                      <Input
                        placeholder="Software Developer"
                        value={formData.currentRole}
                        onChange={(e) =>
                          handleInputChange("currentRole", e.target.value)
                        }
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Experience Level *
                    </label>
                    <select
                      className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        handleInputChange("experienceLevel", e.target.value)
                      }
                      required
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">
                        Intermediate (2-5 years)
                      </option>
                      <option value="advanced">Advanced (5+ years)</option>
                    </select>
                  </div>

                  {selectedProgram === "mentorship" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Areas of Interest
                      </label>
                      <select
                        className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"
                        value={formData.areasOfInterest}
                        onChange={(e) =>
                          handleInputChange("areasOfInterest", e.target.value)
                        }
                      >
                        <option value="">Select your focus area</option>
                        <option value="AWS Cloud Architecture">
                          AWS Cloud Architecture
                        </option>
                        <option value="Azure DevOps">Azure DevOps</option>
                        <option value="Google Cloud Platform">
                          Google Cloud Platform
                        </option>
                        <option value="Kubernetes & Containers">
                          Kubernetes & Containers
                        </option>
                        <option value="CI/CD Pipelines">CI/CD Pipelines</option>
                        <option value="Infrastructure as Code">
                          Infrastructure as Code
                        </option>
                      </select>
                    </div>
                  )}

                  {selectedProgram === "bootcamp" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Schedule
                      </label>
                      <select
                        className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none"
                        value={formData.schedulePreference}
                        onChange={(e) =>
                          handleInputChange(
                            "schedulePreference",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select your preferred schedule</option>
                        <option value="weekdays">Weekdays (9 AM - 5 PM)</option>
                        <option value="evenings">Evenings (6 PM - 9 PM)</option>
                        <option value="weekends">
                          Weekends (10 AM - 4 PM)
                        </option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Goals & Expectations (Optional)
                    </label>
                    <Textarea
                      placeholder="Tell us about your career goals and what you hope to achieve..."
                      rows={4}
                      value={formData.goalsExpectations}
                      onChange={(e) =>
                        handleInputChange("goalsExpectations", e.target.value)
                      }
                      className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) =>
                        handleInputChange("termsAccepted", e.target.checked)
                      }
                      className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-300">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-green-400 hover:text-green-300"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-green-400 hover:text-green-300"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isRegistrationLoading}
                    className={`w-full font-semibold py-3 rounded-lg transition-all duration-300 ${
                      selectedProgram === "mentorship"
                        ? "bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-black"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    }`}
                  >
                    {isRegistrationLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Registering...</span>
                      </div>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        Register for{" "}
                        {selectedProgram === "mentorship"
                          ? "Mentorship"
                          : "Bootcamp"}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-16 px-6 lg:px-12 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-6">
                <Image
                  src="/cloudsdew-logo.png"
                  alt="CloudsDew Tech"
                  width={200}
                  height={60}
                  className="h-14 w-auto"
                />
                <p className="text-gray-300 leading-relaxed max-w-md">
                  Transform your career with expert training in MultiCloud,
                  DevOps, and AI technologies. Be among the first to accelerate
                  your growth with CloudsDew Tech’s premium programs.
                </p>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Star className="w-5 h-5 text-green-400" />
                  <h4 className="text-lg font-semibold text-white">
                    Quick Links
                  </h4>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => scrollToSection("home")}
                    className="block text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="block text-gray-300 hover:text-white transition-colors text-left"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="block text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="block text-gray-300 hover:text-white transition-colors text-left"
                  >
                    Contact
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <Star className="w-5 h-5 text-green-400" />
                  <h4 className="text-lg font-semibold text-white">Contact</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300 text-sm">
                      cloudsdewai@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-gray-300 text-sm">
                      +2349133237953
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-gray-300 text-sm">
                      5 Ire-Akari Street, Magbon Lagos State
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Star className="w-4 h-4 text-green-400" />
                  <span>
                    © 2025 CloudsDew Tech. All rights reserved. | Transforming
                    careers through innovation.
                  </span>
                  <Star className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-center">
                  <p className="text-green-400 font-medium text-sm">
                    Making Impact, One Professional at a Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <Toaster />
      </div>
    </div>
  );
}
