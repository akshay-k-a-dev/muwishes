<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Canvas from './Canvas.svelte';
  import Audio from './Audio.svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let audio: { play: () => void };
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
    if (audio) audio.play();
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
      ctx!.fillStyle = `rgba(${p.color}, ${p.alpha})`;
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
    if (canvas) {
      ctx = canvas.getContext('2d');
      if (ctx) animate();
    }
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
</script>

<Canvas bind:this={canvas} />
<Audio bind:this={audio} src="firework.mp3" />