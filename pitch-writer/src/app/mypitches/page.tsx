// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/providers/AuthProvider";
// import { supabase } from "@/lib/supabaseClient";
// import { Button } from "@/components/ui/button";
// import Sidebar from "@/components/ui/Sidebar";

// interface Pitch {
//   id: string;
//   user_email: string;
//   pitch_type: string;
//   output_pitch: string;
//   created_at: string;
//   input_data: string; // this might be a string or JSON depending on how it's saved
// }

// export default function MyPitchesPage() {
//   const { user } = useAuth();
//   const [pitches, setPitches] = useState<Pitch[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPitches = async () => {
//       if (!user?.email) return;

//       const { data, error } = await supabase
//         .from("pitches")
//         .select("*")
//         .eq("user_email", user.email)
//         .order("created_at", { ascending: false });

//       if (error) {
//         console.error("Failed to fetch pitches:", error);
//       } else {
//         setPitches(data || []);
//       }

//       setLoading(false);
//     };

//     fetchPitches();
//   }, [user?.email]);

//   const handleView = (pitch: Pitch) => {
//     const fullParams = new URLSearchParams({
//       pitch: pitch.output_pitch,
//       formData: JSON.stringify(pitch.input_data),
//     }).toString();

//     window.location.href = `/result?${fullParams}`;
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-10">
//       <Sidebar />
//       <h1 className="text-4xl font-bold font-orbitron mb-6 text-center">
//         🕘 My Past Pitches
//       </h1>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading your pitches...</p>
//       ) : pitches.length === 0 ? (
//         <p className="text-center text-gray-500">No pitches found.</p>
//       ) : (
//         <div className="space-y-4">
//           {pitches.map((pitch) => {
//             const parsedInput =
//               typeof pitch.input_data === "string"
//                 ? JSON.parse(pitch.input_data)
//                 : pitch.input_data;

//             return (
//               <div
//                 key={pitch.id}
//                 className="glass-container p-6 rounded-xl border border-gray-700"
//               >
//                 <div className="flex justify-between items-center mb-2">
//                   <div>
//                     <h2 className="font-bold text-lg text-purple-400">
//                       {parsedInput?.productName || "Unnamed Product"}
//                     </h2>
//                     <p className="text-sm text-gray-500">
//                       {new Date(pitch.created_at).toLocaleString()}
//                     </p>
//                   </div>
//                   <Button onClick={() => handleView(pitch)}>View</Button>
//                 </div>
//                 <p className="text-gray-300 line-clamp-3">
//                   {pitch.output_pitch}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { format } from "date-fns"; // npm i date-fns
import { toast } from "sonner";

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
  const confirmDelete = confirm("Are you sure you want to delete this pitch?");
  if (!confirmDelete) return;

  const { error } = await supabase
    .from("pitches")
    .delete()
    .eq("id", pitchId);

  if (error) {
    console.error("Failed to delete pitch:", error.message);
    alert("Error deleting pitch. Try again.");
    return;
  }

  // Optional: Show toast
  toast.success("Pitch deleted successfully!");

  // Update local state (remove deleted pitch)
  setPitches((prev) => prev.filter((p) => p.id !== pitchId));
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

      <h1 className="text-4xl font-bold font-orbitron mb-6 text-center">
        🕘 My Past Pitches
      </h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          type="text"
          placeholder="Search by product name..."
          className="w-full md:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={pitchTypeFilter}
          onChange={(e) => setPitchTypeFilter(e.target.value)}
          className="input-glass px-4 py-2 rounded bg-black/20 text-white"
        >
          <option value="">All Pitch Types</option>
          <option value="startup">Startup</option>
          <option value="product">Product</option>
          <option value="job">Job Interview</option>
          <option value="investor">Investor</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading your pitches...</p>
      ) : filteredPitches.length === 0 ? (
        <p className="text-center text-gray-500">No matching pitches found.</p>
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
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(pitch.id)}
                >
                  <Trash className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
