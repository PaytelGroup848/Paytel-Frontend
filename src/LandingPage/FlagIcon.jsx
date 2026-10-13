// src/components/FlagIcon.jsx
import React from 'react';

const FlagIcon = ({ countryCode }) => {
  const flagStyle = {
    width: "18px",
    height: "14px",
    borderRadius: "2px",
    display: "inline-block",
    flexShrink: 0,
  };

  const flags = {
    IN: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="4.67" fill="#FF9933" />
        <rect y="4.67" width="18" height="4.67" fill="#FFFFFF" />
        <rect y="9.33" width="18" height="4.67" fill="#138808" />
        <circle cx="9" cy="7" r="1.8" fill="#000080" />
      </svg>
    ),
    US: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        {[0, 2, 4, 6, 8, 10, 12].map((y) => (
          <rect key={y} y={y} width="18" height="1.08" fill="#B22234" />
        ))}
        <rect width="7.2" height="7.54" fill="#3C3B6E" />
      </svg>
    ),
    CA: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="4.5" height="14" fill="#FF0000" />
        <rect x="4.5" width="9" height="14" fill="#FFFFFF" />
        <rect x="13.5" width="4.5" height="14" fill="#FF0000" />
        <polygon points="9,3 9.8,6 13,6 10.3,8 11.3,11 9,9 6.7,11 7.7,8 5,6 8.2,6" fill="#FF0000" />
      </svg>
    ),
    GB: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#012169" />
        <polygon points="0,0 18,14 16,14 0,2" fill="#FFFFFF" />
        <polygon points="18,0 0,14 2,14 18,2" fill="#FFFFFF" />
        <polygon points="0,0 18,14 14,14 0,4" fill="#C8102E" />
        <polygon points="18,0 0,14 4,14 18,4" fill="#C8102E" />
        <rect x="0" y="6" width="18" height="2" fill="#FFFFFF" />
        <rect x="8" y="0" width="2" height="14" fill="#FFFFFF" />
        <rect x="0" y="6.6" width="18" height="0.8" fill="#C8102E" />
        <rect x="8.4" y="0" width="0.8" height="14" fill="#C8102E" />
      </svg>
    ),
    AU: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#00008B" />
        <rect width="7.2" height="7.54" fill="#3C3B6E" />
        <circle cx="13" cy="3.5" r="1" fill="#FFFFFF" />
        <circle cx="11" cy="8" r="0.7" fill="#FFFFFF" />
        <circle cx="15" cy="7" r="0.8" fill="#FFFFFF" />
        <circle cx="13" cy="11" r="0.7" fill="#FFFFFF" />
        <circle cx="9" cy="12" r="0.5" fill="#FFFFFF" />
      </svg>
    ),
    JP: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <circle cx="9" cy="7" r="3.5" fill="#BC002D" />
      </svg>
    ),
    CN: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#DE2910" />
        <polygon points="4,2 5,5 8,5 5.6,7 6.5,10 4,8.2 1.5,10 2.4,7 0,5 3,5" fill="#FFDE00" />
      </svg>
    ),
    DE: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="4.67" fill="#000000" />
        <rect y="4.67" width="18" height="4.67" fill="#DD0000" />
        <rect y="9.33" width="18" height="4.67" fill="#FFCE00" />
      </svg>
    ),
    FR: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#002395" />
        <rect x="6" width="6" height="14" fill="#FFFFFF" />
        <rect x="12" width="6" height="14" fill="#ED2939" />
      </svg>
    ),
    IT: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#009246" />
        <rect x="6" width="6" height="14" fill="#FFFFFF" />
        <rect x="12" width="6" height="14" fill="#CE2B37" />
      </svg>
    ),
    ES: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="3.5" fill="#AA151B" />
        <rect y="3.5" width="18" height="7" fill="#F1BF00" />
        <rect y="10.5" width="18" height="3.5" fill="#AA151B" />
      </svg>
    ),
    RU: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="4.67" fill="#FFFFFF" />
        <rect y="4.67" width="18" height="4.67" fill="#0039A6" />
        <rect y="9.33" width="18" height="4.67" fill="#D52B1E" />
      </svg>
    ),
    BR: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#009B3A" />
        <polygon points="9,1.5 16,7 9,12.5 2,7" fill="#FEDF00" />
        <circle cx="9" cy="7" r="3" fill="#002776" />
      </svg>
    ),
    MX: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#006847" />
        <rect x="6" width="6" height="14" fill="#FFFFFF" />
        <rect x="12" width="6" height="14" fill="#CE1126" />
      </svg>
    ),
    KR: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <circle cx="9" cy="7" r="3.2" fill="#CD2E3A" />
        <rect x="0" y="0" width="9" height="14" fill="#0047A0" opacity="0.6" />
      </svg>
    ),
    TR: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#E30A17" />
        <circle cx="6.5" cy="7" r="2.2" fill="#FFFFFF" />
        <polygon points="9,4 11,6 12,4 11,7 12,10 11,8 9,10 10,7" fill="#FFFFFF" />
      </svg>
    ),
    AE: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="4.5" height="14" fill="#FF0000" />
        <rect x="4.5" y="0" width="13.5" height="4.67" fill="#00732F" />
        <rect x="4.5" y="4.67" width="13.5" height="4.67" fill="#FFFFFF" />
        <rect x="4.5" y="9.33" width="13.5" height="4.67" fill="#000000" />
      </svg>
    ),
    SA: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#006C35" />
        <text x="9" y="10" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="serif">
          ﷲ
        </text>
      </svg>
    ),
    SG: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="7" fill="#ED2939" />
        <rect y="7" width="18" height="7" fill="#FFFFFF" />
        <circle cx="3" cy="3.5" r="1.8" fill="#FFFFFF" />
        <polygon points="3,2 3.3,3 3.8,3 3.4,3.5 3.5,4 3,3.6 2.5,4 2.6,3.5 2.2,3 2.7,3" fill="#ED2939" />
      </svg>
    ),
    MY: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        {[0, 2.8, 5.6, 8.4, 11.2].map((y, i) => (
          <rect key={i} y={y} width="18" height="1.4" fill="#CC0000" />
        ))}
        <rect width="7.2" height="7" fill="#000066" />
        <polygon
          points="3.6,1 4,3 6,3 4.3,4.2 4.9,6 3.6,4.8 2.3,6 2.9,4.2 1.2,3 3.2,3"
          fill="#FFD700"
        />
      </svg>
    ),
    ID: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="7" fill="#FF0000" />
        <rect y="7" width="18" height="7" fill="#FFFFFF" />
      </svg>
    ),
    PH: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="7" fill="#0038A8" />
        <rect y="7" width="18" height="7" fill="#CE1126" />
        <polygon points="0,0 9,7 0,14" fill="#FFFFFF" />
      </svg>
    ),
    TH: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="2.33" fill="#ED1C24" />
        <rect y="2.33" width="18" height="2.33" fill="#FFFFFF" />
        <rect y="4.67" width="18" height="4.67" fill="#241D4F" />
        <rect y="9.33" width="18" height="2.33" fill="#FFFFFF" />
        <rect y="11.67" width="18" height="2.33" fill="#ED1C24" />
      </svg>
    ),
    VN: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#DA251D" />
        <polygon points="9,2 10.5,6 15,6 11.5,8.5 13,12.5 9,10 5,12.5 6.5,8.5 3,6 7.5,6" fill="#FFFF00" />
      </svg>
    ),
    PK: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="5.4" height="14" fill="#FFFFFF" />
        <rect x="5.4" width="12.6" height="14" fill="#01411C" />
        <circle cx="12" cy="7" r="2.5" fill="#FFFFFF" />
        <polygon
          points="12,4.5 13,6.5 15.5,6.5 13.5,8 14.5,10 12,8.5 9.5,10 10.5,8 8.5,6.5 11,6.5"
          fill="#01411C"
        />
      </svg>
    ),
    BD: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#006A4E" />
        <circle cx="7.5" cy="7" r="3.5" fill="#F42A41" />
      </svg>
    ),
    LK: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#8D153A" />
        <rect x="0" y="1" width="18" height="2.5" fill="#FF7900" />
        <rect x="0" y="10.5" width="18" height="2.5" fill="#00534E" />
      </svg>
    ),
    NP: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <polygon points="2,1 16,7 2,13" fill="#DC143C" />
        <polygon points="3,2 14,7 3,12" fill="#003893" />
      </svg>
    ),
    ZA: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <polygon points="0,3 18,7 0,11" fill="#007A4D" />
        <rect y="5.8" width="18" height="2.4" fill="#FFB81C" />
        <polygon points="0,0 5.5,7 0,14" fill="#000000" />
        <polygon points="0,0 4,7 0,14" fill="#DE3831" />
      </svg>
    ),
    EG: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="4.67" fill="#CE1126" />
        <rect y="4.67" width="18" height="4.67" fill="#FFFFFF" />
        <rect y="9.33" width="18" height="4.67" fill="#000000" />
      </svg>
    ),
    NG: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#008751" />
        <rect x="6" width="6" height="14" fill="#FFFFFF" />
        <rect x="12" width="6" height="14" fill="#008751" />
      </svg>
    ),
    KE: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#000000" />
        <rect y="5.5" width="18" height="3" fill="#BB0000" />
        <rect y="6.5" width="18" height="1" fill="#FFFFFF" />
      </svg>
    ),
    NL: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="4.67" fill="#AE1C28" />
        <rect y="4.67" width="18" height="4.67" fill="#FFFFFF" />
        <rect y="9.33" width="18" height="4.67" fill="#21468B" />
      </svg>
    ),
    SE: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#006AA7" />
        <rect x="5.5" y="0" width="3" height="14" fill="#FECC00" />
        <rect x="0" y="5.5" width="18" height="3" fill="#FECC00" />
      </svg>
    ),
    NO: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#EF2B2D" />
        <rect x="0" y="5" width="18" height="4" fill="#FFFFFF" />
        <rect x="0" y="5.7" width="18" height="2.6" fill="#002868" />
        <rect x="6" y="0" width="4" height="14" fill="#FFFFFF" />
        <rect x="6.7" y="0" width="2.6" height="14" fill="#002868" />
      </svg>
    ),
    DK: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#C8102E" />
        <rect x="0" y="5.7" width="18" height="2.6" fill="#FFFFFF" />
        <rect x="5.5" y="0" width="2.6" height="14" fill="#FFFFFF" />
      </svg>
    ),
    FI: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <rect x="5.5" y="0" width="3" height="14" fill="#003580" />
        <rect x="0" y="5.5" width="18" height="3" fill="#003580" />
      </svg>
    ),
    PL: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="7" fill="#FFFFFF" />
        <rect y="7" width="18" height="7" fill="#DC143C" />
      </svg>
    ),
    UA: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="7" fill="#0057B7" />
        <rect y="7" width="18" height="7" fill="#FFD700" />
      </svg>
    ),
    CH: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FF0000" />
        <rect x="7.5" y="3.5" width="3" height="7" fill="#FFFFFF" />
        <rect x="5" y="5.5" width="8" height="3" fill="#FFFFFF" />
      </svg>
    ),
    AT: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="4.67" fill="#ED2939" />
        <rect y="4.67" width="18" height="4.67" fill="#FFFFFF" />
        <rect y="9.33" width="18" height="4.67" fill="#ED2939" />
      </svg>
    ),
    BE: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#000000" />
        <rect x="6" width="6" height="14" fill="#FDDA24" />
        <rect x="12" width="6" height="14" fill="#EF3340" />
      </svg>
    ),
    PT: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#006600" />
        <rect x="6" width="12" height="14" fill="#FF0000" />
      </svg>
    ),
    IE: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#009B48" />
        <rect x="6" width="6" height="14" fill="#FFFFFF" />
        <rect x="12" width="6" height="14" fill="#FF7900" />
      </svg>
    ),
    NZ: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#00008B" />
        <rect width="7.2" height="7.54" fill="#3C3B6E" />
        <circle cx="13" cy="3.5" r="1" fill="#FFFFFF" />
        <circle cx="11" cy="8" r="0.7" fill="#FFFFFF" />
        <circle cx="15" cy="7" r="0.8" fill="#FFFFFF" />
      </svg>
    ),
    AR: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="4.67" fill="#74ACDF" />
        <rect y="4.67" width="18" height="4.67" fill="#FFFFFF" />
        <rect y="9.33" width="18" height="4.67" fill="#74ACDF" />
      </svg>
    ),
    CL: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <rect y="7" width="18" height="7" fill="#D52B1E" />
        <rect width="7" height="7" fill="#0039A6" />
      </svg>
    ),
    CO: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect y="0" width="18" height="7" fill="#FCD116" />
        <rect y="7" width="18" height="3.5" fill="#003893" />
        <rect y="10.5" width="18" height="3.5" fill="#CE1126" />
      </svg>
    ),
    PE: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect x="0" width="6" height="14" fill="#D91023" />
        <rect x="6" width="6" height="14" fill="#FFFFFF" />
        <rect x="12" width="6" height="14" fill="#D91023" />
      </svg>
    ),
    IL: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <rect y="0" width="18" height="2.5" fill="#0038B8" />
        <rect y="11.5" width="18" height="2.5" fill="#0038B8" />
        <polygon points="9,2.5 11,6 15,6 12,8 13.5,11.5 9,9 4.5,11.5 6,8 3,6 7,6" fill="#0038B8" />
      </svg>
    ),
    QA: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#8D1B3D" />
        <polygon points="0,0 5,2 0,4 5,6 0,8 5,10 0,12 5,14 0,14 0,0" fill="#FFFFFF" />
      </svg>
    ),
    BH: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <rect y="0" width="5" height="14" fill="#CE1126" />
      </svg>
    ),
    OM: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <rect y="0" width="18" height="4" fill="#DB161B" />
        <rect y="10" width="18" height="4" fill="#008000" />
        <rect x="0" y="0" width="5" height="14" fill="#DB161B" />
      </svg>
    ),
    KW: (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#FFFFFF" />
        <rect y="0" width="18" height="4" fill="#007A3D" />
        <rect y="10" width="18" height="4" fill="#CE1126" />
        <polygon points="0,4 5,7 0,10" fill="#000000" />
      </svg>
    ),
  };

  return (
    flags[countryCode] || (
      <svg viewBox="0 0 18 14" style={flagStyle}>
        <rect width="18" height="14" fill="#cbd5e1" />
        <circle cx="9" cy="7" r="3" fill="#94a3b8" />
      </svg>
    )
  );
};

export default FlagIcon;