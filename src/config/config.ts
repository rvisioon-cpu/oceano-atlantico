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
    // Provincia/departamento donde opera la inmobiliaria. Aparece en el
    // encabezado de las páginas legales ("ubicada en ..., Lima, Perú"): no
    // todos los proyectos están en Lima, así que no se puede fijar en el texto.
    city: string;
    country: string;
    // Teléfono de la inmobiliaria para las páginas legales. Si queda vacío, la
    // fila del teléfono no se pinta en lugar de mostrar un campo hueco.
    phone?: string;
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
    buildingAddress: "Jirón Océano Atlántico 338-342, Surco, Lima",
    email: "info@rmpromotora.com",
    website: "https://rmpromotora.com",
    city: "Lima",
    country: "Perú",
    phone: "",
    // El proyecto no tiene cuentas propias: se muestran las de RM Promotora.
    buildingSocials: {
      facebook: "https://www.facebook.com/profile.php?id=100063594609401&locale=es_LA",
      instagram: "https://www.instagram.com/rmpromotora/"
    },
    realStateName: "RM Promotora",
    realStateSlogan: "Constructora e Inmobiliaria",
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
