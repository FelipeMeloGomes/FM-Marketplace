import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.apple.com", // Substitua pelo domínio correto
        pathname: "/**", // Isso permite acessar qualquer caminho dentro do domínio
      },
      {
        protocol: "https",
        hostname: "files.stripe.com", // Adicionando o domínio correto
        pathname: "/**", // Permitindo qualquer caminho dentro desse domínio
      },
    ],
  },
};

export default nextConfig;
