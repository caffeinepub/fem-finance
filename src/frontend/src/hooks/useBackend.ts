import { createActor } from "@/backend";
import type { Backend } from "@/backend";
import type { ContactInput, LeadInput } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";

export function useBackend() {
  const { actor, isFetching } = useActor<Backend>(createActor);

  const submitLead = async (input: LeadInput): Promise<boolean> => {
    if (!actor || isFetching) return false;
    try {
      const backendActor = actor as unknown as {
        submitLead: (input: LeadInput) => Promise<unknown>;
      };
      await backendActor.submitLead(input);
      return true;
    } catch {
      return false;
    }
  };

  const submitContactMessage = async (
    input: ContactInput,
  ): Promise<boolean> => {
    if (!actor || isFetching) return false;
    try {
      const backendActor = actor as unknown as {
        submitContactMessage: (input: ContactInput) => Promise<unknown>;
      };
      await backendActor.submitContactMessage(input);
      return true;
    } catch {
      return false;
    }
  };

  return { submitLead, submitContactMessage, isReady: !!actor && !isFetching };
}
