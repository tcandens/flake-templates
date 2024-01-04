{
  description = "A collection of Nix flake templates for staring web development projects.";

  outputs = { self }: {
    templates = {
      elixir = {
        path = ./elixir;
        description = ''
          A basic elixir project template.
        '';
      };
      nodejs-monorepo = {
        path = ./nodejs-monorepo;
        description = ''
          A full-stack web application build with Node.js v20, Fastify server, Vite and React based PWA.
        '';
      };
    };
  };
}
