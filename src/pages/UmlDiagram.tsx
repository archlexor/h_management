import Navbar from "@/components/hotel/Navbar";
import Footer from "@/components/hotel/Footer";
import MermaidDiagramCard from "@/components/uml/MermaidDiagramCard";

interface DiagramItem {
  id: string;
  title: string;
  description: string;
  definition: string;
}

const diagrams: DiagramItem[] = [
  {
    id: "component",
    title: "Component Diagram",
    description:
      "Derived from src/App.tsx routes and page composition in src/pages/Index.tsx plus hotel components used across the landing and UML pages.",
    definition: `flowchart TB
  App["App.tsx"] --> Router["BrowserRouter + Routes"]
  Router --> Home["Index.tsx (/) "]
  Router --> Uml["UmlDiagram.tsx (/uml-diagram)"]
  Router --> NF["NotFound.tsx (*)"]

  subgraph HomePage["Home Page (Index.tsx)"]
    direction TB
    Home --> Nav["Navbar.tsx"]
    Home --> Hero["HeroExpansion.tsx"]
    Home --> Foot["Footer.tsx"]
    Hero --> Dest["PopularDestinations.tsx"]
    Hero --> Props["FeaturedProperties.tsx"]
    Hero --> Offers["SpecialOffers.tsx"]
    Hero --> Reviews["Testimonials.tsx"]
    Hero --> News["Newsletter.tsx"]
    Nav --> Auth["AuthModal.tsx"]
  end

  subgraph UmlPage["UML Page"]
    direction TB
    Uml --> UmlCards["MermaidDiagramCard.tsx"]
    Uml --> Foot
  end`,
  },
  {
    id: "class",
    title: "Class Diagram",
    description:
      "Built from concrete interfaces, local state models, and prop contracts found in AuthModal, Navbar, HeroExpansion, FeaturedProperties, and Newsletter components.",
    definition: `classDiagram
  direction TB

  class AppRoutes {
    +route /
    +route /uml-diagram
    +route *
  }

  class NavbarState {
    +boolean mobileOpen
    +boolean showNotif
    +NotificationItem[] notifs
    +boolean authOpen
    +signin|signup authTab
  }

  class AuthModalProps {
    +boolean isOpen
    +() => void onClose
    +signin|signup defaultTab
  }

  class SearchState {
    +string location
    +boolean searched
  }

  class Property {
    +string name
    +string loc
    +number price
    +number rating
    +number reviews
    +string[] amenities
  }

  class NewsletterState {
    +string email
    +boolean subscribed
  }

  class FrontendOnlyArchitecture {
    +No service layer files
    +No database model files
  }

  AppRoutes <.. App
  NavbarState <.. Navbar
  AuthModalProps <.. AuthModal
  SearchState <.. HeroExpansion
  Property <.. FeaturedProperties
  NewsletterState <.. Newsletter
  FrontendOnlyArchitecture <.. App`,
  },
  {
    id: "auth-sequence",
    title: "Sequence Diagram: Login/Auth Flow",
    description:
      "Reflects current front-end auth interaction from Navbar and AuthModal (open modal, switch tabs, fill credentials, click sign-in), with no backend call in this repo.",
    definition: `sequenceDiagram
  actor User
  participant Navbar as Navbar.tsx
  participant AuthModal as AuthModal.tsx
  participant State as ReactState

  User->>Navbar: Click Sign In
  Navbar->>State: setAuthTab(signin)
  Navbar->>State: setAuthOpen(true)
  State-->>AuthModal: isOpen true, defaultTab signin
  AuthModal->>AuthModal: Render Sign In tab active
  User->>AuthModal: Enter email and password
  User->>AuthModal: Click Sign In button
  AuthModal->>State: Local UI state transition only
  Note over AuthModal,State: No API auth service call exists in current repository`,
  },
  {
    id: "core-sequence",
    title: "Sequence Diagram: Search Luxury Flow",
    description:
      "Represents the core hero search interaction implemented in HeroExpansion MediaContent form and React state transitions.",
    definition: `sequenceDiagram
  actor User
  participant Input as Hero search form
  participant Hero as MediaContent(HeroExpansion.tsx)
  participant State as ReactState

  User->>Input: Type destination in location field
  Input->>State: setLocation(value)
  User->>Input: Submit Search Luxury
  Input->>Hero: handleSearch(event)
  Hero->>State: event.preventDefault()
  Hero->>State: setSearched(true)
  State-->>Hero: Show searching status message
  Hero->>State: setTimeout(3000)
  State-->>Hero: setSearched(false) and hide status`,
  },
  {
    id: "project-flowchart",
    title: "Project Flowchart",
    description:
      "Overall flow from app bootstrap to routed pages and key interactive UI states, including auth modal and UML documentation route.",
    definition: `flowchart TD
  Start(["main.tsx bootstrap"]) --> App["App.tsx Providers"]
  App --> Router{Route Match}

  Router -->|/| Index["Index.tsx"]
  Router -->|/uml-diagram| Uml["UmlDiagram.tsx"]
  Router -->|*| NF["NotFound.tsx"]

  Index --> Nav["Navbar"]
  Index --> Hero["HeroExpansion + Search Form"]
  Index --> Destinations["PopularDestinations"]
  Index --> Properties["FeaturedProperties"]
  Index --> Newsletter["Newsletter"]
  Index --> Footer["Footer"]

  Nav --> AuthAction{Open Auth?}
  AuthAction -->|Yes| AuthModal["AuthModal Tabs + Forms"]
  AuthAction -->|No| ContinueBrowse["Continue browsing sections"]

  Hero --> SearchSubmit{Submit Search Form}
  SearchSubmit -->|Yes| SearchState["setSearched true then false after timeout"]

  Properties --> FavoriteToggle{Toggle favorite}
  FavoriteToggle --> FavoriteState["Update favorites Set"]

  Newsletter --> Subscribe{Valid Email?}
  Subscribe -->|Yes| SubscribedState["setSubscribed true"]

  Uml --> DiagramRender["MermaidDiagramCard x 5"]
  DiagramRender --> RenderState{Render outcome}
  RenderState -->|Success| ShowSVG["Responsive SVG diagram"]
  RenderState -->|Failure| ErrorUI["Error state with retry"]`,
  },
];

export default function UmlDiagram() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-7xl space-y-4 text-center">
          <p className="text-primary font-medium text-sm uppercase tracking-widest">Project Architecture</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">UML Diagram Explorer</h1>
          <p className="mx-auto max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
            Diagrams are generated from real components, route definitions, and UI interaction flows in this codebase.
            This repository currently contains a frontend-only implementation with no service layer or database model files.
          </p>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 lg:gap-8">
          {diagrams.map((diagram) => (
            <MermaidDiagramCard
              key={diagram.id}
              title={diagram.title}
              description={diagram.description}
              definition={diagram.definition}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
