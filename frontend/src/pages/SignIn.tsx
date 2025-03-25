
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    // In a real application, this would make an API call to authenticate
    setTimeout(() => {
      // Simulate successful login
      toast({
        title: "Sign in successful!",
        description: "Welcome back to Bharat Connect.",
      });
      
      // In production, you would store auth token or user data
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", values.email);
      
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 pb-12 flex flex-col justify-center items-center bg-gradient-to-b from-indian-cream to-white">
        <div className="w-full max-w-md mx-auto p-8 space-y-8 bg-white rounded-xl shadow-lg animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">Sign in to connect with authentic Indian products</p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" className="flex-1 border-indian-red hover:bg-indian-red/5">
              <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="flex-1 border-indian-red hover:bg-indian-red/5">
              <img src="/facebook.svg" alt="Facebook" className="w-5 h-5 mr-2" />
              Facebook
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="yourname@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-indian-red hover:bg-indian-red/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center">
            <Link to="/forgot-password" className="text-indian-red hover:underline text-sm">
              Forgot your password?
            </Link>
            <p className="mt-4 text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-indian-red hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
