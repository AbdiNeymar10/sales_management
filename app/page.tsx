
import { redirect } from "next/navigation";
                                                                                                                                                                               
export default function Home() {
  // Redirect root to the login page so users see the login first
  redirect("/login");
}                                  