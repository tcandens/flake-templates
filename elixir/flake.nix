{
  description = "Elixir based project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          inherit (pkgs.lib) optional optionals;
          pkgs = import nixpkgs { inherit system; };
          elixir = pkgs.beam.packages.erlangR25.elixir_1_14;
          deps = with pkgs; [
              nodejs_20
              elixir
              # nodePackages.node2nix
            ] ++ optional stdenv.isLinux libnotify
              ++ optional stdenv.isLinux inotify-tools
              ++ optional stdenv.isDarwin terminal-notifier
              ++ optionals stdenv.isDarwin (with darwin.apple_sdk.frameworks; [
                CoreServices
            ]);
        in

        with pkgs;
        {
          # packages = beam.packages.buildMix rec {
          #
          # };
          devShells.default = pkgs.mkShell {
            packages = deps ++ [];
            shellHook = ''
              set -a
              source .env
              set +a
            '';
          };
        }
      );
}
