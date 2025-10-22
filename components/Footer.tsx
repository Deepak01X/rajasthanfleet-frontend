export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-10 mt-10">
      <div className="container mx-auto px-4 text-center">
        {/* Branding */}
        <h2 className="text-xl font-bold text-foreground">
          RAJASTHAN-<span className="text-primary">FLEET</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Your trusted travel companion in the land of kings
        </p>

        {/* Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="/term" className="text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
            Support
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground mt-6">
          © 2025 RajasthanFleet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
