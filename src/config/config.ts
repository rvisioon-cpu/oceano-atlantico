export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  resend: {
    fromNoReply: string;
    fromAdmin: string;
    supportEmail: string;
  };
  colors: {
    theme: "light" | "dark";
    main: string;
  };
  auth: {
    loginUrl: string;
    callbackUrl: string;
  };
  company: {
    name: string;
    address: string;
    buildingName: string;
    buildingAddress: string;
    email: string;
    website: string;
    maquetaUrl?: string;
    buildingSocials: {
      facebook: string;
      instagram: string;
      // Opcional: si la cuenta no existe se omite y el ícono no se renderiza.
      tiktok?: string;
    };
    realStateName: string;
    realStateSlogan: string;
    realStateWebsite: string;
    realStateSocials: {
      facebook: string;
      instagram: string;
      tiktok?: string;
    };
    developer: string;
    developerSlogan: string;
    developerWebsite: string;
    developerSocials: {
      facebook: string;
      instagram: string;
      tiktok?: string;
    };
  };
}

const config: ConfigProps = {
  appName: "Residencial Océano Atlántico",
  appDescription: "Experiencia virtual del Residencial Océano Atlántico.",
  domainName: "rmpromotorainmobiliaria.com",
  // Dominio verificado en Resend. Cualquier remitente debe pertenecer a él o
  // el envío es rechazado.
  resend: {
    fromNoReply: `Océano Atlántico <no-reply@rmpromotorainmobiliaria.com>`,
    fromAdmin: `Océano Atlántico <admin@rmpromotorainmobiliaria.com>`,
    // Buzón que recibe los formularios de contacto. Es un dominio distinto al
    // de envío: Resend solo exige el dominio verificado en el remitente.
    supportEmail: "info@rmpromotora.com",
  },
  colors: {
    theme: "light",
    main: "#0E86C7", // Brand main color (Océano Atlántico ocean blue)
  },
  auth: {
    loginUrl: "/api/auth/signin",
    callbackUrl: "/dashboard",
  },
  company: {
    name: "Residencial Océano Atlántico",
    address: "Company Address",
    buildingName: "Residencial Océano Atlántico",
    buildingAddress: "Building Address",
    email: "info@rmpromotora.com",
    website: "https://rmpromotora.com",
    // El proyecto no tiene cuentas propias: se muestran las de RM Promotora.
    buildingSocials: {
      facebook: "https://www.facebook.com/profile.php?id=100063594609401&locale=es_LA",
      instagram: "https://www.instagram.com/rmpromotora/"
    },
    realStateName: "RM Promotora Inmobiliaria",
    realStateSlogan: "Slogan of the real estate company",
    realStateWebsite: "https://rmpromotora.com",
    realStateSocials: {
      facebook: "https://www.facebook.com/profile.php?id=100063594609401&locale=es_LA",
      instagram: "https://www.instagram.com/rmpromotora/"
    },
    developer: "Rvisioon",
    developerSlogan: "Creamos experiencias visuales que conectan, inspiran y venden.",
    developerWebsite: "https://rvisioon.pe/",
    developerSocials: {
      facebook: "https://www.facebook.com/profile.php?id=61585009776159",
      instagram: "https://www.instagram.com/rvisioon/",
      tiktok: "https://www.tiktok.com/@rvisioon"
    }
  }
};

export default config;
