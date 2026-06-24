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
      tiktok: string;
    };
    realStateName: string;
    realStateSlogan: string;
    realStateSocials: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
    developer: string;
    developerSlogan: string;
    developerSocials: {
      facebook: string;
      instagram: string;
      tiktok: string;
    };
  };
}

const config: ConfigProps = {
  appName: "Residencial Océano Atlántico",
  appDescription: "Experiencia virtual del Residencial Océano Atlántico.",
  domainName: "project-domain.com",
  resend: {
    fromNoReply: `Project Name <noreply@project-domain.com>`,
    fromAdmin: `Admin at Project Name <admin@project-domain.com>`,
    supportEmail: "support@project-domain.com",
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
    email: "sales@project-domain.com",
    website: "https://project-domain.com/",
    buildingSocials: {
      facebook: "https://facebook.com/project",
      instagram: "https://instagram.com/project",
      tiktok: "https://tiktok.com/@project"
    },
    realStateName: "RM Promotora Inmobiliaria",
    realStateSlogan: "Slogan of the real estate company",
    realStateSocials: {
      facebook: "https://facebook.com/realestate",
      instagram: "https://instagram.com/realestate",
      tiktok: "https://tiktok.com/@realestate"
    },
    developer: "Rvisioon",
    developerSlogan: "Creamos experiencias visuales que conectan, inspiran y venden.",
    developerSocials: {
      facebook: "https://facebook.com/rvisioon",
      instagram: "https://instagram.com/rvisioon",
      tiktok: "https://tiktok.com/@rvisioon"
    }
  }
};

export default config;
