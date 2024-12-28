<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let animationFrame: number;
  let snowflakes: Array<{x: number, y: number, size: number, speed: number}> = [];

  function createSnowflakes() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    snowflakes = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1
    }));
  }

  function animate() {
    if (!canvas || !ctx) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    ctx.clearRect(0, 0, width, height);
    
    snowflakes.forEach(flake => {
      ctx!.beginPath();
      ctx!.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx!.fill();

      flake.y += flake.speed;
      flake.x += Math.sin(flake.y / 30) * 0.5;

      if (flake.y > height) {
        flake.y = 0;
        flake.x = Math.random() * width;
      }
    });

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
    
    if (ctx) {
      createSnowflakes();
      animate();
    }

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