import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { showError, showSuccess } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const NewGatepassRequest = () => {
  const navigate = useNavigate();
  const { profile, loading: profileLoading } = useUserProfile();

  const [studentId, setStudentId] = useState("");
  const [department, setDepartment] = useState("");
  const [hostel, setHostel] = useState("");
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState<Date | undefined>();
  const [leaveEndDate, setLeaveEndDate] = useState<Date | undefined>();
  const [parentContact, setParentContact] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !leaveStartDate || !leaveEndDate) {
        showError("Please fill all required fields.");
        return;
    }
    setLoading(true);

    const { error } = await supabase.from("gatepass_requests").insert({
        student_id: profile.id,
        student_room_number: hostel,
        student_course: department,
        student_contact: profile.contact || '',
        parent_contact: parentContact,
        reason: `${reason} Destination: ${destination}`,
        leave_start_date: leaveStartDate.toISOString(),
        leave_end_date: leaveEndDate.toISOString(),
    });

    setLoading(false);
    if (error) {
        showError(error.message);
    } else {
        showSuccess("Gatepass request submitted successfully!");
        navigate("/student-dashboard");
    }
  };

  if (profileLoading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <Skeleton className="h-8 w-1/2 mx-auto" />
                    <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-10 w-full" />
                </CardFooter>
            </Card>
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      <Card className="w-full max-w-2xl bg-white/80 dark:bg-black/50 backdrop-blur-sm">
        <CardHeader className="relative text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="absolute left-4 top-4"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <CardTitle className="text-3xl">New Gate Pass Request</CardTitle>
          <CardDescription>Please fill out the details below to request a gate pass.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name of Student</Label>
                        <Input id="name" type="text" value={`${profile?.first_name || ''} ${profile?.last_name || ''}`} disabled />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="student-id">Student ID / Roll Number</Label>
                        <Input id="student-id" type="text" placeholder="Enter your Roll Number" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="department">Department / Year / Section</Label>
                        <Input id="department" type="text" placeholder="e.g., CSE / 3rd / B" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="hostel">Hostel / Room Number</Label>
                        <Input id="hostel" type="text" placeholder="e.g., Kaveri / 201" value={hostel} onChange={(e) => setHostel(e.target.value)} required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="reason">Reason for Exit / Entry</Label>
                    <Textarea id="reason" placeholder="Please provide a brief reason for your request" value={reason} onChange={(e) => setReason(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="destination">Destination / Place going</Label>
                    <Input id="destination" type="text" placeholder="e.g., Home, City Market" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="out-date">Date & Time (Out)</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !leaveStartDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {leaveStartDate ? format(leaveStartDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={leaveStartDate}
                                onSelect={setLeaveStartDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="in-date">Expected Return Time (In)</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !leaveEndDate && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {leaveEndDate ? format(leaveEndDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={leaveEndDate}
                                onSelect={setLeaveEndDate}
                                initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="parent-contact">Parent / Guardian Contact</Label>
                    <Input id="parent-contact" type="tel" placeholder="Enter parent's phone number" value={parentContact} onChange={(e) => setParentContact(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="attachments">Attachments (Optional)</Label>
                    <Input id="attachments" type="file" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Request"}</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewGatepassRequest;