import FloatingLanterns from "@/components/decorations/FloatingLanterns";
import HangingLanterns from "@/components/decorations/HangingLanterns";
import CherryBlossoms from "@/components/decorations/CherryBlossoms";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <HangingLanterns />
      <FloatingLanterns />
      <CherryBlossoms />
      {children}
    </>
  );
}
