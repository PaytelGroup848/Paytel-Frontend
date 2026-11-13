import * as Icons from "lucide-react";

export const featureGroups = [
  {
    title: "Remote desktop and application delivery",
    description:
      "Choose between a complete desktop session or a focused app experience, then tailor access to the way each team works.",
    items: [
      {
        icon: Icons.Monitor,
        title: "Full desktop sessions",
        body: "Give users a familiar Windows desktop with their work tools available in one remote session.",
      },
      {
        icon: Icons.AppWindow,
        title: "Publish selected applications",
        body: "Make individual business applications available without asking users to navigate a full desktop.",
      },
      {
        icon: Icons.Users,
        title: "Assign apps to people",
        body: "Match applications and workspaces to the users or groups who need them.",
      },
      {
        icon: Icons.PanelsTopLeft,
        title: "Run multiple sessions",
        body: "Support separate user sessions on a shared Windows host, based on your server configuration.",
      },
    ],
  },
  {
    title: "Connection modes",
    description:
      "Offer connection choices that suit different devices, user preferences, and working environments.",
    items: [
      {
        icon: Icons.MonitorPlay,
        title: "Remote desktop client",
        body: "Connect with a standard remote desktop client for a full desktop workflow.",
      },
      {
        icon: Icons.AppWindowMac,
        title: "Remote application client",
        body: "Launch published applications from a lightweight desktop client.",
      },
      {
        icon: Icons.Globe,
        title: "HTML5 browser access",
        body: "Open a remote desktop or application through a supported web browser.",
      },
    ],
  },
  {
    title: "Connection experiences",
    description:
      "Set up different ways for users to reach a complete desktop or go straight to the application they need.",
    items: [
      {
        icon: Icons.Monitor,
        title: "Standard desktop connection",
        body: "Start a full desktop using a familiar remote desktop client.",
      },
      {
        icon: Icons.Zap,
        title: "One-click desktop",
        body: "Simplify repeat access to a complete remote workspace.",
      },
      {
        icon: Icons.PanelsTopLeft,
        title: "Floating app launcher",
        body: "Let users open published apps from a compact launcher on their device.",
      },
      {
        icon: Icons.AppWindow,
        title: "Application panel",
        body: "Present assigned applications in a clear, dedicated launch panel.",
      },
      {
        icon: Icons.ArrowRight,
        title: "Direct app launch",
        body: "Send a user directly into a selected application when their session starts.",
      },
      {
        icon: Icons.Globe,
        title: "Browser desktop",
        body: "Reach a full remote workspace through a browser-based session.",
      },
      {
        icon: Icons.AppWindowMac,
        title: "Browser app launch",
        body: "Open a selected remote application directly from the web portal.",
      },
      {
        icon: Icons.Laptop,
        title: "Installable web app",
        body: "Offer a desktop-like browser experience that users can add to a compatible device.",
      },
      {
        icon: Icons.PanelsTopLeft,
        title: "Tabbed web portal",
        body: "Keep browser-launched applications organized in separate tabs.",
      },
    ],
  },
  {
    title: "Remote printing",
    description:
      "Make it easier for users to print from a remote session to printers available at their location.",
    items: [
      {
        icon: Icons.Printer,
        title: "Universal printing",
        body: "Route remote print jobs back to a user device without manually matching every local printer model.",
      },
      {
        icon: Icons.ScanLine,
        title: "Advanced printer setup",
        body: "Configure printer options for specialist needs such as label formats or custom paper sizes.",
      },
    ],
  },
  {
    title: "Administration tools",
    description:
      "Keep everyday setup and user access manageable with tools for configuration and administration.",
    items: [
      {
        icon: Icons.Globe2,
        title: "Custom web portal",
        body: "Present a straightforward web entry point for users to access their remote resources.",
      },
      {
        icon: Icons.Users,
        title: "User and app management",
        body: "Organize accounts and control which applications are available to each user.",
      },
      {
        icon: Icons.Network,
        title: "Directory integration",
        body: "Connect user access with your existing directory and identity structure.",
      },
      {
        icon: Icons.Laptop,
        title: "Client configuration",
        body: "Prepare connection settings to make setup easier across user devices.",
      },
    ],
  },
  {
    title: "Security",
    description:
      "Layer practical safeguards around remote sessions, sign-ins, and server access.",
    items: [
      {
        icon: Icons.LockKeyhole,
        title: "Encrypted connections",
        body: "Protect data in transit with encrypted connections and certificate-based configuration.",
      },
      {
        icon: Icons.ShieldAlert,
        title: "Security controls",
        body: "Add policies intended to help protect remote servers and access points.",
      },
      {
        icon: Icons.Fingerprint,
        title: "Multi-factor sign-in",
        body: "Require an additional verification step when users sign in to the web portal.",
      },
      {
        icon: Icons.RefreshCw,
        title: "Ongoing updates",
        body: "Keep the deployment current with product and compatibility updates.",
      },
      {
        icon: Icons.KeyRound,
        title: "Login lockout",
        body: "Limit repeated unsuccessful login attempts with account lockout controls.",
      },
    ],
  },
  {
    title: "Server farm management",
    description:
      "Coordinate remote access across multiple servers as your user base and workloads expand.",
    items: [
      {
        icon: Icons.Network,
        title: "Gateway access",
        body: "Provide a managed entry point for users connecting to remote resources.",
      },
      {
        icon: Icons.Scale,
        title: "Load distribution",
        body: "Distribute incoming sessions across eligible servers in a multi-server environment.",
      },
      {
        icon: Icons.Route,
        title: "Reverse proxy",
        body: "Route remote access traffic to the appropriate server in your deployment.",
      },
    ],
  },
];
