import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { UserProfile } from '@/hooks/useUserProfile';

interface GatepassRequestFormProps {
  profile: UserProfile;
}

const GatepassRequestForm: React.FC<GatepassRequestFormProps> = ({ profile }) => {
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [reason, setReason] = useState('');
  const [destination, setDestination] = useState('');
  const [leaveDate, setLeaveDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [parentContact, setParentContact] = useState(profile.parent_contact || '');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveDate || !returnDate) {
      showError("Please select both leave and return dates.");
      return;
    }
    setLoading(true);
    const toastId = showLoading("Submitting your request...");

    const { error } = await supabase.from('gatepass_requests').insert({
      student_id: profile.id,
      student_room_number: roomNumber,
      student_course: department,
      student_contact: profile.contact || 'N/A',
      parent_contact: parentContact,
      reason: `${reason} - Destination: ${destination}`,
      leave_start_date: leaveDate.toISOString(),
      leave_end_date: returnDate.toISOString(),
    });

    dismissToast(toastId);
    setLoading(false);

    if (error) {
      showError(`Failed to submit request: ${error.message}`);
    } else {
      showSuccess("Gatepass request submitted successfully!");
      setStudentId('');
      setDepartment('');
      setRoomNumber('');
      setReason('');
      setDestination('');
      setLeaveDate(undefined);
      setReturnDate(undefined);
      setParentContact(profile.parent_contact || '');
      setAgreed(false);
    }
  };

  return (
    <Card className="w-full bg-white/80 dark:bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>New Gatepass Request</CardTitle>
        <CardDescription>Fill out the form below to request a gatepass.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Name of Student</Label>
            <Input value={`${profile.first_name || ''} ${profile.last_name || ''}`} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentId">Student ID / Roll Number</Label>
            <Input id="studentId" placeholder="e.g., 202101001" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="department">Department / Year / Section</Label>
            <Input id="department" placeholder="e.g., CSE / III / A" value={department} onChange={(e) => setDepartment(e.target.value)} required />
          </div>
           <div className="space-y-2">
            <Label htmlFor="roomNumber">Hostel Room Number</Label>
            <Input id="roomNumber" placeholder="e.g., B-204" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentContact">Parent / Guardian Contact</Label>
            <Input id="parentContact" type="tel" placeholder="e.g., 9876543210" value={parentContact} onChange={(e) => setParentContact(e.target.value)} required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="destination">Destination / Place going</Label>
            <Input id="destination" placeholder="e.g., Home, City Library" value={destination} onChange={(e) => setDestination(e.target.value)} required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="reason">Reason for Exit / Entry</Label>
            <Textarea id="reason" placeholder="e.g., Weekend leave, Medical appointment" value={reason} onChange={(e) => setReason(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Date & Time (Out)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !leaveDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {leaveDate ? format(leaveDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={leaveDate}
                  onSelect={setLeaveDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label>Expected Return Time (In)</Label>
             <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <div className="px-6 pb-6 space-y-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    I confirm that the information provided is accurate and I will adhere to the institution's rules. This submission acts as my digital signature.
                </label>
            </div>
        </div>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading || !agreed}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GatepassRequestForm;