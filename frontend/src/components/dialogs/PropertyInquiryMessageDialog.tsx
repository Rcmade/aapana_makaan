"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { propertyInquirySchema } from "@/zodSchema/scheduleSchema";
import { type PropertyInquirySchemaT } from "@/types";
import {
  type GetPropertyResponseT,
  type InquiryMessageRequestT,
  type InquiryMessageResponseT,
} from "@/types/apiResponse";
import { useState } from "react";
import axios from "axios";
import { sendInquiryMessagePostApi } from "@/constant/apiRoutes";
import { getAxiosErrorMessage, getBackendUrl } from "@/lib/utils/stringUtils";
import { toast } from "sonner";

interface PropertyInquiryMessageDialogProps {
  property: {
    name: GetPropertyResponseT["name"];
    completeAddress: GetPropertyResponseT["completeAddress"];
    id: GetPropertyResponseT["id"];
  };
}

export default function PropertyInquiryMessageDialog({
  property,
}: PropertyInquiryMessageDialogProps) {
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    message: `I would like more information about ${property.name}, located at ${property.completeAddress}.`,
    propertyId: property.id,
  } satisfies PropertyInquirySchemaT;

  const [open, setOpen] = useState(false);
  const form = useForm<PropertyInquirySchemaT>({
    resolver: zodResolver(propertyInquirySchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: PropertyInquirySchemaT) {
    try {
      const { data } = await axios.post<InquiryMessageResponseT>(
        getBackendUrl(sendInquiryMessagePostApi),
        values satisfies InquiryMessageRequestT,
      );
      toast.success(data.message);
      form.reset(defaultValues);
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to schedule tour:", error.message);
      toast.error(getAxiosErrorMessage(error)?.error);
    }
  }

  const isLoading = form.formState.isSubmitting;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          aria-label="Send message"
        >
          Send Message
        </Button>
      </DialogTrigger>
      <DialogContent className="scrollbar max-h-full overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Know more about this property</DialogTitle>
          </div>
          <DialogDescription>
            Complete this form so we can get in touch
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Name *"
                      {...field}
                      aria-label="Name"
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
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Email *"
                      type="email"
                      {...field}
                      aria-label="Email"
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
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Phone number *"
                      type="tel"
                      {...field}
                      aria-label="Phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Your message"
                      className="scrollbar resize-none"
                      {...field}
                      aria-label="Message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              Send message
            </Button>

            <p className="text-sm text-muted-foreground">
              This site is protected by reCAPTCHA and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              &{" "}
              <a
                href="https://policies.google.com/terms"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
