import logo from "../../assets/Ctrl-Books-New-Dashboard-Image-2 (1).png";

export default function DashboardPreview() {
  return (
    <img
  className="mt-10 w-full h-[30%]"
  src={logo}
  alt="Dashboard Preview"
  fetchPriority="high"
/>
  );
}