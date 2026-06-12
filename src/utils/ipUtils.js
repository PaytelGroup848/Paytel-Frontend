export const getUserIp = async () => {
  const apis = [
    { url: "https://api.ipify.org?format=json", parser: (data) => data.ip },
    { url: "https://api.my-ip.io/ip.json", parser: (data) => data.ip },
    { url: "https://ipapi.co/json/", parser: (data) => data.ip },
    { url: "https://ipinfo.io/json", parser: (data) => data.ip },
  ];

  for (const api of apis) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(api.url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const ip = api.parser(data);
        if (
          ip &&
          ip !== "unknown" &&
          !ip.startsWith("192.168") &&
          !ip.startsWith("10.")
        ) {
        
          return ip;
        }
      }
    } catch (error) {
      console.log("[IP] Failed to get IP from", api.url, error.message);
      continue;
    }
  }


  return null;
};

export const getIpGeolocation = async (ip) => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (response.ok) {
      const data = await response.json();
      return {
        city: data.city,
        country: data.country_name,
        lat: data.latitude,
        lon: data.longitude,
        isp: data.org,
      };
    }
  } catch (error) {
    console.error("[Geo] Failed to get location:", error);
  }
  return null;
};
