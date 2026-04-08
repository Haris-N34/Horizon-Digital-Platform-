import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
