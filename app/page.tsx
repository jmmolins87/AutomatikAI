"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowRight, Zap, Globe, Layers } from "lucide-react";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll();
  const logoScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background font-sans relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ 
          y: backgroundY,
          background: 'linear-gradient(135deg, var(--background) 0%, var(--accent) 100%)',
        }}
      />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <motion.section 
          className="flex items-center justify-center"
          style={{ 
            paddingTop: 'var(--spacing-4xl)',
            paddingBottom: 'var(--spacing-xl)',
            scale: logoScale,
            opacity: logoOpacity,
            y: headerY,
          }}
        >
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div 
              className="absolute inset-0 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle, var(--primary) 0%, var(--chart-2) 50%, transparent 70%)',
              }}
            />
            <Image
              src="/logo/logo.png"
              alt="J.marIA Agency Logo"
              width={200}
              height={200}
              priority
              className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              style={{
                filter: 'drop-shadow(0 0 30px var(--primary)) drop-shadow(0 0 60px var(--chart-2))',
              }}
            />
          </motion.div>
        </motion.section>

        {/* Hero Section */}
        <motion.section 
          className="flex flex-col items-center justify-center text-center"
          style={{ 
            paddingBottom: 'var(--spacing-3xl)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20"
            style={{ marginBottom: 'var(--spacing-lg)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Zap className="size-4" />
            <span>Próximamente</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground max-w-5xl"
            style={{ 
              marginBottom: 'var(--spacing-lg)',
              lineHeight: '1.1',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Construyendo el
            <span className="block bg-linear-to-r from-primary via-primary to-chart-2 bg-clip-text text-transparent">
              futuro digital
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
            style={{ 
              marginBottom: 'var(--spacing-xl)',
              lineHeight: '1.6',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Estamos trabajando en algo extraordinario. Una plataforma que transformará la manera en que interactúas con la tecnología.
          </motion.p>

          {/* Email Form */}
          {!isSubmitted ? (
            <motion.div 
              className="w-full max-w-md"
              style={{ marginBottom: 'var(--spacing-2xl)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-14 text-base bg-background/50 backdrop-blur-sm"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="h-14 px-8 bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Notificarme
                      <ArrowRight className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
              <p 
                className="text-sm text-muted-foreground"
                style={{ marginTop: 'var(--spacing-sm)' }}
              >
                Únete a la lista de espera y sé el primero en acceder
              </p>
            </motion.div>
          ) : (
            <motion.div 
              className="w-full max-w-md p-6 bg-primary/10 border border-primary/30 rounded-lg backdrop-blur-sm"
              style={{ marginBottom: 'var(--spacing-2xl)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary font-medium text-lg">
                ✓ ¡Perfecto! Te avisaremos cuando estemos listos
              </p>
            </motion.div>
          )}

          {/* Feature Cards */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
            style={{ 
              marginTop: 'var(--spacing-xl)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Velocidad</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Rendimiento optimizado para experiencias ultrarrápidas
              </p>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Global</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Alcance mundial con infraestructura distribuida
              </p>
            </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Layers className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Modular</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Arquitectura flexible y escalable para cualquier necesidad
              </p>
            </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section 
          className="border-t border-border/50 py-16"
          style={{ 
            paddingTop: 'var(--spacing-3xl)',
            paddingBottom: 'var(--spacing-3xl)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <motion.div 
              className="text-center space-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl font-bold bg-linear-to-br from-primary to-chart-2 bg-clip-text text-transparent">
                2026
              </div>
              <p className="text-muted-foreground font-medium">Año de lanzamiento</p>
            </motion.div>
            <motion.div 
              className="text-center space-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl font-bold bg-linear-to-br from-primary to-chart-2 bg-clip-text text-transparent">
                ∞
              </div>
              <p className="text-muted-foreground font-medium">Posibilidades ilimitadas</p>
            </motion.div>
            <motion.div 
              className="text-center space-y-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl font-bold bg-linear-to-br from-primary to-chart-2 bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-muted-foreground font-medium">Compromiso total</p>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="border-t border-border/50 bg-card/30 backdrop-blur-sm"
        style={{ 
          paddingTop: 'var(--spacing-xl)',
          paddingBottom: 'var(--spacing-xl)',
          y: contentY,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 J.marIA Agency. Todos los derechos reservados.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
