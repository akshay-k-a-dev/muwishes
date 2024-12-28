<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let particles: Array<{x: number, y: number, vx: number, vy: number, alpha: number, color: string}> = [];
  let animationFrame: number;

  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];

  function createParticles(x: number, y: number) {
    const newParticles = Array.from({ length: 50 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 5;
      return {
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
    
    particles = [...particles, ...newParticles];
  }

  function animate() {
    if (!canvas || !ctx) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.alpha > 0.01);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.alpha *= 0.96;

      ctx!.beginPath();
      ctx!.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx!.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
      ctx!.fill();
    });

    if (Math.random() < 0.05) {
      createParticles(
        Math.random() * canvas.width,
        canvas.height - Math.random() * canvas.height * 0.5
      );
    }

    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    
    if (ctx) animate();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        document.body.removeChild(canvas);
      }
    };
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
</script>