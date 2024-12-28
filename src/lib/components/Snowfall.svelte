<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Canvas from './Canvas.svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let animationFrame: number;
  let snowflakes: Array<{x: number, y: number, size: number, speed: number}> = [];

  function createSnowflakes() {
    if (!canvas) return;
    snowflakes = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1
    }));
  }

  function animate() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snowflakes.forEach(flake => {
      ctx!.beginPath();
      ctx!.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx!.fill();

      flake.y += flake.speed;
      flake.x += Math.sin(flake.y / 30) * 0.5;

      if (flake.y > canvas.height) {
        flake.y = 0;
        flake.x = Math.random() * canvas.width;
      }
    });

    animationFrame = requestAnimationFrame(animate);
  }

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext('2d');
      if (ctx) {
        createSnowflakes();
        animate();
      }
    }
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
</script>

<Canvas bind:this={canvas} />