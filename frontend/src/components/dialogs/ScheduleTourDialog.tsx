"use client";

import * as React from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScheduleTourDialog } from "@/hooks/useScheduleTourDialog";
import { scheduleTime, scheduleType } from "@/content/webContent";
import { scheduleSchema } from "@/zodSchema/scheduleSchema";
import { type ScheduleSchemaT } from "@/types";
import { scheduleTourPostApi } from "@/constant/apiRoutes";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import axios from "axios";
import {
  ScheduleTourRequestT,
  ScheduleTourResponseT,
} from "@/types/apiResponse";
import { toast } from "sonner";

export default function ScheduleTourDialog() {
  const [open, setOpen] = React.useState(false);
  const store = useScheduleTourDialog();

  const defaultValues = {
    name: store.name,
    email: store.email,
    phone: store.phone,
  };
  const form = useForm<ScheduleSchemaT>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: ScheduleSchemaT) {
    try {
      const { data } = await axios.post<ScheduleTourResponseT>(
        getBackendUrl(scheduleTourPostApi),
        values satisfies ScheduleTourRequestT,
      );
      toast.success(data.message);
      form.reset(defaultValues);
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to schedule tour:", error.message);
      toast.error(getAxiosErrorMessage(error)?.error);
    }
  }

  const isLoading = form.formState.isLoading;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="lg" className="w-full">
          Schedule a tour
        </Button>
      </DialogTrigger>
      <DialogContent className="scrollbar max-h-full overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Schedule a tour
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Tabs
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-2 gap-2 bg-transparent">
                        {scheduleType.map((type) => (
                          <TabsTrigger
                            key={type}
                            value={type}
                            className="rounded-full border py-2 data-[state=active]:border-primary data-[state=active]:bg-accent"
                            disabled={isLoading}
                          >
                            {type?.replace("_", " ")}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel isRequiredField>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value &&
                              "border-input text-muted-foreground",
                          )}
                          showDisableLoaders={false}
                          disabled={isLoading}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel isRequiredField>Time</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={isLoading}>
                          <div className="flex items-center gap-4">
                            <Clock className="text-muted-foreground" />
                            <SelectValue placeholder="Select time" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {scheduleTime.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequiredField>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequiredField>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Your email"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel isRequiredField>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full"
              variant="destructive"
            >
              Schedule a tour
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </DialogContent>
    </Dialog>
  );
}
