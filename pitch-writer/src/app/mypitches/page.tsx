"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, Brain, Zap, Lightbulb, Wand2, Loader2,Search } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { format } from "date-fns"; // npm i date-fns
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function MyPitchesPage() {
  type Pitch = {
    id: string;
    user_email: string;
    pitch_type: string;
    output_pitch: string;
    input_data: {
      productName?: string;
    };
    created_at: string;
  };

  const { user } = useAuth();
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pitchTypeFilter, setPitchTypeFilter] = useState("");

  function FloatingParticles() {
    const [particles, setParticles] = useState<
      {
        left: string;
        top: string;
        animationDelay: string;
        animationDuration: string;
      }[]
    >([]);

    useEffect(() => {
      const generatedParticles = [...Array(12)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }));
      setParticles(generatedParticles);
    }, []);

    return (
      <div className="absolute inset-0 -z-5 pointer-events-none">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce-slow"
            style={style}
          />
        ))}
      </div>
    );
  }

  useEffect(() => {
    const fetchPitches = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("pitches")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });

      if (!error) {
        setPitches(data);
      } else {
        console.error("Error fetching pitches:", error);
      }

      setLoading(false);
    };

    fetchPitches();
  }, [user]);

  const handleDelete = async (pitchId: string) => {
    try {
      const { error } = await supabase
        .from("pitches")
        .delete()
        .eq("id", pitchId);

      if (error) {
        console.error("Failed to delete pitch:", error.message);
        alert("Error deleting pitch. Try again.");
        return;
      }

      toast("Pitch Deleted Successfully.", {
        icon: <Trash className="w-4 h-4 text-white-400" />,
      });

      setPitches((prev) => prev.filter((p) => p.id !== pitchId));
    } catch (error) {
      toast.error("Failed to delete pitch.");
      console.error(error);
    }
  };

  const handleView = (pitch: Pitch) => {
    const formData = JSON.stringify(pitch.input_data || {});
    const queryParams = new URLSearchParams({
      pitch: pitch.output_pitch,
      formData,
    }).toString();

    window.location.href = `/result?${queryParams}`;
  };

  const filteredPitches = pitches.filter((pitch) => {
    const matchesSearch = pitch.input_data?.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesType = pitchTypeFilter
      ? pitch.pitch_type === pitchTypeFilter
      : true;

    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Sidebar />
      {/* Floating decorative elements */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-1/3 right-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
        <div className="absolute left-3 top-1/2 w-32 h-32 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-16 left-1/4 w-24 h-24 bg-blue-400/8 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute left-3 top-1/2 w-40 h-40 bg-blue-300/4 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-16 left-2/4 w-28 h-28 bg-blue-500/6 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute bottom-1/2 right-8 w-20 h-20 bg-blue-400/7 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-1/3 left-8 w-36 h-36 bg-blue-300/5 rounded-full blur-2xl animate-bounce-slow"></div>
      </div>

      {/* Floating particles */}

      <FloatingParticles />
      {/* Top decorative icons */}
      <div className="absolute bottom-16 left-2/4 opacity-30">
        <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
      </div>
      <div className="absolute top-8 right-8 opacity-30">
        <Zap className="w-8 h-8 text-blue-400 animate-bounce-slow" />
      </div>
      <div className="absolute top-16 left-1/4 opacity-20">
        <Lightbulb className="w-6 h-6 text-blue-300 animate-pulse" />
      </div>
      <div className="absolute top-16 right-1/4 opacity-20">
        <Wand2 className="w-6 h-6 text-blue-300 animate-bounce-slow" />
      </div>

      <h1 className="text-5xl font-bold font-orbitron mb-6 text-center">
        🕘 My Past Pitches
      </h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by product name..."
            className="pl-10 input-glass"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={pitchTypeFilter}
          onChange={(e) => setPitchTypeFilter(e.target.value)}
          className="glass-container px-4 py-2 rounded-lg text-white bg-black/30 border border-purple-500/20 shadow-sm hover:border-purple-400 transition duration-150 ease-in-out focus:outline-none"
        >
          <option value="">All Pitch Types</option>
          <option value="startup">🚀 Startup</option>
          <option value="product">📦 Product</option>
          <option value="job">👔 Job Interview</option>
          <option value="investor">💰 Investor</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center text-gray-400 animate-fade-in space-y-2">
          <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
          <p>Loading your pitches...</p>
        </div>
      ) : filteredPitches.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 text-center text-gray-500 animate-fade-in space-y-2">
          <Zap className="w-6 h-6 text-yellow-400 animate-bounce-slow" />
          <p>No matching pitches found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPitches.map((pitch) => (
            <div
              key={pitch.id}
              className="glass-container p-6 rounded-xl border border-gray-700 flex flex-col md:flex-row justify-between"
            >
              <div>
                <h2 className="font-bold text-xl text-purple-400 mb-1">
                  {pitch.input_data?.productName || "Unnamed Product"}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  {pitch.pitch_type?.charAt(0).toUpperCase() +
                    pitch.pitch_type?.slice(1)}{" "}
                  |{" "}
                  {format(new Date(pitch.created_at), "MMM dd, yyyy - hh:mm a")}
                </p>
                <p className="text-gray-300 line-clamp-3">
                  {pitch.output_pitch}
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center gap-2">
                <Button variant="secondary" onClick={() => handleView(pitch)}>
                  View
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 text-white shadow-md">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-container bg-black/60 backdrop-blur-md border border-purple-500/30 shadow-lg text-gray-200">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-purple-400 text-xl font-bold">
                        Are you sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone. This will permanently
                        delete your pitch.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4">
                      <AlertDialogCancel className="bg-black hover:bg-gray-600 text-white border border-gray-600">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 text-white shadow-md"
                        onClick={() => handleDelete(pitch.id)}
                      >
                        Yes, delete it
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
