'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Github, Chrome } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "signin" | "signup";
}

export default function AuthModal({ isOpen, onClose, defaultTab = "signin" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value === "signup" ? "signup" : "signin");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none bg-background/95 backdrop-blur-xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-primary/5 pointer-events-none" />
        
        <DialogHeader className="px-8 pt-8 pb-4 relative z-10">
          <DialogTitle className="font-display text-3xl font-bold text-gradient-gold mb-2 text-center">
            {activeTab === "signin" ? "Welcome Back" : "Begin Your Journey"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground font-body">
            {activeTab === "signin" 
              ? "Sign in to access your exclusive member benefits and bookings." 
              : "Join LuxeStays and unlock a world of meticulously curated luxury."}
          </DialogDescription>
        </DialogHeader>

        <div className="px-8 pb-8 relative z-10">
          <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="signin" className="rounded-lg font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-lg font-medium transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm">Sign Up</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="signin" key="signin" className="m-0">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="email" placeholder="name@example.com" className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-gold/50" />
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button className="text-xs text-primary hover:underline font-medium">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-gold/50" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-2">
                    <Button className="w-full h-12 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-base shadow-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Sign In
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>

                  <motion.div variants={itemVariants} className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-xl h-11 hover:bg-secondary/50">
                      <Chrome className="mr-2 w-4 h-4" />
                      Google
                    </Button>
                    <Button variant="outline" className="rounded-xl h-11 hover:bg-secondary/50">
                      <Github className="mr-2 w-4 h-4" />
                      GitHub
                    </Button>
                  </motion.div>

                  <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground pt-4">
                    Don't have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("signup")}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Sign up for free
                    </button>
                  </motion.p>
                </motion.div>
              </TabsContent>

              <TabsContent value="signup" key="signup" className="m-0">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="name" placeholder="John Doe" className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-gold/50" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="reg-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="reg-email" placeholder="name@example.com" className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-gold/50" />
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input id="reg-password" type="password" placeholder="••••••••" className="pl-10 h-12 rounded-xl bg-background/50 border-border/50 focus:border-gold/50" />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-2">
                    <Button className="w-full h-12 rounded-xl bg-gradient-gold text-primary-foreground font-semibold text-base shadow-lg hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>

                  <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground pt-4">
                    Already have an account?{" "}
                    <button 
                      onClick={() => setActiveTab("signin")}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </motion.p>

                  <motion.p variants={itemVariants} className="text-center text-[10px] text-muted-foreground/60 pt-2 uppercase tracking-widest font-bold">
                    By clicking continue, you agree to our <button className="underline hover:text-primary transition-colors">Terms</button> & <button className="underline hover:text-primary transition-colors">Privacy</button>.
                  </motion.p>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
