import { ReactNode } from "react";

export default function BusinessLayout({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
