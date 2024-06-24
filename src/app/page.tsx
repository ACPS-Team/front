import Dashboard from "@/components/Dashboard";
import { AuthGuard } from "@/components/AuthGuard";

function Home() {
  return (
    <Dashboard
      actualState="dashboard"
      headerOptions={{
        title: "Tableau de bord",
      }}
    >
      <main>aaa</main>
    </Dashboard>
  );
}

export default function AuthHome() {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  );
}
