import { MessageCircleIcon } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/94704551111?text=Hello%21%20I%E2%80%99m%20interested%20in%20your%20services.%20Could%20you%20please%20share%20more%20details%3F";

export const floatingMailButtonoptions = {
  root: null,
  rootMargin: "100px",
  threshold: 0.1,
};

export default function FloatingMailButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent p-2 text-background transition-colors duration-150 hover:bg-accent/80 sm:bottom-8 sm:right-8 sm:h-14 sm:w-14 sm:p-3 lg:h-16 lg:w-16"
    >
      <MessageCircleIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
    </a>
  );
}
