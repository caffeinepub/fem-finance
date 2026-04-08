import { Layout } from "@/components/Layout";
import { LanguageProvider } from "@/hooks/useLanguage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Home = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.Home })),
);
const ServicesPage = lazy(() =>
  import("@/pages/ServicesPage").then((m) => ({ default: m.ServicesPage })),
);
const ServiceDetailPage = lazy(() =>
  import("@/pages/ServiceDetailPage").then((m) => ({
    default: m.ServiceDetailPage,
  })),
);
const Calculator = lazy(() =>
  import("@/pages/Calculator").then((m) => ({ default: m.Calculator })),
);
const Education = lazy(() =>
  import("@/pages/Education").then((m) => ({ default: m.Education })),
);
const Contact = lazy(() =>
  import("@/pages/Contact").then((m) => ({ default: m.Contact })),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <LanguageProvider>
      <Layout>
        <Outlet />
      </Layout>
    </LanguageProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  ),
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServicesPage />
    </Suspense>
  ),
});

const serviceDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services/$serviceId",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ServiceDetailPage />
    </Suspense>
  ),
});

const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Calculator />
    </Suspense>
  ),
});

const educationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/education",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Education />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Contact />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  serviceDetailRoute,
  calculatorRoute,
  educationRoute,
  contactRoute,
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
